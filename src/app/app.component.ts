import { Product } from './models/product';
import { ProductService } from './services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  productPrices: Array<number> = [];
  productDates: Array<any> = [];
  sellers: string[] = [];
  selectedSeller: string = 'Vendedor';
  selectedProduct: string = 'Selecione um vendedor';

  public lineChartData: ChartDataSets[] = [
    { data: this.productPrices, yAxisID: 'y-axis-1' }
  ];

  public lineChartLabels: Label[] = this.productDates;

  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-1',
          position: 'right',
        }
      ]
    }
  };
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    //this.getProductFromSeller();
    this.getSellers();
  }

  selectSeller(seller: string){
    this.selectedSeller = seller;
    this.getProductsFromSeller(seller);
  }

  selectProduct(product: string){
    this.selectedProduct = product;
  }

  getProduct(name: string, seller: string){
    this.productService.getProduct(name , seller)
    .subscribe( product => {
      product.forEach(item => {
        this.productPrices.push(item.price);
        this.productDates.push(item.createdAt);
      });
    });
  }

  getSellers(){
    this.productService.getSellers()
    .subscribe(result => {
      result.forEach(seller => {
        this.sellers.push(seller.DISTINCT);
      });
    });
  }

  getProductsFromSeller(seller: string){
    this.productService.getProductsFromSeller(seller)
    .subscribe(product => {
      console.log(product);
    });
  }

}
