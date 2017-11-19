import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {

  constructor(private http: Http) { }

  // Get all events from the API
  getAllEvents() {
    return this.http.get('/api')
      .map(res => res.json());
  }

  // Saeve event
  saveEvent(event){
    console.log( "Log event from service: ", event);
    
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/event', JSON.stringify(event), {headers: headers})
        .map(res => res.json());
  }

  // Delete event
  deleteEvent(id){
    return this.http.delete('/api/event/'+id)
        .map(res => res.json());
}

}
