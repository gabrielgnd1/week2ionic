import { Component, OnInit } from '@angular/core';
import { FoodserviceService } from '../foodservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editpasta',
  templateUrl: './editpasta.page.html',
  styleUrls: ['./editpasta.page.scss'],
})
export class EditpastaPage implements OnInit {

  constructor(private route: ActivatedRoute, private foodservice: FoodserviceService, private router: Router) { }
  id: number = 0
  e_name = ""
  e_desc = ""
  e_price = 0
  e_url = ""

  updatepasta() {
    this.foodservice.updatePasta(
      this.id, this.e_name, this.e_url, this.e_desc, this.e_price).subscribe(
        (response: any) => {
          if (response.result === 'success') {
            alert("success")
            this.router.navigate(['/pasta'])
          }
          else {
            alert(response.message)
          }
        });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.foodservice.pastaDetail(params['id']).subscribe(
        (data) => {
          this.e_name = data.name;
          this.e_desc = data.description;
          this.e_price = data.price;
          this.e_url = data.url;
        }
      );
    });
  }


}
