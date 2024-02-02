import { Subscription } from 'rxjs';
import { IProducts } from '../../models/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  product: IProducts;
  productSubscribtion: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* Я уже писал про это, но немного дополню
    * Если у тебя переменная которую ты задаешь внутри subscribe используется только в шаблоне, то можно обойтись без подписки при помощи AsyncPipe
    * Если же переменная используется в других местах внутри компонента, то тогда, ВОЗМОЖНО, стоит использовать подписку
    * тут ты можешь обойтись без подписки, так как переменная используется только в шаблоне (тут тебе пригодится map внутри pipe)
    * */
    this.productSubscribtion = this.route.data.subscribe((data) => {
      this.product = data['data'];
    });
  }

}
