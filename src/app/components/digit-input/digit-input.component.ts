import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ValidSudokuValue } from '../../models/sudoku.model';
import { SudokuStore } from '../../stores/sudoku.store';

@Component({
  selector: 'app-digit-input',
  templateUrl: './digit-input.component.html',
  styleUrls: ['./digit-input.component.scss'],
  host: {
    class: 'digit-input',
    '(window:keydown)': 'onKeyPressed($event)',
  },
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

  onKeyPressed(event: KeyboardEvent): void {
    switch (event.key) {
      case '1':
        this.onDigitSelected(1);
        return;
      case '2':
        this.onDigitSelected(2);
        return;
      case '3':
        this.onDigitSelected(3);
        return;
      case '4':
        this.onDigitSelected(4);
        return;
      case '5':
        this.onDigitSelected(5);
        return;
      case '6':
        this.onDigitSelected(6);
        return;
      case '7':
        this.onDigitSelected(7);
        return;
      case '8':
        this.onDigitSelected(8);
        return;
      case '9':
        this.onDigitSelected(9);
        return;
      case 'Backspace':
      case 'Delete':
        this.onDigitSelected(undefined);
        return;
      default:
        return;
    }
  }
}
