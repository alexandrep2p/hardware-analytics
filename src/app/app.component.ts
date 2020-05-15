import { ProductService } from './services/product.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('productChart') productChart: ElementRef;

  productPrices: Array<number> = [];
  productDates: Array<any> = [];
  sellers: string[] = [];
  products: any[] = [];
  selectedSeller = 'Vendedor';
  selectedProduct = 'Selecione um produto';
  maxPrice;
  minPrice;
  actualPrice;
  chart: Chart;
  deviation: number;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.getSellers();
  }

  getSellers() {
    this.productService.getSellers()
      .subscribe(result => {
        result.forEach(seller => {
          this.sellers.push(seller.DISTINCT);
        });
      });
  }

  selectSeller(seller: string) {
    this.selectedSeller = seller;
    this.products = [];
    this.getProductsFromSeller(seller);
  }

  getProductsFromSeller(seller: string) {
    this.productService.getProductsFromSeller(seller)
      .subscribe(product => {
        this.products = product;
      });
  }

  selectProduct(product: string) {
    this.selectedProduct = product;
    this.productPrices = [];
    this.productDates = [];
    this.getProduct(this.selectedProduct, this.selectedSeller);
  }

  getProduct(name: string, seller: string) {
    this.productService.getProductData(name, seller)
      .subscribe(product => {
        product.forEach(item => {
          this.productPrices.push(item.price);
          this.productDates.push(moment(item.createdAt).format('DD/MM/YYYY'));
        });
        this.actualPrice = this.productPrices.slice(-1)[0];
        this.minPrice = Math.min.apply(Math, this.productPrices);
        this.maxPrice = Math.max.apply(Math, this.productPrices);
        const average = this.productPrices.reduce((total, value) =>
          total + value / this.productPrices.length, 0);
        const variance = this.productPrices.reduce((total, value) =>
          total + Math.pow(average - value, 2) / this.productPrices.length, 0);
        this.deviation = Math.sqrt(variance);

        this.plotChart(this.productPrices, this.productDates, this.selectedProduct);
      });
  }

  plotChart(prices: Array<number>, dates: Array<any>, productName) {
    if (this.chart){
      this.destroyChart(this.chart);
    }
    this.chart = new Chart(this.productChart.nativeElement, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: productName,
          fill: false,
          borderColor: 'rgb(242,112,19)',
          data: prices
        }]
      }
    });
  }

  destroyChart(chart: Chart) {
    chart.destroy();
  }
}
