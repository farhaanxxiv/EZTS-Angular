import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarService } from '../../../../services/SidebarService';
import { Observable } from 'rxjs';


@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss'],
    imports: [RouterOutlet, RouterLink],
})

export class NavbarComponent {

    sidebarOpen$: Observable<boolean>;



    constructor(private sidebarService: SidebarService) {
        this.sidebarOpen$ = this.sidebarService.sidebarOpen$;

    }
    toggleSidebar() {
        console.log(this.sidebarOpen$)
        this.sidebarService.toggleSidebar();
    }

}