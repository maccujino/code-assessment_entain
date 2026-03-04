import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SudokuStore } from '../../stores/sudoku.store';
import { DigitInputComponent } from '../digit-input/digit-input.component';

@Component({
  selector: 'app-toolbar',
  imports: [DigitInputComponent],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: { class: 'toolbar' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  private readonly store = inject(SudokuStore);

  validate(): void {
    this.store.validateBoard();
  }

  solve(): void {
    this.store.solveBoard();
  }
}
