import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-element.component.html',
  styleUrls: ['./todo-element.component.css']
})
export class TodoElementComponent implements OnInit {

  @Input() todoItem: Todo
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter()

  delete: boolean = false

  constructor(
    private todoService: ApiService
  ) { }

  ngOnInit(): void {
  }
  //Test
  setClasses(){
    let classes = {
      'checked': this.todoItem.status
    }
    return classes
  }

  onToggle(todo){
    if(this.delete){

    } else {
      //Update UI state
      todo.status = !todo.status

      //Update server
      this.todoService.toggleState(todo).subscribe( (data) => {

      }, (error) => {
        console.error(error);
      })
    }
  }

  onDelete(todo){
    this.delete = true;
    this.deleteTodo.emit(todo)
  }

}
