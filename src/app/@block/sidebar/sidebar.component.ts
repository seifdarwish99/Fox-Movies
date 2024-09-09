import { Component } from '@angular/core';
import { menuData } from '../data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor() {}

  get cardsData() {
    return menuData;
  }
}
