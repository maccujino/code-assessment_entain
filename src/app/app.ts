import { Component, signal } from '@angular/core';
import { BoardComponent } from './components/board/board.component';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('code-assessment_entain');
}
