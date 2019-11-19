import { Component, OnInit, Input } from '@angular/core';
import {Event} from '../event';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {EventService} from '../event.service';

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.css']
})
export class EventDescriptionComponent implements OnInit {

  event: Event;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location) { }

  ngOnInit():void {
    this.getEvent();
  }

  getEvent():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(id).subscribe(event => this.event = event);
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.eventService.updateEvent(this.event)
    .subscribe(() => this.goBack());
  }

  delete():void{
   
    this.eventService.deleteEvent(this.event).subscribe(() => this.goBack());
  }
}
