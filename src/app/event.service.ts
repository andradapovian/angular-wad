import { Injectable } from '@angular/core';
import { Event } from './event';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsUrl = 'http://localhost:8080/events';

  constructor(private http: HttpClient ) { }

getEvents(): Observable<Event[]>{
  httpOptions.headers = httpOptions.headers.set('Authorization', localStorage.getItem('Authorization'));
  return this.http.get<Event[]>(this.eventsUrl, httpOptions);
 
}

getEvent(id:number): Observable<Event>{
  const url = `${this.eventsUrl}/${id}`;
  httpOptions.headers = httpOptions.headers.set('Authorization', localStorage.getItem('Authorization'));
  return this.http.get<Event>(url, httpOptions);
}

updateEvent (event:Event): Observable<any>{
  let url = this.eventsUrl + `/${event.id}`;
  httpOptions.headers = httpOptions.headers.set('Authorization', localStorage.getItem('Authorization'));
  return this.http.put(url, event, httpOptions);
}

public addEvent (event:Event){
  httpOptions.headers = httpOptions.headers.set('Authorization', localStorage.getItem('Authorization'));
  return this.http.post<Event> (this.eventsUrl, event, httpOptions);
}

public deleteEvent(event: Event | number): Observable<Event>{
  const id = typeof event === 'number' ? event : event.id;
  const url = `${this.eventsUrl}/${id}`;

  httpOptions.headers = httpOptions.headers.set('Authorization', localStorage.getItem('Authorization'));
  return this.http.delete<Event> (url, httpOptions);

}

}
