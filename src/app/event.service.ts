import { Injectable } from '@angular/core';
import { Event } from './event';
import {EVENTS} from './mock-events';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor( ) { }

getEvents(): Observable<Event[]>{
  return of(EVENTS);
}

getEvent(id:number): Observable<Event>{
  return of(EVENTS.find(event => event.id === id));
}

}
