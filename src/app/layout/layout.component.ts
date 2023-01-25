import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  menuItems: MenuItem[];
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.setMenuItems();
  }

  setMenuItems() {
    this.menuItems = [{
      icon: 'fa fa-home',
      label: 'Home',
      routerLink: '/home',
      skipLocationChange :true
    },
    {
      icon: 'fa fa-user',
      label: 'Users',
      routerLink: '/user',
      skipLocationChange : true
    }
    ];
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(["/auth"], { skipLocationChange: true });
  }

}
