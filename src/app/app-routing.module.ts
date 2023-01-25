import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule) },
  {
    path: "",
    component: AppComponent,
    children: [
      { path: "", loadChildren: () => import('./layout/layout.module').then(h => h.LayoutModule) ,canActivate :[AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 