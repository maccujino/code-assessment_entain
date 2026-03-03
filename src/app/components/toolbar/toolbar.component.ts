import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SudokuStore } from '../../stores/sudoku.store';

@Component({
  selector: 'app-toolbar',
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
