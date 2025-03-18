import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss',
  imports: [RouterLink, RouterLinkActive],
})
export class LeftMenuComponent implements OnInit {
  leftMenuOpen = true;

  constructor(private appComponent: AppComponent) {}

  ngOnInit() {
    this.appComponent.toggleMenuEvent.subscribe(() => this.toggleLeftMenu());
  }

  toggleLeftMenu() {
    this.leftMenuOpen = !this.leftMenuOpen;
  }
}
