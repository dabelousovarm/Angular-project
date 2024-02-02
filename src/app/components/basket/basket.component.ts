import { ProductsService } from './../../services/products.service';
import { Subscription } from 'rxjs';
import { IProducts } from './../../models/products';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  // Обычно, принято (не только в Angular, но и вообще в ООП) называть классы с большой буквы, например ProductService,
  // а экземпляры классов с маленькой, например productsService ( то есть в данном случае будет     constructor(private productsService: ProductsService) { })
  constructor(private ProductsService: ProductsService) { }

  basket: IProducts[];
  basketSubscription: Subscription;

  ngOnInit(): void {
      // То что ты сделала - хорошо, но есть способ сделать лучше - обойтись без подписки. Вместо этого можно использовать AsyncPipe ( | async)
      // Советую почитать
    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
  }

  // Не забывай имплементировать интерфейс OnDestroy
  ngOnDestroy() {
      // вот это правильно, но проверка не обязательно, вместо этого ты можешь задать для basketSubscription значение по умолчанию
      // например   basketSubscription: Subscription = Subscription.EMPTY; Это rxjs константа, которая возвращает пустую подписку
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  minusItemFromBasket(item: IProducts) {
    if (item.quantity === 1) {
      this.ProductsService.deleteProductFromBasket(item.id).subscribe(() => {
        let idx = this.basket.findIndex((data) => data.id === item.id);
        this.basket.splice(idx, 1);
      });
    } else {
      item.quantity -= 1;
      this.ProductsService.updateProductToBasket(item).subscribe((data) => {
      });
    }
  }

  plusItemFromBasket(item: IProducts) {
    item.quantity += 1;
    /*
    1. Корзина это чисто клиентская часть, поэтому не стоит делать запрос на сервер для сохранения изменений в корзине.
    Вместо этого можно сохранять корзину в localStorage, например
    2. Если ты подписываешься только для того чтобы сделать запрос (что правильно), то в принципе можно оставлять subscribe пустым (subscribe())*/
    this.ProductsService.updateProductToBasket(item).subscribe((data) => {
    });
  }
}
