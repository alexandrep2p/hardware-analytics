import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Seller } from '../models/seller';

@Component({
  selector: 'app-select-store',
  templateUrl: './select-store.component.html',
  styleUrls: ['./select-store.component.scss']
})
export class SelectStoreComponent implements OnInit {

  sellers: Seller[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getAllSellers().subscribe((sellers: Seller[])=>{
      this.sellers = sellers;
    });
  }

}
