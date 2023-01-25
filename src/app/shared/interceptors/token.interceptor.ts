import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, switchMap, throwError } from "rxjs";
import { IRefreshTokenRequest } from "../models/token/refreshtokenrequest";
import { ITokenResponse } from "../models/token/tokenresponse";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    isRefreshing: boolean = false;
    constructor(private router: Router, private _authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        let token: string | null = localStorage.getItem("token");
        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
        return next.handle(req).pipe(
            catchError(errorData => {
                if (errorData.status === 401) {
                    return this.handleRefrehToken(req, next);
                }
                else{
                    console.log(errorData);
                    
                }
                return throwError(() => errorData);
            })
        );
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
                        return next.handle(request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + tokenResponse.AccessToken) }))
                    }),
                    catchError(errorData => {
                        this.isRefreshing = false;
                        this.Logout();
                        return throwError(() => errorData);
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