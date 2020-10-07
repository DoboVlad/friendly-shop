import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import {UserService } from '../service/user.service';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) : boolean | Promise<boolean> | Observable<boolean> | UrlTree{
    const isAuth = !this.userService.IsLoggedIn;
    if(isAuth) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}
