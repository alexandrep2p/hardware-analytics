import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient
  ) { }

  getProductData(name: string, seller: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.baseUrl + '/product/productfromseller/' + name + '/' + seller)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  getProductsFromSeller(seller: string): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl + '/products/seller/' + seller)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  getSellers(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl + '/sellers')
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
