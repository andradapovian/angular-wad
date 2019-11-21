import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    dialogConfig = new MatDialogConfig();

    constructor(
        private authenticationService: AuthenticationService,
        private dialog: MatDialog
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                this.dialogConfig.autoFocus = true;
                this.dialogConfig.closeOnNavigation = true;
                this.dialogConfig.disableClose = false;

                if (err.status === 401 || err.status == 403 || err.status == 400) {
                    if (err.error) {
                        this.dialogConfig.data = {
                            message: err.error.message
                        }
                        console.log(err.error.message);
                    }
                    else {
                        this.dialogConfig.data = {
                            message: err.statusText
                        }
                        console.log(err.statusText);
                    }
                }

                this.dialog.open(ErrorDialogComponent, this.dialogConfig);

                // let error = err.error.message || err.statusText;
                return throwError(err);
            })
        )
    }

}