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

  productPrices: Array<number> = [];
  productDates: Array<any> = [];
  sellers: string[] = [];
  products: any[] = [];
  selectedSeller = 'Vendedor';
  selectedProduct = 'Selecione um vendedor';
  actualPrice;

  @ViewChild('productChart') productChart: ElementRef;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.getSellers();
  }

  getSellers(){
    this.productService.getSellers()
    .subscribe(result => {
      result.forEach(seller => {
        this.sellers.push(seller.DISTINCT);
      });
    });
  }

  selectSeller(seller: string){
    this.selectedSeller = seller;
    this.products = [];
    this.getProductsFromSeller(seller);
  }

  getProductsFromSeller(seller: string){
    this.productService.getProductsFromSeller(seller)
    .subscribe(product => {
      this.products = product;
    });
  }

  selectProduct(product: string){
    this.selectedProduct = product;
    this.getProduct(this.selectedProduct, this.selectedSeller);
  }

  getProduct(name: string, seller: string){
    this.productPrices = [];
    this.productDates = [];
    this.productService.getProductData(name , seller)
    .subscribe( product => {
      product.forEach(item => {
        this.productPrices.push(item.price);
        this.productDates.push(moment(item.createdAt).format('DD/MM/YYYY'));
      });
      this.actualPrice = this.productPrices.slice(-1)[0];
      this.plotChart(this.productPrices, this.productDates, this.selectedProduct);
    });
  }

  plotChart(prices: Array<number>, dates: Array<any>, productName){
    const chart = new Chart(this.productChart.nativeElement, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: productName,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: prices
            }]
        }
    });
    chart.update();
  }
}
