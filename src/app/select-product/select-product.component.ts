import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Product } from './../models/product';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit{

  dropdownSettings: IDropdownSettings;
  productId: number = 0;
  products: Product[] = [];

  constructor(
    private apiService: ApiService
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

  getProducts(storeName){
    let productObject: Product;
    this.apiService.getProductsFromSeller(storeName).subscribe((products : Product[]) => {
      products.forEach(product => {
        this.products.push(
          productObject={
            id:this.productId++,
            name:product.name
          })
      });
    });
  }

}
