import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  imports: [CellComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  readonly Array = Array;
  readonly size = 9;
}
