import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

//Services
import{CustomerService} from '../services/customer.service'

//Models
import{CustomerEntity} from '../app.model'
//Components
import{CustomerDetailComponent} from './customer.detail.component'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private title:string="List customers";
  searchName:string="";//searhch filter parameter  
  
  customers:CustomerEntity[];//all customers
  customersfiltered:CustomerEntity[];//filtered customers

  constructor(private customerService:CustomerService, private router: Router) { 
    customerService.setMockUpFlag(true);
  }

ngOnInit() {

  this.customerService.getCustomer().subscribe(
    data=>{    
      this.customers = Object.assign([],data);
      this.customersfiltered = Object.assign([],data);
      this.searchName="";      
    },
    error=>{
      console.log(error);
    });
}
filterItem(value){
  
   if(!value) this.customersfiltered = Object.assign({},this.customers);; //when nothing has typed
   this.customersfiltered = Object.assign([], this.customers).filter(
      item =>
       item.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
       item.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
       (item.FirstName + ' ' + item.LastName).toLowerCase().indexOf(value.toLowerCase()) > -1 );
}
addCustomer(){
  this.customerService.selectedCustomerId = 0;
  this.router.navigate(['app/customerDetail']);  
}
editCustomer(customer:CustomerEntity)
{
  this.customerService.selectedCustomerId = customer.CustomerId;
  this.router.navigate(['app/customerDetail']);
}

}
