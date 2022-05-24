import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly taskApiUrl="https://localhost:7097/api/User";
  constructor(private http: HttpClient) { }

  addUser(user : User):Observable<User>{
    return this.http.post<User>(this.taskApiUrl,user);
  }

  getAllUsers() {
    return this.http.get<User[]>(this.taskApiUrl);
  }
  updateUser(id:number,user : User){
    return this.http.put<User>(this.taskApiUrl+`/${id}`,user);
  }
  deleteUser(id:number){
    return this.http.delete<User>(this.taskApiUrl+`/${id}`);
  }
}
