import { Component, Input } from '@angular/core';
import { Todo } from './models/Todo';
import { ApiService } from './services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() updatedTodoItem

  name = new FormControl('')

  todoItems: Array<Todo> = []

  constructor(
    private service: ApiService
  ){}
  ngOnInit(){
    this.service.getTodos().subscribe( (todos) =>{
      this.todoItems = todos
    })
  }

  addTodoFunc(){
    let tempData: Todo = {
      'name': this.name.value,
      'status': false
    }

    this.service.addTodo(tempData).subscribe( (data: Todo) => {
      this.todoItems.push(data);
    })
  }

  deleteTodo(todo: Todo){

    this.service.deleteUser(todo).subscribe( (data: Todo) => {
      this.todoItems = this.todoItems.filter( t => t._id !== todo._id)
    }, (error) => {
      console.log(error)
    })
  }

}
