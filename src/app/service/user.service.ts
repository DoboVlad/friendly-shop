import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticatedUser } from '../common/authenticatedUser';
import { User } from '../common/user';
import { environment } from '../../environments/environment';

const backend_url = environment.apiUrl + "/";

interface RegisterResponse{
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  IsLoggedIn = true;
  user: AuthenticatedUser;
  token: string;
  constructor(private httpClient: HttpClient) { }

  baseUrl = backend_url + "users";
  updateUserUrl = backend_url + 'users/me';
  registerUser(user: User){
      return this.httpClient.post<AuthenticatedUser>(this.baseUrl, user);
  }

  logInUser(email: string, password: string){
    return this.httpClient.post(this.baseUrl + "/login", {email, password})
    };

    updateUser(user: User): Observable<any>{
      return this.httpClient.patch(this.updateUserUrl, user,{
        headers: {
        'Authorization' : 'Bearer ' + this.token
      }
    });
  }

  autoLogInUser(){
    const logInInfo = this.getAuthData();
    this.token = logInInfo.token;
    this.user = logInInfo.user;
  }

  getAuthData(){
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if(!token) {
      return;
    }
    return {
      token: token,
      user: JSON.parse(user)
    }
  }

  safeLogInToken(token: string, user: AuthenticatedUser) {
      localStorage.setItem('token', token);

      localStorage.setItem('user', JSON.stringify(user));
  };

  clearLogInToken(token: string){
      localStorage.removeItem('token');
  }
}
