import { Component } from '@angular/core';
import{Shop}from '../../shared/models/shop'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
shop:Shop;
  constructor() {
    this.shop=new Shop("Ben-Zakay","Bnei-Brak",45);
   }

}
