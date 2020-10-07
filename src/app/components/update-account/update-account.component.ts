import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticatedUser } from 'src/app/common/authenticatedUser';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  updateAccountForm: FormGroup;
  authenticatedUser: AuthenticatedUser;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.authenticatedUser = this.userService.user;
      this.updateAccountForm = new FormGroup({
        'firstName': new FormControl(this.authenticatedUser.user.firstName, Validators.required),
        'lastName': new FormControl(this.authenticatedUser.user.lastName, Validators.required),
        'email': new FormControl(this.authenticatedUser.user.email, [Validators.required, Validators.email]),
        //'password': new FormControl(null)
      });
  }
    onSubmit(){
      const user = new User();
      user.firstName = this.updateAccountForm.value.firstName;
      user.lastName = this.updateAccountForm.value.lastName;
      user.email = this.updateAccountForm.value.email;
      this.userService.updateUser(user).subscribe(data => {
        this.authenticatedUser = data;
        console.log(this.authenticatedUser);
        this.userService.user = this.authenticatedUser;
        this.authenticatedUser = this.userService.user;
      });
    }
}
