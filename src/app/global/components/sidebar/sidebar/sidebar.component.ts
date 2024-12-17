import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';     
import { Observable } from 'rxjs';
import { SidebarService } from '../../../../services/SidebarService';

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss'],
    imports: [RouterOutlet, RouterLink, CommonModule, RouterLinkActive],
    standalone: true
})
export class SidebarComponent {
    sidebarOpen$: Observable<boolean>;

    constructor(private sidebarService: SidebarService) {
        this.sidebarOpen$ = this.sidebarService.sidebarOpen$;
    }

    toggleSidebar() {
        this.sidebarService.toggleSidebar();
    }
}