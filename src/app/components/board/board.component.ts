import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SudokuStore } from '../../stores/sudoku.store';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  imports: [MatProgressSpinnerModule, CellComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  private readonly store = inject(SudokuStore);

  readonly validation = this.store.validation;
  readonly boardLoading = this.store.boardLoading;

  readonly Array = Array;
  readonly size = 9;
}
