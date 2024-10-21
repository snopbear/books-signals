import { Component, OnInit, Signal } from '@angular/core';
import { DataService } from '../service/data-service.service';
import { IBook } from '../model/book';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  standalone: true,
  imports:[NgFor,NgIf,FormsModule]
})
export class CrudComponent {
  books: Signal<IBook[]>;
  selectedBook: Signal<IBook | null>;

  newBook: IBook = { id: 0, title: '', author: '' };

  constructor(private dataService: DataService) {
    this.books = this.dataService.getBooks();
    this.selectedBook = this.dataService.getSelectedBook();
  }

  // Add a new book
  addBook() {
    if (this.newBook.title && this.newBook.author) {
      this.dataService.addBook(this.newBook);
      this.newBook = { id: 0, title: '', author: '' };
    }
  }

  // Edit the selected book
  editBook(book: IBook) {
    this.dataService.selectBook(book);
    this.newBook = { ...book };
  }

  // Update the book
  updateBook() {
    if (this.newBook.title && this.newBook.author) {
      this.dataService.editBook(this.newBook);
      this.newBook = { id: 0, title: '', author: '' };
    }
  }

  // Delete a book
  deleteBook(id: number) {
    this.dataService.deleteBook(id);
  }
}