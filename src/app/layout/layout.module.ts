import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [LayoutComponent, HomeComponent,UserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    MenubarModule,
    ButtonModule,
    TableModule
  ]
})
export class LayoutModule { }
