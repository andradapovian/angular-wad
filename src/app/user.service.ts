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
    let registrationUrl = this.baseUrl;
    console.log(registrationUrl);
    return this.http.post<User>(registrationUrl, user, httpOptions);
  }
}
