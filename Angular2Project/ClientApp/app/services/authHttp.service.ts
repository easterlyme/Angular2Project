import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthHttpService {
    constructor(private http: Http, private oAuthService: OAuthService) {
        
    }

    get(url: string) {
        if (!this.oAuthService.hasValidAccessToken())
            throw Error("Can not load User Profile without access_token");

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.oAuthService.getAccessToken());

        return this.http.get(url, { headers }); //.map(r => r.json());
    }
}