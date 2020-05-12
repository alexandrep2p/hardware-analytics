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
    this.getProductFromSeller();
  }

  getProductFromSeller(){
    this.productService.getProductFromSeller()
    .subscribe( product => {
      product.forEach(item => {
        this.productPrices.push(item.price);
        this.productDates.push(item.createdAt);
      });
      console.log(this.productPrices);
      console.log(this.productDates);
    });

  }

}
