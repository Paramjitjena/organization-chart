import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



export class BaseLayoutComponent implements OnInit, OnDestroy {

    constructor(
        private authSvc: AuthService
    ) {

    }

    ngOnInit() {

    }
    ngOnDestroy() {

    }


    logout() {
        this.authSvc.logout();
    }

}
