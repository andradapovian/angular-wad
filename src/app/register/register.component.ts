import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new User('', '', '', '', '');
  submitted = false;
  usernamePattern = '^[*]{5,}$';
  emailPattern = '^[*]+@[*]+';
  passwordPattern = '^[*]{8,}$';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  
  onSubmit() {
    this.submitted = true;
    this.userService.createUser(this.model).subscribe(value => console.log(value));
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

}
