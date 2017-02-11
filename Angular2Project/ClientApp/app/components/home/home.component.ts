import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthHttpService } from '../../services/authHttp.service';

@Component({
    selector: 'home',
    template: require('./home.component.html')
})
export class HomeComponent implements OnInit {

    userName: string;
    password: string;
    loginFailed: boolean = false;
    apiCallContents: string;

    constructor(private oauthService: OAuthService, private http: AuthHttpService) {

    }

    apiCall() {
        this.http.get('http://localhost:60584/api/message')
            .subscribe(
                data => this.apiCallContents = data.text(),
                err => console.log(err),
                () => console.log('Request Complete')
            );
    } 

    logout() {
        this.oauthService.logOut(true);
    }

    get givenName() {
        var claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        return claims.email;
    }

    loginWithPassword() {

        this.oauthService.clientId = "angular2";
        this.oauthService
            .fetchTokenUsingPasswordFlowAndLoadUserProfile(this.userName, this.password)
            .then((json: any) => {
                console.debug('successfully logged in');
                this.loginFailed = false;
            })
            .catch((err) => {
                console.error('error logging in', err);
                this.loginFailed = true;
            })
            .then(() => {
                this.oauthService.clientId = "angular-app-1";
            });
    }

    ngOnInit() { }

}
