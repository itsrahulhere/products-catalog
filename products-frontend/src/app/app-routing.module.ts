import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResultsComponent } from './components/results/results.component';
import { UsersGuard } from './services/users.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'signup', component: RegistrationComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'products-details/:id', component: ProductDetailsComponent, canActivate:[UsersGuard]
  },
  {
    path: 'products-search', component: ProductSearchComponent
  },
  {
    path: 'products', component: ResultsComponent
  },
  {
    path: 'products/:str', component: ResultsComponent
  }, 
  {
    path: 'not-found', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
