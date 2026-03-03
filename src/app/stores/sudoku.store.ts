import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, filter, pipe, switchMap, tap } from 'rxjs';
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
              next: (response) => {
                console.log('Received board response', response);

                const board = response.board;
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

    const validateBoard = rxMethod<void>(
      pipe(
        tap(() => {
          //   patchState(store, { isLoading: true });
        }),
        filter(() => {
          const board = store.board();
          if (!board) {
            console.warn('Cannot validate: board is empty');
            return false;
          }
          return true;
        }),
        exhaustMap(() => {
          const board = store.board()!;

          console.log('Validate board', board);

          return api.validateBoard(board).pipe(
            tapResponse({
              next: (response) => {
                console.log('Validated board', response);
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

    const solveBoard = rxMethod<void>(
      pipe(
        tap(() => {
          //   patchState(store, { isLoading: true });
        }),
        filter(() => {
          const board = store.board();
          if (!board) {
            console.warn('Cannot solve: board is empty');
            return false;
          }
          return true;
        }),
        exhaustMap(() => {
          const board = store.board()!;

          console.log('Solve board', board);

          return api.solveBoard(board).pipe(
            tapResponse({
              next: (response) => {
                console.log('Solved board', response);
                const solved = response.solution;
                patchState(store, { board: solved });
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

    return { initializeBoard, validateBoard, solveBoard };
  }),
);
