import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { IBook } from '../model/book';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/books'; // JSON server URL

  
  private booksSignal = signal<IBook[]>([]); // Signal to hold list of books
  private selectedBookSignal = signal<IBook | null>(null);

  constructor(private http: HttpClient) {
    this.fetchBooks(); // Fetch initial books data
  }

  // Fetch all books from JSON server
  fetchBooks(): void {
    this.http.get<IBook[]>(this.apiUrl).subscribe((books) => {
      this.booksSignal.set(books); // Set the new list of books using .set()
    });
  }

  // Get books signal (observable-like)
  getBooks(): Signal<IBook[]> {
    return this.booksSignal;
  }

  // Get selected book signal (observable-like)
  getSelectedBook(): Signal<IBook | null> {
    return this.selectedBookSignal;
  }

  // Add a new book
  addBook(book: IBook): void {
    this.http.post<IBook>(this.apiUrl, book).subscribe(() => {
      this.fetchBooks(); // Reload the list of books after adding
    });
  }

  // Edit an existing book
  editBook(book: IBook): void {
    const url = `${this.apiUrl}/${book.id}`;
    this.http.put<IBook>(url, book).subscribe(() => {
      this.fetchBooks(); // Reload the list of books after editing
      this.selectBook(null); // Clear the selected book
    });
  }

  // Delete a book
  deleteBook(id: number): void {
    const url = `${this.apiUrl}/${id}`;
    this.http.delete(url).subscribe(() => {
      this.fetchBooks(); // Reload the list of books after deletion
    });
  }

  // Select a book to edit
  selectBook(book: IBook | null): void {
    this.selectedBookSignal.set(book); // Set the selected book using .set()
  }
}