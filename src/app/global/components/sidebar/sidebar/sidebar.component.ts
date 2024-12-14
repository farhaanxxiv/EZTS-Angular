import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss'],
    imports: [RouterOutlet, RouterLink],
})

export class SidebarComponent {}