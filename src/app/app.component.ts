import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './global/components/sidebar/sidebar/sidebar.component';
import { NavbarComponent } from './global/components/navbar/sidebar/navbar.component';
import { Observable } from 'rxjs';
import { SidebarService } from './services/SidebarService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'myNewApp';
  sidebarOpen$: Observable<boolean>;

  constructor(private sidebarService: SidebarService) {
    this.sidebarOpen$ = this.sidebarService.sidebarOpen$;
  }
}