import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent {
    constructor(private oauthService: OAuthService) {

    }

    get loggedin() {
        return this.oauthService.hasValidAccessToken();
    }
}
