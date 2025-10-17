import { Component, OnInit } from '@angular/core';
import { FoodserviceService } from '../foodservice.service';

@Component({
  selector: 'app-pasta',
  templateUrl: './pasta.page.html',
  styleUrls: ['./pasta.page.scss'],
})
export class PastaPage implements OnInit {

  
  jenistampilan = "accordion"
  chunkSize = 2;

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  getRealIndex(chunkIndex: number, itemIndex: number): number {
    return chunkIndex * this.chunkSize + itemIndex;
  }

  pastas:any[] = [];

  constructor(private foodService: FoodserviceService) {}

  ionViewWillEnter() {
    this.pastas = this.foodService.pastas ?? [];
  }

  ngOnInit() {
    this.pastas = this.foodService.pastas ?? [];
  }

}
