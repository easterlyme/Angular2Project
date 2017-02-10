import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private oAuthService: OAuthService, private router: Router) { }

    canActivate() {
        if (this.oAuthService.hasValidAccessToken()) {
            return true;
        }

        this.router.navigate(['/home']);
        return false;
    }
}