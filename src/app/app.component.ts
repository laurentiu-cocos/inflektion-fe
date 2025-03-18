import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftMenuComponent } from './header/left-menu.component';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  imports: [LeftMenuComponent, RouterOutlet, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';

  @Output() toggleMenuEvent = new EventEmitter<void>();

  toggleLeftMenu() {
    this.toggleMenuEvent.emit();
  }
}
