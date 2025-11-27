import { Component, OnInit } from '@angular/core';
import { FoodserviceService } from '../foodservice.service';
import { Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-newpasta',
  templateUrl: './newpasta.page.html',
  styleUrls: ['./newpasta.page.scss'],
})
export class NewpastaPage implements OnInit {
  new_name = '';
  new_desc = '';
  new_url = '';
  new_price = 0;
  new_spicy = false;
  arr_price: number[] = [];
  base64: any
  imageType: string = 'URL'

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 50,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    const base64Image = 'data:image/png;base64,' + image.base64String;
    this.base64 = base64Image;
  }

  public alertButtons = [
    {
      text: 'OK',
      handler: () => {
        this.router.navigate(['/pasta']);
      }
    }
  ];

  constructor(
    private foodservice: FoodserviceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.arr_price = this.generateNumberOptions(30000, 50000, 2000);
  }

  generateNumberOptions(start: number, end: number, step: number): number[] {
    const options: number[] = [];
    for (let i = start; i <= end; i += step) {
      options.push(i);
    }
    return options;
  }

  // submitpasta() {
  //   this.foodservice.addPasta(
  //     this.new_name,
  //     this.new_url,
  //     this.new_desc,
  //     this.new_price,
  //     this.new_spicy

  //   );
  // }
  submitpasta() {
    this.foodservice.addPasta(
      this.new_name,
      this.new_url,
      this.new_desc,
      this.new_price,
      this.new_spicy
    ).subscribe((response: any) => {
      alert(response.result);
      if (response.result === 'success') {
        this.router.navigate(['/pasta']);
      }
    });
  }
}
