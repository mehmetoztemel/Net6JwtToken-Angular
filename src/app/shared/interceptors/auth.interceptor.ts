import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ITokenRequest } from "../models/token/tokenrequest";
import { IRefreshTokenRequest } from "../models/token/refreshtokenrequest";
import { ITokenResponse } from "../models/token/tokenresponse";
import { ICustomResponse } from "../models/customresponse";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    isRefreshing: boolean = false;
    constructor(private router: Router, private _authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authreq = request;
        authreq = this.AddTokenheader(request, localStorage.getItem('token'));
        return next.handle(authreq).pipe(
            catchError(errorData => {
                if (errorData.status === 401) {
                    return this.handleRefrehToken(request, next);
                }
                return throwError(() => errorData);
            })
        );
    }
    AddTokenheader(request: HttpRequest<any>, token: any) {
        return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {

        if (!this.isRefreshing) {
            this.isRefreshing = true;

            let refreshToken = <IRefreshTokenRequest>{
                RefreshToken: localStorage.getItem('refreshToken')
            };

            if (localStorage.getItem('token') != null) {
                return this._authService.refreshToken(refreshToken).pipe(
                    switchMap((data: any) => {
                        this.isRefreshing = false;
                        console.log(data);
                        let tokenResponse = data.Data as ITokenResponse;
                        localStorage.setItem('token', tokenResponse.AccessToken);
                        localStorage.setItem('refreshToken', tokenResponse.RefreshToken);
                        return next.handle(this.AddTokenheader(request, tokenResponse.AccessToken))
                    }),
                    catchError(errordata => {
                        this.isRefreshing = false;
                        this.Logout();
                        return throwError(() => errordata);
                    })
                );
            }
        }
    }

    Logout() {
        localStorage.clear();
        this.router.navigateByUrl('/auth', { skipLocationChange: true });
    }
}
