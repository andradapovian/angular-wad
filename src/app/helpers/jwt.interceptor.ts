import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem("user"));

        if(currentUser && currentUser.token) {
            request = request.clone(
                {
                    setHeaders: {
                        Authorization: localStorage.getItem('Authorization')
                    }
                }
            );
        }

        return next.handle(request);
    }

}