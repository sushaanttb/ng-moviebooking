import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../app/user';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


const userAPI = "http://localhost:8080/user";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  loginSubscription(userName: string, password: string): Observable<User> {

    let userDto = new User({ 'userName': userName, 'password': password });
    return this.http.post<User>(userAPI + "/login", userDto);
  }

}
