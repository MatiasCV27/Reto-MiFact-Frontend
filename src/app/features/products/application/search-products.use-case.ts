import { inject, Injectable } from "@angular/core";
import { ProductRepository } from "../domain/ports/product.repository";
import { Observable } from "rxjs";
import { PaginationResult } from "../domain/model/pagination.model";
import { Product } from "../domain/model/product.model";
import { ProductFilter } from "../domain/model/ProductFilter";

@Injectable({
  providedIn: 'root'
})
export class SearchProductsUseCase {

  private productRepository = inject(ProductRepository)

  execute(page: number, size: number, filters?: ProductFilter): Observable<PaginationResult<Product>> {
    return this.productRepository.searchProducts(page, size, filters)
  }
}
