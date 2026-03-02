import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SudokuBoard, SudokuDifficulty } from '../../models/sudoku.model';

//GET https://sugoku.onrender.com/board?difficulty=easy
type BoardResponse = {
  board: SudokuBoard;
};
// type SudokuRequest = {
//   board: SudokuBoard;
// };

//POST https://sugoku.onrender.com/solve
// type SolveResponse = {
//   difficulty: SudokuDifficulty;
//   solution: SudokuBoard;
//   status: 'solved' | 'broken' | 'unsolvable';
// };

//POST https://sugoku.onrender.com/validate
// type ValidateResponse = {
//   status: 'solved' | 'broken';
// };

@Injectable({
  providedIn: 'root',
})
export class SudokuApiService {
  private static readonly API_BASE_URL = 'https://sugoku.onrender.com';

  private readonly http = inject(HttpClient);

  fetchBoard(difficulty: SudokuDifficulty = 'random'): Observable<SudokuBoard> {
    const params = new HttpParams().set('difficulty', difficulty);
    return this.http
      .get<BoardResponse>(`${SudokuApiService.API_BASE_URL}/board`, { params })
      .pipe(map((response) => response.board));
  }
}
