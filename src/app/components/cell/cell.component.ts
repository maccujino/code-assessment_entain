import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SudokuValue } from '../../models/sudoku.model';
import { SudokuStore } from '../../stores/sudoku.store';

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
  host: { class: 'cell' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  private readonly store = inject(SudokuStore);

  readonly rowIndex = input<number>(-1);
  readonly columnIndex = input<number>(-1);

  readonly value = computed<Omit<SudokuValue, 0> | ''>(() => {
    const rowIndex = this.rowIndex();
    const columnIndex = this.columnIndex();
    if (rowIndex < 0 || columnIndex < 0 || rowIndex >= 9 || columnIndex >= 9) {
      return '';
    }

    const board = this.store.board();
    return board && board[rowIndex] && board[rowIndex][columnIndex] ? board[rowIndex][columnIndex] : '';
  });

  readonly locked = computed<boolean>(() => {
    const rowIndex = this.rowIndex();
    const columnIndex = this.columnIndex();
    if (rowIndex < 0 || columnIndex < 0 || rowIndex >= 9 || columnIndex >= 9) {
      return false;
    }

    const boardLocks = this.store.boardLocks();
    return boardLocks && boardLocks[rowIndex] && boardLocks[rowIndex][columnIndex]
      ? boardLocks[rowIndex][columnIndex]
      : false;
  });
}
