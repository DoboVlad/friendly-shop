import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AuthGuard } from './common/auth.guards';
import { MyAccountComponent } from './components/my-account/my-account.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'addProduct', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'products', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch : 'full'},
  {path: '**', redirectTo: '/home', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
