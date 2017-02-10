import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthHttpService } from './services/authHttp.service';
import { CanActivateViaAuthGuard } from './guards/auth.guard';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent, canActivate: [ CanActivateViaAuthGuard] },
            { path: 'fetch-data', component: FetchDataComponent },  
            { path: '**', redirectTo: 'home' }
        ]),
        OAuthModule.forRoot()
    ],
    providers: [
        CanActivateViaAuthGuard,
        AuthHttpService
    ]
})
export class AppModule {
}
