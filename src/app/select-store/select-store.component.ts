import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Store } from '../models/store';

@Component({
  selector: 'app-select-store',
  templateUrl: './select-store.component.html',
  styleUrls: ['./select-store.component.scss']
})
export class SelectStoreComponent implements OnInit {

  @Output() EventEmitterStore = new EventEmitter();

  stores: Store[];
  storeSelected: string;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getAllStores().subscribe((stores: Store[])=>{
      this.stores = stores;
    });
  }

  selectStore(e){
    this.storeSelected = e.target.value;
    this.EventEmitterStore.emit(this.storeSelected);
  }
}