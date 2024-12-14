import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './global/components/sidebar/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',


})
export class AppComponent {
  title = 'myNewApp';
}
 