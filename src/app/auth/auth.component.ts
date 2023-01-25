import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITokenRequest } from '../shared/models/token/tokenrequest';
import { ITokenResponse } from '../shared/models/token/tokenresponse';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  tokenRequestModel: ITokenRequest = <ITokenRequest>{};
  constructor(private _authService: AuthService, private router: Router) { }

  get form() { return this.authForm.controls; }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.authForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    this.tokenRequestModel.Username = this.form.username.value;
    this.tokenRequestModel.Password = this.form.password.value;

    this._authService.getAccessToken(this.tokenRequestModel).subscribe(t => {
      let tokenResponse = t.Data as ITokenResponse;
      localStorage.setItem('token', tokenResponse.AccessToken);
      localStorage.setItem('refreshToken', tokenResponse.RefreshToken);
      this.router.navigate(['/home'], { skipLocationChange: true });
    });

  }


}
