import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodserviceService } from '../foodservice.service';

@Component({
  selector: 'app-pastadetail',
  templateUrl: './pastadetail.page.html',
  styleUrls: ['./pastadetail.page.scss'],
})
export class PastadetailPage implements OnInit {
  index: number = 0;
  pasta: any;

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodserviceService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.index = +id;
        if (this.foodService.pastas && this.foodService.pastas.length > this.index) {
          this.pasta = this.foodService.pastas[this.index];
        }
      }
    });
  }
}
