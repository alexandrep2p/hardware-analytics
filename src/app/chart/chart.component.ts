import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProductFromSeller } from './../models/productFromSeller';
import * as ChartJs from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @ViewChild('productChart') productChart: ElementRef;
  @Input() productData: ProductFromSeller[] = [];
  chartJs: ChartJs;
  productName: string;
  prices: number[]=[];
  dates: string[]=[];
  moment: moment.Moment;

  constructor( ) { }

  ngOnInit(): void {
    moment.locale('pt-br');
    this.productName = this.productData[0].name;
    this.productData.forEach(product =>{
      this.prices.push(product.price);
      this.dates.push(moment(product.createdAt).format('DD/MM/YYYY'));
    });    
  }

  ngAfterViewInit(){
    this.plotChart(
      this.prices, 
      this.dates, 
      this.productName);
  }

  plotChart(prices: Array<number>, dates: Array<any>, productName) {
    if (this.chartJs){
      this.destroyChart(this.chartJs);
    }
    this.chartJs = new ChartJs(this.productChart.nativeElement, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: productName,
          fill: false,
          borderColor: 'rgb(162,218,89)',
          data: prices
        }]
      }
    });
  }

  destroyChart(chartJs: ChartJs) {
    chartJs.destroy();
  }
}