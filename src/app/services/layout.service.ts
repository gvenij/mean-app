import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {

		// Setting positions for events
		eventPlacing(event){
			event.style = {};
			event.style.height = +event.duration *2;
			event.style.width = 225;
			event.style.top = event.start > 270 ? (+event.start * 2 -300 * 2)  : +event.start * 2;
			event.style.left = event.start > 270 ? 360 : 60;
			return event;
		}

		// Fixing positioning conflicts
		eventsPositionFixing(events){
			events
			.slice()
			.sort((event1, event2) => {
					return (+event1.start) - (+event2.start)
			})
			.map((event,index,array) => {
					let height = (+event.style.top) + (+event.style.height)
					let temp = index + 1;
					let nextEl = array[temp]
					
					if (nextEl && height > (+nextEl.style.top)) {
							if(event.style.left === nextEl.style.left){
									event.style.width = event.style.width/2
									nextEl.style.width = nextEl.style.width/2
									nextEl.style.left =  nextEl.style.left += nextEl.style.width
							}
							
						}
			})
		}

}
