import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: IUser[] = [];
  cols: any[];
  constructor(public _userService : UserService) { }

  ngOnInit(): void {
    this.getUsers();


    this.cols = [
      { field: 'Username', header: 'Username' },
      { field: 'Password', header: 'Password' },
      { field: 'RefreshToken', header: 'Refresh Token' },
      { field: 'RefreshTokenEndDate', header: 'Refresh Token Finish Time ' }
  ];
  }


  getUsers(){
    this._userService.getUsers().subscribe(
      x=> {
        
        this.users = x.Data as IUser[];
        console.log(x);
        
      }
    );
  }

}
