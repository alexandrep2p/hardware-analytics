import { ProductService } from './services/product.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as moment from 'moment';
import * as Chart from 'chart.js';
import { identifierModuleUrl } from '@angular/compiler';

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
  produtos: any[] = [];
  selectedSeller = 'Vendedor';
  selectedProduct: any;
  maxPrice;
  minPrice;
  actualPrice;
  dropdownSettings: IDropdownSettings;
  chart: Chart;
  deviation: number;
  
  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.getSellers();

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      itemsShowLimit: 5,
      closeDropDownOnSelection:true
    }    
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
    let productId: number = 0;
    let productObject: any;
    this.productService.getProductsFromSeller(seller)
      .subscribe(productList => {
        productList.forEach(product => {
          this.products.push(
            productObject = {
            id: productId++,
            name: product.name
          });
        });
      });
  }

  selectProduct() {
    this.productPrices = [];
    this.productDates = [];
    this.getProduct(this.selectedProduct[0].name, this.selectedSeller);
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

        this.plotChart(this.productPrices, this.productDates, this.selectedProduct[0].name);
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
