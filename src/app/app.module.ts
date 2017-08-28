import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';
//routing
import {AppRoutingModule} from './app.routing'

//third Party
import { MyDatePickerModule } from 'mydatepicker';

//Components
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer/customer.detail.component'
import { PageNotFoundComponent } from './pageNotFound/page.not.found.component';
//Services
import {CustomerService} from './services/customer.service'

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerDetailComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule
  ],
  providers: [
    CustomerService,       
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
