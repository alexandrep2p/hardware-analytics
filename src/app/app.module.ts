import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SelectStoreComponent } from './select-store/select-store.component';
import { SelectProductComponent } from './select-product/select-product.component';
import { ChartComponent } from './chart/chart.component';
import { InfosComponent } from './infos/infos.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectStoreComponent,
    SelectProductComponent,
    ChartComponent,
    InfosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
