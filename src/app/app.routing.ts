import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { PageNotFoundComponent } from './pageNotFound/page.not.found.component';
import { CustomerComponent } from './customer/customer.component'
import { CustomerDetailComponent } from './customer/customer.detail.component'

const appRoutes: Routes = [
  { path: 'app/customers', component: CustomerComponent },
  { path: 'app/customerDetail', component: CustomerDetailComponent },  
  { path: '', redirectTo: 'app/customers', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes)
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
