import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICustomResponse } from '../models/customresponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  getUsers(): Observable<ICustomResponse> {
    return this._httpClient.get<ICustomResponse>(environment.API_URL+'user');
  }

}
