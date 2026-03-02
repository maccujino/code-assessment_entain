import { Component, inject, OnInit, signal } from '@angular/core';
import { BoardComponent } from './components/board/board.component';
import { SudokuStore } from './stores/sudoku.store';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly store = inject(SudokuStore);

  protected readonly title = signal('code-assessment_entain');

  ngOnInit(): void {
    this.store.initializeBoard('random');
  }
}
