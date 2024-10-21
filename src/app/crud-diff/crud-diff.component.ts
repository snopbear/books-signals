import { Component, inject, OnInit, Signal } from '@angular/core';
import { ITodo } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-crud-diff',
  templateUrl: './crud-diff.component.html',
  styleUrls: ['./crud-diff.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class CrudDiffComponent implements OnInit {
  todoService = inject(TodoService);
  todo: Signal<ITodo[]>;

  constructor() {
   this.todo = this.todoService.getTodo();

  }
  ngOnInit() {}
}
