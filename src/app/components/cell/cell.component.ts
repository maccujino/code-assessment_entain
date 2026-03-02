import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
  host: { class: 'cell' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  readonly value = signal(Math.round(Math.random() * 8) + 1);
}
