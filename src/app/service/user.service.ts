import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly taskApiUsersUrl="https://localhost:7097/api/v1/User";
  readonly taskApiPermissionsUrl="https://localhost:7097/api/v1/Permission";
  constructor(private http: HttpClient) { }

  addUser(user : User):Observable<User>{
    return this.http.post<User>(this.taskApiUsersUrl,user);
  }

  getAllUsers() {
    return this.http.get<User[]>(this.taskApiUsersUrl);
  }
  updateUser(id:number,user : User){
    return this.http.put<User>(this.taskApiUsersUrl+`/${id}`,user);
  }
  deleteUser(id:number){
    return this.http.delete<User>(this.taskApiUsersUrl+`/${id}`);
  }
  getAllPermissions():Observable<any[]>{
    return this.http.get<any>(this.taskApiPermissionsUrl);
  }
}
