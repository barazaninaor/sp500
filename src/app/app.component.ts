import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UpdateButtonComponent } from './components/update-button/update-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, UpdateButtonComponent],
  template: `
    <nav class="navbar">
      <ul class="nav-links">
        <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
        <li><a routerLink="/stocks" routerLinkActive="active">Stocks</a></li>
        <li><a routerLink="/sectors" routerLinkActive="active">Sectors</a></li>

        <li class="update-item">
          <app-update-button></app-update-button>
        </li>
      </ul>
    </nav>

    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {

}