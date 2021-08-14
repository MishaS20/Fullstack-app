import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';
import { AuthService } from '../../services/auth.services';

@Component({
    selector: 'app-site-layout',
    templateUrl: './site-layout.component.html',
    styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

    @ViewChild('floating') floatingRef: ElementRef

    links = [
        { url: '/overview', name: 'Главная' },
        { url: '/analytics', name: 'Аналитика' },
        { url: '/comands', name: 'Команды' },
        { url: '/maps', name: 'Карты' },
        { url: '/history', name: 'История' },
        { url: '/order', name: 'Добавить ставку' },
        { url: '/categories', name: 'Категории' },
    ]
    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        MaterialService.initializeFloatingButton(this.floatingRef)
    }

    logout(event: Event) {
        event.preventDefault()
        this.auth.logout()
        this.router.navigate(['/login'])
    }
}
