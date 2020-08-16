import { Component, OnInit, Input } from '@angular/core';
import { ProductFromSeller } from './../models/productFromSeller';
import * as moment from 'moment';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {

  @Input() productData: ProductFromSeller[] = [];
  minPrice: number;
  maxPrice: number;
  lastPrice: number;
  lastDate: moment.Moment;
  lastDateText: string;

  constructor() {
  }

  ngOnInit(): void {
    let productPrices: any[] = [];
    let productDates: any[] = [];
    
    this.productData.forEach(product => {
      productPrices.push(product.price);
      productDates.push(product.createdAt);
    });

    this.minPrice = Math.min.apply(Math, productPrices);
    this.maxPrice = Math.max.apply(Math, productPrices);
    this.lastPrice = productPrices.slice(-1)[0];
    this.lastDate = productDates.slice(-1)[0];
    moment.locale('pt-br');
    this.lastDateText = moment(this.lastDate).format('LLLL');
  }
}