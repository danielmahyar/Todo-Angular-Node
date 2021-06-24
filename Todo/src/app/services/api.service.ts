import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = "http://localhost:3000/subscribers/"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'      
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  addTodo(todoData){
    return this.http.post(this.BASE_URL, todoData, this.httpOptions)
  }

  deleteUser(todoItem){
    return this.http.delete(this.BASE_URL + todoItem._id)
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.BASE_URL)
  }

  toggleState(todo): Observable<any> {
    return this.http.patch(this.BASE_URL + todo._id, {'status': todo.status })
  }
}
