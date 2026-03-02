import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { SudokuBoard, SudokuDifficulty } from '../models/sudoku.model';
import { SudokuApiService } from '../services/sudoku-api/sudoku-api.service';

interface SudokuStoreState {
  board: SudokuBoard | undefined;
  boardLocks: boolean[][] | undefined;
}

const initialState: SudokuStoreState = { board: undefined, boardLocks: undefined };

export const SudokuStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, api = inject(SudokuApiService)) => {
    const initializeBoard = rxMethod<SudokuDifficulty>(
      pipe(
        tap(() => {
          //   patchState(store, { isLoading: true });
        }),
        switchMap((difficulty) => {
          console.log('Initialize board', { difficulty });
          return api.fetchBoard(difficulty).pipe(
            tapResponse({
              next: (board) => {
                console.log('Received board', board);

                const boardLocks = board.map((row) => {
                  return row.map((value) => !!value);
                });
                patchState(store, { board, boardLocks /*, isLoading: false*/ });
              },
              error: (error) => {
                // patchState(store, { isLoading: false });
                console.error(error);
              },
            }),
          );
        }),
      ),
    );

    return { initializeBoard };
  }),
);
