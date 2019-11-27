import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    
  }

  loggedAdmin():boolean{
    return this.authService.loggedIn();
  }

  logged():boolean{
    
    return this.authService.loggedIn();
  }

}