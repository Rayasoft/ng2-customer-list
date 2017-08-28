import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//HTTP
import {Http,Response, RequestOptions, Headers} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router'


//models
import {AddressEntity,CustomerEntity, ICustomerEntity,IAddressEntity} from '../app.model'

@Injectable()
export class CustomerService {
  private baseUrl: string = './api/';
  private apiVersion = '2.2';

  private isMockupDataUsing:boolean=false;
  customerList:CustomerEntity[]=[];
  selectedCustomerId:number=0;

  constructor(private http:Http ) { }
  setMockUpFlag(value:boolean){
    this.isMockupDataUsing=value;
    if(value)
      {
         this.initMockupData();
      }
  }

private getHeaders() {
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  return headers;
}
public handleError(error: any) {
  // could be something more sofisticated
  let errorMsg = error.message || `Unable to read questions! please check your internet connection or try again later.`;
  console.error(errorMsg);
  // instead of Observable we return a rejected Promise
  //return Promise.reject(errorMsg);
  return Observable.throw(errorMsg);
}

  getMockupFlag(){
    return this.isMockupDataUsing;
  }
  getCustomer() {
    if(this.isMockupDataUsing)
      {      
        return Observable.of(this.customerList);
      }
      else{
        let result$ = this.http
                    .get(this.baseUrl + '/GetAllCustomers', { headers: this.getHeaders() })
                    .map(r => r.json())
                    .catch(this.handleError);
         return result$;
      }
  }
  createCustomer(customer:CustomerEntity) {
    if(this.isMockupDataUsing)
      { 
        let newCustomerId =0;
        let isNewCustomer :boolean=false;
        if(customer.CustomerId === undefined || customer.CustomerId ===null){
          customer.CustomerId =0;
        }
        if(customer.CustomerId < 1)
          {
            isNewCustomer=true;
         this.customerList.forEach(c=>{
           if(c.CustomerId> newCustomerId)
            {
              newCustomerId = c.CustomerId;
            }
         });
         newCustomerId++;
         customer.CustomerId=  newCustomerId;
        }
         if(customer.Addresses !== undefined && customer.Addresses!== null && customer.Addresses.length > 0)
          {
            let addressIndex:number = 0;
            customer.Addresses.forEach(c=>{
              addressIndex++;
              c.CustomerId=newCustomerId ;
              c.AddressId = addressIndex ;
          });
        }
        if(isNewCustomer)
            {
              this.customerList.push(customer);    
            }
            else
              {
                this.customerList.filter(c=>c.CustomerId=== customer.CustomerId).forEach(itm=>{
                  itm.Addresses= customer.Addresses;
                  itm.DOB= customer.DOB;
                  itm.FirstName= customer.FirstName;
                  itm.LastName= customer.LastName;
                  itm.MobileNumber= customer.MobileNumber;
                  itm.ProfilePicturePath= customer.ProfilePicturePath;                                    
                });
              }
          return Observable.of(this.customerList);
      
    }
      else{
        let result$ = this.http
        .post(this.baseUrl + '/CreateCustomers',customer, { headers: this.getHeaders() })
        .map(r => r.json())
        .catch(this.handleError);
         return result$;
      }
  }
  logError(err) {
    console.error('There was an error: ' + err);
  }
  logErrors(error:any) {
    if(this.isMockupDataUsing)
      {      
        console.log("Error:",error);
      }
      else{
        let result$ = this.http
                    .post(this.baseUrl + '/LogClientError',error, { headers: this.getHeaders() })
                    .map(r => r.json())
                    .catch(new function(){
                      console.log('Failed to log eror to server:',error);
                    });
         return result$;
      }
  }
private initMockupData(){
  if(this.customerList !== undefined && this.customerList !== null && this.customerList.length < 1)
    {
      let customerTmp = new CustomerEntity();
      let addressTmp = new AddressEntity();

      //customer 1
      customerTmp.CustomerId = 1;
      customerTmp.FirstName = "sample string 2";
      customerTmp.LastName = "sample string 3";
      customerTmp.DOB =new Date("2017-08-23T17:41:14.8548057+10:00");
      customerTmp.MobileNumber = "sample string 4";
      customerTmp.ProfilePicturePath = "sample string 5";    
      
      customerTmp.Addresses = [];
      addressTmp.AddressId=1;
      addressTmp.CustomerId=1;
      addressTmp.AddressLine1="sample string 3";
      addressTmp.AddressLine2="sample string 4";
      addressTmp.Suburb="sample string 5";
      addressTmp.City="sample string 6";
      addressTmp.PostCode="sample string 7";
      customerTmp.Addresses.push(Object.assign({},addressTmp))

      addressTmp.AddressId = 2;
      addressTmp.CustomerId = 1;
      addressTmp.AddressLine1 = "sample string 3";
      addressTmp.AddressLine2 = "sample string 4";
      addressTmp.Suburb = "sample string 5";
      addressTmp.City = "sample string 6";
      addressTmp.PostCode = "sample string 7";
      customerTmp.Addresses.push(Object.assign({},addressTmp))
      this.customerList.push(Object.assign({},customerTmp));


      //customer 2
      customerTmp.CustomerId = 2;
      customerTmp.FirstName = "sample string 2";
      customerTmp.LastName = "sample string 3";
      customerTmp.DOB =new Date("2017-08-23T17:41:14.8548057+10:00");
      customerTmp.MobileNumber = "sample string 4";
      customerTmp.ProfilePicturePath = "sample string 5";    

      customerTmp.Addresses = [];
      addressTmp.AddressId=3;
      addressTmp.CustomerId=2;
      addressTmp.AddressLine1="sample string 3";
      addressTmp.AddressLine2="sample string 4";
      addressTmp.Suburb="sample string 5";
      addressTmp.City="sample string 6";
      addressTmp.PostCode="sample string 7";
      customerTmp.Addresses.push(Object.assign({},addressTmp))

      addressTmp.AddressId = 4;
      addressTmp.CustomerId = 2;
      addressTmp.AddressLine1 = "sample string 3";
      addressTmp.AddressLine2 = "sample string 4";
      addressTmp.Suburb = "sample string 5";
      addressTmp.City = "sample string 6";
      addressTmp.PostCode = "sample string 7";
      customerTmp.Addresses.push(Object.assign({},addressTmp))
      this.customerList.push(Object.assign({},customerTmp));
  } 
  }
}
