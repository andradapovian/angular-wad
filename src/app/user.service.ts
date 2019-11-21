import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    let registrationUrl = this.baseUrl +`/registration`;
    console.log(registrationUrl);
    return this.http.post<User>(registrationUrl, user, httpOptions);
  }
  
  getUserAtId(userId: number): Observable<User> {
    let userIdUrl = this.baseUrl + `${userId}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', localStorage.getItem('Authorization'));
    return this.http.get<User>(userIdUrl, httpOptions);
  }

  updateUser(user: User): Observable<User> {
    let userId = +user.id;
    let userIdUrl = this.baseUrl + `${userId}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', localStorage.getItem('Authorization'));

    return this.http.put<User>(userIdUrl, user, httpOptions);
  }

  deleteUser(user: User | number ): Observable<User>{
    const id = typeof user === 'number' ? event : user.id;

    let userIdUrl = this.baseUrl + `${id}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', localStorage.getItem('Authorization'));
    return this.http.delete<User> (userIdUrl, httpOptions);

  }
}
