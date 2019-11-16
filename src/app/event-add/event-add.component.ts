import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import{ Event } from '../event';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {
  submitted = true;

  model = new Event('','',new Date(),new Date(),'');


  constructor( private eventService: EventService,
    private location: Location) { }

  

  ngOnInit() {}

  onSubmit() {
    this.eventService.addEvent(this.model).subscribe(() => {this.goBack();
    });
    this.submitted = true;
  }

  goBack(): void{
    this.location.back();
  }
  get diagnostic() {
    return JSON.stringify(this.model);
  }

}
