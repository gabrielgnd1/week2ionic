import { Component, OnInit } from '@angular/core';
import { DexieService, MyItem } from '../dexie.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: MyItem[] = [];

  constructor(private dex: DexieService) { }

  async loadItems() {
    try {
      this.items = await this.dex.getAllItems();
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  ngOnInit() {
    this.loadItems()
  }

  getGrandTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.num), 0);
  }

  increaseNum(id: number) {
    this.dex.increaseNum(id).then(() => {
      this.loadItems()
    })
      .catch(error => {
        alert('Error :' + error);
      });
  }

  decreaseNum(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      if (item.num > 1) {
        item.num -= 1;
        this.dex.myStore.update(id, { num: item.num }).then(() => {
          this.loadItems();
        })
          .catch(error => {
            alert('Error :' + error);
          });
      } else {
        this.dex.removeItem(id).then(() => {
          this.loadItems();
        })
          .catch(error => {
            alert('Error :' + error);
          });
      }
    }
  } 



}
