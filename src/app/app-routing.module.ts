import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticatedGuard } from './guards/authenticated/authenticated.guard';
import { guestGuard } from './guards/guest/guest.guard';

const routes: Routes = [
  { path: '',   redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth', canActivate: [guestGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'space', canActivate: [authenticatedGuard], loadChildren: () => import('./space/space.module').then(m => m.SpaceModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
