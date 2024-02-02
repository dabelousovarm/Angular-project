import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from './../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    /*
    * В принципе, всё правильно, но можно немного улучшить
    * Вынести всю логику работы с запросами в отдельный сервис RestService, например
    * В нем у тебя будут методы типа get(endpoint: string, body: T). Таким образом, вся логика по взаимодействию с HttpClient
    * будет отдельно, так сказать, у тебя появится новый слой абстракции, который будет отвечать за работу с сервером, а сервисы ничего не будут знать
    * о том, как именно происходит взаимодействие с сервером. Так же туда можно вынести http://localhost:3000 в константу, чтобы не дублировать
    * в каждом методе. И если у тебя поменяется хост сервера, то ты сможешь это сделать в одном месте, а не в каждом методе
    * */
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
