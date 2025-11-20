import { Component, OnInit } from '@angular/core';
import { FoodserviceService } from '../foodservice.service';

@Component({
  selector: 'app-pasta',
  templateUrl: './pasta.page.html',
  styleUrls: ['./pasta.page.scss'],
})
export class PastaPage implements OnInit {
  jenistampilan = "accordion";
  chunkSize = 2;
  searchText = '';
  allPastas: any[] = [];  // Store all pastas
  pastas: any[] = [];     // Filtered pastas to display

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

  filterPastas() {
    if (!this.searchText) {
      this.pastas = this.allPastas;  // Show all if search is empty
    } else {
      this.pastas = this.allPastas.filter(pasta =>
        pasta.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  constructor(private foodService: FoodserviceService) { }
  ionViewWillEnter() {
    this.foodService.pastaList().subscribe((data) => {
      this.pastas = data;
    })
  }

  ngOnInit() {
    this.loadPastas();
  }

  loadPastas() {
    this.foodService.pastaList().subscribe(
      (data) => {
        this.allPastas = data;  // Store all pastas
        this.filterPastas();    // Apply any existing filter
      },
      (error) => {
        console.error('Error loading pastas:', error);
      }
    );
  }

}
