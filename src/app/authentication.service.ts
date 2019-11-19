import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    response: Response;

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  

  baseUrl = 'http://localhost:8080/';

  constructor(
    private http: HttpClient
  ) { }

  getToken(): string {
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<User> {
    let loginUrl = this.baseUrl + 'login'
    this.headers = this.headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    localStorage.setItem('Authorization', 'Basic ' + btoa(username + ':' + password))
    return this.http.post<User>(loginUrl, {}, {headers: this.headers});
  }

  logout(): Observable<any> {
    let url = `${this.baseUrl}/logout`;
    localStorage.removeItem('user');
    localStorage.removeItem('Authorization');
    return this.http.get(url);
  }

}
