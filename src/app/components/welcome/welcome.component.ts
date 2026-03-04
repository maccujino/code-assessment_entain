import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { SudokuDifficulty } from '../../models/sudoku.model';

export interface WelcomeDialogResult {
  difficulty: SudokuDifficulty;
}

@Component({
  selector: 'app-welcome',
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeDialog {
  readonly dialogRef: MatDialogRef<WelcomeDialog, WelcomeDialogResult> = inject(
    MatDialogRef<WelcomeDialog, WelcomeDialogResult>,
  );

  onDifficultySelected(difficulty: SudokuDifficulty): void {
    this.dialogRef.close({ difficulty });
  }
}
