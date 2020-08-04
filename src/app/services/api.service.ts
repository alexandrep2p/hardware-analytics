import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, ObservableLike } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Store } from '../models/store';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllStores(): Observable<Store[]>{
    return this.httpClient.get<Store[]>(this.baseUrl+'sellers')
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  getProductsFromSeller(storeName: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.baseUrl+'products/seller/'+storeName)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
