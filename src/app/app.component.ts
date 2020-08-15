import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Product } from './models/product';
import { ProductFromSeller } from './models/productFromSeller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hardware Analytics';
  subtitle = 'histórico de preços para componentes de PC';
  isProductsListReceived: boolean = false;
  productId: number = 0;
  products: Product[] = [];
  productData: ProductFromSeller[] = [];
  selectedStore: string;

  constructor(
    private apiService: ApiService
    ){ }

  receiveStore(store){
    this.getProducts(store);
    this.isProductsListReceived = true;
  }

  getProducts(storeName){
    this.selectedStore = storeName;
    this.products = [];
    let productObject: Product;
    this.apiService.getProductsFromSeller(storeName).subscribe((products : Product[]) => {
      products.forEach(product => {
        this.products.push(
          productObject={
            id:this.productId++,
            name:product.name
          });
      });
    });
  }

  receivedProduct(productName){
    this.productData = [];
    this.apiService.getProductDataFromSeller(this.selectedStore, productName).subscribe((productData : ProductFromSeller[]) =>{
      this.productData = productData;
    });
  }
}
