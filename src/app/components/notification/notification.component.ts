import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationService,
  Notification,
} from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe(
      (notification: Notification) => {
        this.notifications.push(notification);
        setTimeout(() => this.removeNotification(notification), 5000);
      }
    );
  }

  removeNotification(notification: Notification) {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }

  getAlertClass(type: 'success' | 'error' | 'info' | 'warning'): string {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-danger';
      case 'info':
        return 'alert-info';
      case 'warning':
        return 'alert-warning';
      default:
        return '';
    }
  }
}
