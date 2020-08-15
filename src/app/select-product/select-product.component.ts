import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Product } from './../models/product';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit{
  
  @Input() dataList: Product[] = [];
  @Output() EventEmitterSelectedProduct = new EventEmitter();

  dropdownSettings: IDropdownSettings;
  
  constructor(
  ) { }

  ngOnInit(){
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      itemsShowLimit: 5,
      closeDropDownOnSelection: true
    }
  }

  selectedProduct(product){
    this.EventEmitterSelectedProduct.emit(product.name);
  }
}
