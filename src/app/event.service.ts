import { Injectable } from '@angular/core';
import { Event } from './event';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsUrl = 'http://localhost:8080/events';
  constructor(private http: HttpClient ,
    private messageService: MessageService) { }

    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

getEvents(): Observable<Event[]>{
  return this.http.get<Event[]>(this.eventsUrl)
  .pipe(
    tap(_ => this.log('fetched events')),
      catchError(this.handleError<Event[]>('getEvents', []))
  );
}

getEvent(id:number): Observable<Event>{
  const url = `${this.eventsUrl}/${id}`;
  return this.http.get<Event>(url).pipe(
    tap(_ => this.log(`fetched event id=${id}`)),
    catchError(this.handleError<Event>(`getEvent id=${id}`))
  );
}

updateEvent (event:Event): Observable<any>{
  let url = this.eventsUrl + `/${event.id}`;
 // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem('Authorization'));
  return this.http.put(url, event, this.httpOptions).pipe(
    tap(_ => this.log(`update event id = ${event.id}`)),
    catchError(this.handleError<any>('updateEvent'))
  );
}

public addEvent (event:Event){
  return this.http.post<Event> (this.eventsUrl, event, this.httpOptions).pipe(
    tap((newEvent: Event) => this.log(`added event with id=${newEvent.id}`)),
    catchError(this.handleError<Event>('addEvent'))
  );
}

public deleteEvent(event: Event | number): Observable<Event>{
  const id = typeof event === 'number' ? event : event.id;
  const url = `${this.eventsUrl}/${id}`;

  return this.http.delete<Event> (url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted event id =${id}`)),
    catchError(this.handleError<Event>('deleteEvent'))
    );

}

}
