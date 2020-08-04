import { Component, ViewChild } from '@angular/core';
import { SelectProductComponent } from './select-product/select-product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hardware Analytics';
  subtitle = 'histórico de preços para componentes de PC';
  selectedStore: string;

  @ViewChild(SelectProductComponent) selectProduct: SelectProductComponent;

  receiveStore(store){
    this.selectProduct.getProducts(store);
  }
}
