import { Component, OnInit,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule,IMyDpOptions,MyDatePicker } from 'mydatepicker';
import { Router} from '@angular/router';

//Services
import{CustomerService} from '../services/customer.service'
//Models
import{CustomerEntity,AddressEntity} from '../app.model'

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer.detail.component.html',
  styleUrls: ['./customer.detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  private title:string="Customer detail";

  addressDetail=new AddressEntity();
  customerDetail:CustomerEntity;
  isAddingNewAddress:boolean=false;
  name="Customer detail";
  customerDOB=new  Object();

   addressHasError:boolean=false;  
   customerInvalidFieldsError:boolean=false;  
   customerInvalidDOBError:boolean=false;  

   customerSaveError:boolean=false;  
   customerSaveErrorMessage:string="";  

  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    markCurrentDay: true,
    
};

  constructor(private customerService:CustomerService,private router: Router) { }

  ngOnInit() {
    if(this.customerService.selectedCustomerId == 0)
      {
          this.customerDetail =new CustomerEntity()
      }
      else{
          let customerItems = this.customerService.customerList.filter(c=>c.CustomerId == this.customerService.selectedCustomerId);
            if(customerItems.length !== 1)                
              {
               //TODO: Thow Error 
               this.customerDetail =new CustomerEntity()
               this.customerSaveError = true;
               this.customerSaveErrorMessage = "Wrong customer record to edit";
              }
              else{
                 this.customerDetail=customerItems[0];   
              }
              this.customerDOB = { date: {year:this.customerDetail.DOB.getFullYear(),
                month:this.customerDetail.DOB.getMonth()+1,
                day:this.customerDetail.DOB.getDate()
               } };              
      }
    
  }
  addAddress(){
    this.addressDetail = new AddressEntity();
    this.isAddingNewAddress = true;
    this.addressHasError=false;
  }
  addAddressToCustomer(){
    //required fields are provided
    if(this.addressDetail.AddressLine1 === undefined || this.addressDetail.AddressLine1 === null || this.addressDetail.AddressLine1 === ''  ||
      this.addressDetail.City === undefined || this.addressDetail.City === null || this.addressDetail.City === '')
      {
        this.addressHasError=true;        
        return ;
      }
      this.addressHasError=false;
    if(this.customerDetail.Addresses === null || this.customerDetail.Addresses ===undefined){
      this.customerDetail.Addresses =[];
    }    
    //new or existed address
    if(this.addressDetail.AddressId > 0){
        let isCreated = this.customerDetail.Addresses.filter(a=>a.AddressId === this.addressDetail.AddressId).length;
        if(!isCreated)
          {
            //TODO: Throw Error
          }
          else{
            this.customerDetail.Addresses.filter(a=>a.AddressId === this.addressDetail.AddressId).forEach(a=>{
              a.AddressId=this.addressDetail.AddressId;
              a.AddressLine1=this.addressDetail.AddressLine1;
              a.AddressLine2=this.addressDetail.AddressLine2;
              a.City=this.addressDetail.City;
              //a.CustomerId=this.addressDetail.CustomerId;
              a.PostCode=this.addressDetail.PostCode;              
              a.Suburb=this.addressDetail.Suburb;              
            });
          }
    }
    else{      
      if(this.addressDetail.AddressId === undefined || this.addressDetail.AddressId === null)
        {
          this.addressDetail.AddressId =0;
        }
      this.customerDetail.Addresses.forEach(c=>{
        if(this.addressDetail.AddressId < c.AddressId)
          {
            this.addressDetail.AddressId = c.AddressId;
          }
      });
      this.addressDetail.AddressId++;
      console.log(this.addressDetail.AddressId);
      this.customerDetail.Addresses.push(this.addressDetail);
    }  
    this.isAddingNewAddress=false;
  }
  attachFile(event) : void {
    var reader = new FileReader();
    let _self = this;
    if(this.customerService.getMockupFlag())
      {
        reader.onload = function(e) {
          _self.customerDetail.ProfilePicturePath = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
   }
  backToList(){
    this.customerService.selectedCustomerId = 0;
    this.router.navigate(['app/customers']);
  }
  backToAddressList(){
    this.isAddingNewAddress=false;
  } 
  confirmPlanDeletion(address:AddressEntity){
    let isCreated = this.customerDetail.Addresses.filter(a=>a.AddressId === this.addressDetail.AddressId).length;
    if(isCreated)
      {
        this.customerDetail.Addresses = this.customerDetail.Addresses.filter(a=>a.AddressId !== this.addressDetail.AddressId);
      }

  }
  editAddress(address:AddressEntity){
    this.addressDetail = Object.assign({},address);
    this.isAddingNewAddress = true;
    this.addressHasError=false;
  }
  saveCustomer(){
    this.customerInvalidFieldsError=false;  
    this.customerSaveError=false;   
    this.customerSaveErrorMessage = "";
    this.customerInvalidDOBError=false;

    if(this.customerDetail.FirstName === undefined || this.customerDetail.FirstName === null ||
      this.customerDetail.LastName === undefined || this.customerDetail.LastName===null )
      {
        this.customerInvalidFieldsError=true;
        return;
      }      
      if(this.customerDOB  === undefined || this.customerDOB  === null){
        this.customerInvalidDOBError=true;
        return;
      }
      this.customerDetail.DOB=new Date(this.customerDOB["jsdate"]);
    this.customerService.createCustomer(this.customerDetail).subscribe(
      data=>{
            this.backToList();
      },
      error=>{
        this.customerSaveErrorMessage = error;
        this.customerSaveError=true;   
      }
    );
  }
  upload(){
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      // this.projectService.upload(formData, this.project.id).subscribe(res => {
      //   // do stuff w/my uploaded file
      // });
    }

  }
}
