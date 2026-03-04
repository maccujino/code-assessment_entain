import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, filter, map, pipe, switchMap, tap } from 'rxjs';
import { SudokuBoard, SudokuDifficulty, ValidSudokuValue } from '../models/sudoku.model';
import { SudokuApiService } from '../services/sudoku-api/sudoku-api.service';

interface SudokuStoreState {
  board: SudokuBoard | undefined;
  boardLocks: boolean[][] | undefined;
  selectedCell: [number, number] | undefined;
}

const initialState: SudokuStoreState = { board: undefined, boardLocks: undefined, selectedCell: undefined };

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

    const getValueFor = (rowIndex: number, columnIndex: number): ValidSudokuValue | undefined => {
      if (rowIndex < 0 || columnIndex < 0 || rowIndex >= 9 || columnIndex >= 9) {
        return undefined;
      }

      const board = store.board();
      return board && board[rowIndex] && board[rowIndex][columnIndex] ? board[rowIndex][columnIndex] : undefined;
    };

    const setValueFor = (value: ValidSudokuValue | undefined, rowIndex: number, columnIndex: number): void => {
      if (rowIndex < 0 || columnIndex < 0 || rowIndex >= 9 || columnIndex >= 9) {
        return;
      }

      console.log('Set value', { value, rowIndex, columnIndex });
      patchState(store, (state) => {
        const board = state.board;
        if (!board || board[rowIndex] === undefined) {
          return {};
        }

        const updated = board.map((row, ri) =>
          ri === rowIndex ? row.map((cell, ci) => (ci === columnIndex ? (value ?? 0) : cell)) : row,
        );

        return { board: updated };
      });
    };

    const getLockFor = (rowIndex: number, columnIndex: number): boolean => {
      if (rowIndex < 0 || columnIndex < 0 || rowIndex >= 9 || columnIndex >= 9) {
        return false;
      }

      const boardLocks = store.boardLocks();
      return boardLocks && boardLocks[rowIndex] && boardLocks[rowIndex][columnIndex]
        ? boardLocks[rowIndex][columnIndex]
        : false;
    };

    const selectCell = (rowIndex: number, columnIndex: number): void => {
      if (rowIndex < 0 || columnIndex < 0 || rowIndex >= 9 || columnIndex >= 9) {
        return;
      }

      patchState(store, (state) => {
        const [selectedRowIndex, selectedColumnIndex] = state.selectedCell ?? [-1, -1];

        if (selectedRowIndex === rowIndex && selectedColumnIndex === columnIndex) {
          return { selectedCell: undefined };
        }
        return { selectedCell: [rowIndex, columnIndex] as [number, number] };
      });
    };

    const validateBoard = rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { selectedCell: undefined /*isLoading: true*/ });
        }),
        map(() => store.board()),
        filter((board): board is SudokuBoard => {
          if (!board) {
            console.warn('Cannot validate: board is empty');
            return false;
          }
          return true;
        }),
        exhaustMap((board) => {
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
          patchState(store, { selectedCell: undefined /*isLoading: true*/ });
        }),
        map(() => store.board()),
        filter((board): board is SudokuBoard => {
          if (!board) {
            console.warn('Cannot solve: board is empty');
            return false;
          }
          return true;
        }),
        exhaustMap((board) => {
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

    return { initializeBoard, getValueFor, setValueFor, getLockFor, selectCell, validateBoard, solveBoard };
  }),
);
