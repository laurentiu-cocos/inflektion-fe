import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  showNotification(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ) {
    this.notificationSubject.next({ message, type });
  }
}
