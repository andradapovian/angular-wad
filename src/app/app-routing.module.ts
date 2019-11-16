import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './auth-gaurd.service';
import { EventAddComponent } from './event-add/event-add.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'events', component: EventsComponent, canActivate:[AuthGaurdService] },
  {path: 'events/add', component: EventAddComponent, canActivate:[AuthGaurdService]},
  {path: 'description/:id', component: EventDescriptionComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGaurdService]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
