import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodserviceService } from '../foodservice.service';

@Component({
  selector: 'app-pastadetail',
  templateUrl: './pastadetail.page.html',
  styleUrls: ['./pastadetail.page.scss'],
})
export class PastadetailPage implements OnInit {
  index: number = 0;
  pasta: any;
  newStep: number = 0;
  newInstruction: string = '';

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodserviceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       //this.index = params['index'];
       this.index = params['index'];
       this.foodService.pastaDetail(this.index).subscribe(
        (data) => {
          this.pasta = data;
        },
        (error) => {
          console.error('Error loading pasta detail:', error);
        }
      );
   });
}

  submitInstruction() {
    this.foodService.addInstruction(this.index, this.newStep, this.newInstruction).subscribe((resp: any) => {
      this.newStep = 0;
      this.newInstruction = '';
      this.foodService.pastaDetail(this.index).subscribe((data: any) => {
        this.pasta = data;
      });
    });
  }

deletepasta(id:any) {
   this.foodService.deletePasta(id).subscribe((response: any) => {
      if(response.result==='success'){
        alert("success")
        this.router.navigate(['/pasta']) 
      }
      else {
        alert(response.message)
      }
  });
}

}
