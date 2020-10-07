
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { AuthenticatedUser } from 'src/app/common/authenticatedUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  logInStatus;
  error: string;
  constructor(private userService: UserService, private router: Router,) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required)
    });
  }

  logIn(){
    this.error = '';
    const status = this.userService.logInUser(this.loginForm.value.email, this.loginForm.value.password).subscribe((data: AuthenticatedUser) => {
      this.logInStatus = data;
      if(this.logInStatus.error){
        this.error = 'Unable to log in'
      }else{
        this.userService.token = data.token;
        this.userService.user = data;
        this.userService.IsLoggedIn = !this.userService.IsLoggedIn;
        this.userService.safeLogInToken(data.token, data);
        this.router.navigate(['home']);
      }
    }, error => {
      console.log(error);
    });
  }
}
