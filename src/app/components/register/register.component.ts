import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private userService: UserService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'confirmPass': new FormControl(null, Validators.required)
    })
  }
  onSubmit(){
    const user = new User();
    user.firstName = this.registerForm.value.firstName;
    user.lastName = this.registerForm.value.lastName;
    user.email = this.registerForm.value.email;
    user.password = this.registerForm.value.password;
    console.log(user);
    this.userService.registerUser(user).subscribe((data) => {
        this.userService.token = data.token;
        this.userService.user = data;
        this.router.navigate(['products']);
      this.userService.IsLoggedIn = !this.userService.IsLoggedIn;
    });
  }
}
