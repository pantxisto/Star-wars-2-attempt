import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashService{
  flash: { message: string; type: string; keepAfterLocationChange: boolean };
  flashSubject: Subject<{
    message: string;
    type: string;
    keepAfterLocationChange: boolean;
  }> = new Subject<{
    message: string;
    type: string;
    keepAfterLocationChange: boolean;
  }>();

  constructor() {}

  clearFlashMessage() {
    if (this.flash) {
      if (!this.flash.keepAfterLocationChange) {
        delete this.flash;
      } else {
        // only keep for a single location change
        this.flash.keepAfterLocationChange = false;
      }
      this.flashSubject.next(this.flash ? JSON.parse(JSON.stringify(this.flash)) : null);
    }
  }

  Success(message, keepAfterLocationChange?) {
    this.flash = {
      message: message,
      type: 'success',
      keepAfterLocationChange: keepAfterLocationChange,
    };
    this.flashSubject.next(JSON.parse(JSON.stringify(this.flash)));
  }

  Error(message, keepAfterLocationChange?) {
    this.flash = {
      message: message,
      type: 'error',
      keepAfterLocationChange: keepAfterLocationChange,
    };
    this.flashSubject.next(JSON.parse(JSON.stringify(this.flash)));
  }
}
