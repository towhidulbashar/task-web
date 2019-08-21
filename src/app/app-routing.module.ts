import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationModule } from './registration/registration.module';

const routes: Routes = [
  {path:'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RegistrationModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
