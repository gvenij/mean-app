import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { LayoutService } from '../services/layout.service';
import { TIMEZONES } from '../shared/timezones';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  
  events: any = [];
  timezones = TIMEZONES;
  newEventTitle: string = '';
  newEventTime: string = '';
  newEventDuration: string = '';

  constructor(private eventsService: EventsService, private layoutService: LayoutService) { }

  // Create new event
  createEvent(){  
    let concTz = this.timezones.col1.concat(this.timezones.col2);
    let matchedStart;
    let firstDig = this.newEventTime.split(':')[0];
    let secDig = this.newEventTime.split(':')[1];

    for(let k = 0; k < concTz.length; k=k+2){
      let valFirstDig = concTz[k].label.split(':')[0];
      
      if(+valFirstDig === +firstDig){
        matchedStart = +concTz[k].start + (+secDig);
      }
    }

    let newEvent = {
      start:  matchedStart,
      duration: this.newEventDuration,
      title: this.newEventTitle
    };

    let result = this.eventsService.saveEvent(newEvent);
    result.subscribe(event => {
      this.events.push(this.layoutService.eventPlacing(event))
      this.layoutService.eventsPositionFixing(this.events);
    });
  }

  // Delete event

  deleteEvent(id){
    let events = this.events;
    
    this.eventsService.deleteEvent(id)
      .subscribe(data => {
        console.log(data);
        if(data.n == 1){
          for(var i = 0; i < events.length; i++){
            if(events[i]._id == id){
              events.splice(i, 1);
            }
          }
        }
      })
  }

  ngOnInit() {
    // Retrieve events from the API
    this.eventsService.getAllEvents().subscribe(events => {

    events.map(event => {
      this.layoutService.eventPlacing(event)
    })

    this.layoutService.eventsPositionFixing(events);
    
    console.log(events);
    this.events = events;
    });

  }

}
