import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResultsComponent } from './components/results/results.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { NavComponent } from './components/nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { authInterceptorProviders } from './services/auth.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ResultsComponent,
    ProductDetailsComponent,
    ProductSearchComponent,
    NavComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    ComponentsModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
