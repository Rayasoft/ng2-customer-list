
//Interfaces 
export interface ICustomerEntity {    
    CustomerId: number;        
    FirstName: string;    
    LastName: string;
    Fullname: string;
    DOB: Date;
    MobileNumber: string;
    ProfilePicturePath: string;  
    Addresses:IAddressEntity[];
}
export interface IAddressEntity {
    AddressId:number;
    CustomerId: number;
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    PostCode: string; 
    Suburb: string;  
}
//Classess

export class CustomerEntity implements  ICustomerEntity{
    CustomerId: number;        
    FirstName: string;    
    LastName: string;
    Fullname: string; 
    DOB: Date;
    MobileNumber: string;
    ProfilePicturePath: string;  
    Addresses: AddressEntity[];

    constructor()
    {
         this.Addresses=[];
    }
}
export class AddressEntity implements IAddressEntity {
    AddressId:number;
    CustomerId: number;
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    PostCode: string; 
    Suburb: string;  
    constructor(){

    }
}

