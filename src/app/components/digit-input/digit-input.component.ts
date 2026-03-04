import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ValidSudokuValue } from '../../models/sudoku.model';
import { SudokuStore } from '../../stores/sudoku.store';

@Component({
  selector: 'app-digit-input',
  templateUrl: './digit-input.component.html',
  styleUrls: ['./digit-input.component.scss'],
  host: { class: 'digit-input' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitInputComponent {
  private readonly store = inject(SudokuStore);

  readonly selectedCell = this.store.selectedCell;

  readonly disabled = computed<boolean>(() => !this.selectedCell());

  readonly selectedDigit = computed<ValidSudokuValue | undefined>(() => {
    const [selectedRowIndex, selectedColumnIndex] = this.selectedCell() ?? [-1, -1];
    return this.store.getValueFor(selectedRowIndex, selectedColumnIndex);
  });

  onDigitSelected(digit: ValidSudokuValue | undefined): void {
    if (this.disabled()) {
      return;
    }

    const [selectedRowIndex, selectedColumnIndex] = this.selectedCell() ?? [-1, -1];
    this.store.setValueFor(digit, selectedRowIndex, selectedColumnIndex);
  }
}
