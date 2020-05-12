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
  testUrl = 'http://localhost:3000/product/productfromseller/CMK8GX4M1A2666C16/Pichau';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProducts(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl + '/products')
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  getProductFromSeller(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.testUrl)
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
