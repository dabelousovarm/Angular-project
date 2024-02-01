import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from './../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IProducts[]>('http://localhost:3000/products');
  }

  getProduct(id: number) {
    return this.http.get<IProducts>(`http://localhost:3000/products/${id}`);
  }

  postProductToBasket(product: IProducts) {
    return this.http.post<IProducts>('http://localhost:3000/basket', product);
  }

  getProductFromBasket() {
    return this.http.get<IProducts[]>('http://localhost:3000/basket');
  }

  updateProductToBasket(product: IProducts) {
    return this.http.put<IProducts>(`http://localhost:3000/basket/${product.id}`, product);
  }

  deleteProductFromBasket(id: number) {
    return this.http.delete<any>(`http://localhost:3000/basket/${id}`);
  }
}
