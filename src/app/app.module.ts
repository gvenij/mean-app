import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { EventsService } from './services/events.service';
import { LayoutService } from './services/layout.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    component: EventsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [EventsService,LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
