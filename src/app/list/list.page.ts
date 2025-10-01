import { Component, OnInit } from '@angular/core';

interface Product {
 productName: string,
 productDate: Date,
 productPrice: number,
 total:number
 
}


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {


product:Product = {
   productName: 'Iphone 14',
   productDate: new Date(),
   productPrice: 14000000,
   total:0
   

   
}

  
today:string='8 September 2024'
currentDate = new Date();

quantity = 0




quantityAdd(){
  this.quantity++
  if (this.quantity > 10) this.quantity = 10;
  if (this.quantity < 0) this.quantity = 0;
  this.product.total = this.quantity * this.product.productPrice;
}

quantitySubs(){
  this.quantity--
  if (this.quantity > 10) this.quantity = 10;
  if (this.quantity < 0) this.quantity = 0;
  this.product.total = this.quantity * this.product.productPrice;
}




today_ind():string {
const currentDate = new Date();
const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// Get the current day (1-31)
const d = this.currentDate.getDate();
const day = this.currentDate.getDay();
// Get the current month (0-11, where 0 is January and 11 is December)
const m = this.currentDate.getMonth() + 1; // Adding 1 to convert to 1-12 range
// Get the current year (four-digit year)
const y = this.currentDate.getFullYear();
return dayArray[day]+" " +  d +'-'+monthArray[m-1]+'-'+y;




}
is5daysago=false
is5daysfromnow = false
numberclicked=0
disabled = false

goYesterday(){
  this.currentDate.setDate(this.currentDate.getDate() - 1);
  this.numberclicked++
  if(this.numberclicked==5){
    this.is5daysago=true
  } 
  if(this.numberclicked>-5){
    this.disabled=false
  }
  if(this.numberclicked<5){
    this.is5daysfromnow=false
  }
  

}

goTommorow(){
   this.currentDate.setDate(this.currentDate.getDate() + 1);
   this.numberclicked--;                   
    this.is5daysfromnow = (this.numberclicked === -5);

    if (this.numberclicked === -5) {
      this.disabled = true;                
    }
    if (this.numberclicked < 5) {
      this.is5daysago = false;
    }

}

goReset(){
    this.currentDate = new Date();
    this.numberclicked = 0;
    this.is5daysago = false;
    this.is5daysfromnow = false;
    this.disabled = false;
    
    
}
  constructor() { }

  ngOnInit() {
  }

}
