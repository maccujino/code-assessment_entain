import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BoardComponent } from './components/board/board.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WelcomeDialog, WelcomeDialogResult } from './components/welcome/welcome.component';
import { SudokuStore } from './stores/sudoku.store';

@Component({
  selector: 'app-root',
  imports: [BoardComponent, ToolbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);

  private readonly store = inject(SudokuStore);

  private dialogCloseSubscription?: Subscription;

  ngOnInit(): void {
    const dialogRef = this.dialog.open<WelcomeDialog, never, WelcomeDialogResult>(WelcomeDialog, {
      disableClose: true,
    });

    this.dialogCloseSubscription = dialogRef.afterClosed().subscribe((result) => {
      this.store.initializeBoard(result?.difficulty ?? 'random');
    });
  }

  ngOnDestroy(): void {
    this.dialogCloseSubscription?.unsubscribe();
  }
}
