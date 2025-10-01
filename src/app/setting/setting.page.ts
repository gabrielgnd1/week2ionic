import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  photoUrl = ""
  password = ""
  ch1 = false
  ch2 = false
  ch3 = false

  checkInput(){
    
    this.ch1 = false;
    this.ch2 = false;
    this.ch3 = false;

    if(this.password.length >= 6){
      this.ch1 = true;
    }
    if(this.password.search(/[0-9]/) != -1){
      this.ch2 = true;
    }

    if(this.password.search(/[^A-Za-z0-9]/) != -1){
      this.ch3 = true;
    }
  }

}
