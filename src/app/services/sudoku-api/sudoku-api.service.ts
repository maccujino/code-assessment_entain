import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SudokuBoard, SudokuDifficulty } from '../../models/sudoku.model';

type BoardResponse = {
  board: SudokuBoard;
};

type ValidateResponse = {
  status: 'unsolved' | 'solved' | 'broken';
};

type SolveResponse = {
  difficulty: SudokuDifficulty;
  solution: SudokuBoard;
  status: 'solved' | 'broken' | 'unsolvable';
};

@Injectable({
  providedIn: 'root',
})
export class SudokuApiService {
  private static readonly API_BASE_URL = 'https://sugoku.onrender.com';

  private readonly http = inject(HttpClient);

  fetchBoard(difficulty: SudokuDifficulty = 'random'): Observable<BoardResponse> {
    const params = new HttpParams().set('difficulty', difficulty);
    return this.http.get<BoardResponse>(`${SudokuApiService.API_BASE_URL}/board`, { params });
  }

  validateBoard(board: SudokuBoard): Observable<ValidateResponse> {
    return this.http.post<ValidateResponse>(`${SudokuApiService.API_BASE_URL}/validate`, this.encodeBoard(board), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  solveBoard(board: SudokuBoard): Observable<SolveResponse> {
    return this.http.post<SolveResponse>(`${SudokuApiService.API_BASE_URL}/solve`, this.encodeBoard(board), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  private encodeBoard(board: SudokuBoard): string {
    let params = new HttpParams();
    // Flatten the board array or serialize as needed
    params = params.set('board', JSON.stringify(board));
    return params.toString();
  }
}
