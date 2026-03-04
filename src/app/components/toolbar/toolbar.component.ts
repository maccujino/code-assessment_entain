import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SudokuStore } from '../../stores/sudoku.store';
import { DigitInputComponent } from '../digit-input/digit-input.component';

@Component({
  selector: 'app-toolbar',
  imports: [MatProgressSpinnerModule, DigitInputComponent],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: { class: 'toolbar' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  private readonly store = inject(SudokuStore);

  readonly boardLoading = this.store.boardLoading;
  readonly validateRunning = this.store.validateRunning;
  readonly solveRunning = this.store.solveRunning;

  validate(): void {
    this.store.validateBoard();
  }

  solve(): void {
    this.store.solveBoard();
  }
}
