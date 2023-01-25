import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITokenRequest } from '../models/token/tokenrequest';
import { map, Observable } from 'rxjs';
import { ICustomResponse } from '../models/customresponse';
import { ITokenResponse } from '../models/token/tokenresponse';
import { IRefreshTokenRequest } from '../models/token/refreshtokenrequest';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _httpClient: HttpClient, private router: Router) { }

  getAccessToken(tokenRequest: ITokenRequest): Observable<ICustomResponse> {
    return this._httpClient.post<ICustomResponse>(environment.API_URL + 'auth', tokenRequest)
  }

  refreshToken(refreshTokenRequest: IRefreshTokenRequest): Observable<ICustomResponse> {
    return this._httpClient.post<ICustomResponse>(environment.API_URL + 'auth/refreshtoken', refreshTokenRequest);
  }

}
