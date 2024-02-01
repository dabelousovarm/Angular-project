import { productResolver } from './services/product.resolver';
import { BasketComponent } from './components/basket/basket.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductsComponent } from './components/products/products.component';
import { BaseComponent } from './components/base/base.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductInfoComponent, resolve: { data: productResolver } },
  { path: 'basket', component: BasketComponent },

  { path: "**", redirectTo: "", component: BaseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
