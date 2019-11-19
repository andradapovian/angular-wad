import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComingUpComponent } from './event-coming-up.component';

describe('EventComingUpComponent', () => {
  let component: EventComingUpComponent;
  let fixture: ComponentFixture<EventComingUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventComingUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComingUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
