import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './service/user.service';
import { FormControl } from '@angular/forms';
import { User } from './common/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mean-app';
  constructor(public userService : UserService){}
  @ViewChild('sidenav') sidenav:any;
  toggleSidenav(){
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }


  userStatus;
  myForm = new FormControl();
  mode = new FormControl('over');
  ngOnInit(){
    if(this.userService.getAuthData()){
      this.userService.IsLoggedIn = false;
    }
    this.userService.autoLogInUser();
    this.userStatus = this.userService.IsLoggedIn;
  }

  logOut(){
    this.userService.IsLoggedIn = !this.userService.IsLoggedIn;
    this.userStatus = this.userService.IsLoggedIn;
    this.userService.clearLogInToken(this.userService.token);
    this.userService.token = '';
  }
}
