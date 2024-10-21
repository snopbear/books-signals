import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { ITodo } from '../model/todo';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todo'; // JSON server URL
  http = inject(HttpClient);
  private todoSignal = signal<ITodo[]>([]); // Signal to hold list of books
  private selectedTodoSignal = signal<ITodo | null>(null);

  constructor() {
    this.fetchTodo(); // Fetch initial books data
  }

  fetchTodo(): void {
    this.http.get<ITodo[]>(this.apiUrl).subscribe((books) => {
      this.todoSignal.set(books); // Set the new list of books using .set()
    });
  }

  // Get books signal (observable-like)
  getTodo(): Signal<ITodo[]> {
    debugger
    return this.todoSignal;
  }
  // CreateTodo(todo: ITodo): Observable<ITodo> {
  //   return this.http
  //     .post<ITodo>(this.apiUrl, todo)
  //     .pipe(tap((res) => this.upsertResource(res)));
  // }
  // UpdateTodo(todo: ITodo): Observable<ITodo> {
  //   return this.http
  //     .post<ITodo>(this.apiUrl, todo)
  //     .pipe(tap((res) => this.upsertResource(res)));
  // }

  // deletePost(id: number): Observable<ITodo> {
  //   return this.http.delete<ITodo>(`${this.apiUrl}/${id}`).pipe(
  //     tap(() => {
  //       this.todo.set(this.todo().filter((todo) => todo.id !== id));
  //     })
  //   );
  // }



}