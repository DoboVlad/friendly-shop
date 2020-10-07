import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser } from 'src/app/common/authenticatedUser';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: AuthenticatedUser;
  isLoggedIn: boolean;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.isLoggedIn = this.userService.IsLoggedIn;
  }

}
