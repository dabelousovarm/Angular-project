import { ProductsService } from './../../services/products.service';
import { IProducts } from './../../models/products';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private ProductsService: ProductsService, public dialog: MatDialog) { }
  products: IProducts[];
  productsSubcription: Subscription;

  basket: IProducts[];
  basketSubcription: Subscription;

  ngOnInit(): void {

    this.productsSubcription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.basketSubcription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
  }

  addToBasket(product: IProducts) {
    product.quantity = 1;
    const findItem = this.basket.find((item) => item.id === product.id);

    if (!findItem) this.postToBasket(product);
    else this.updateToBasket(findItem);
  }

  postToBasket(product: IProducts) {
    this.ProductsService.postProductToBasket(product).subscribe((data) =>
      this.basket.push(data)
    );
  }

  updateToBasket(product: IProducts) {
    product.quantity += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => { });
  }

  ngOnDestroy() {
    if (this.productsSubcription) this.productsSubcription.unsubscribe();
    if (this.basketSubcription) this.basketSubcription.unsubscribe();
  }
}
