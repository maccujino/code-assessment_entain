import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ValidSudokuValue } from '../../models/sudoku.model';
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

  readonly value = computed<ValidSudokuValue | undefined>(() => {
    const rowIndex = this.rowIndex();
    const columnIndex = this.columnIndex();
    return this.store.getValueFor(rowIndex, columnIndex);
  });

  readonly locked = computed<boolean>(() => {
    const rowIndex = this.rowIndex();
    const columnIndex = this.columnIndex();
    return this.store.getLockFor(rowIndex, columnIndex);
  });

  readonly selected = computed<boolean>(() => {
    const [selectedRowIndex, selectedColumnIndex] = this.store.selectedCell() ?? [-1, -1];
    return selectedRowIndex === this.rowIndex() && selectedColumnIndex === this.columnIndex();
  });

  select(): void {
    if (this.locked()) {
      return;
    }
    this.store.selectCell(this.rowIndex(), this.columnIndex());
  }
}
