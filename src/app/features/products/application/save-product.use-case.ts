import { inject, Injectable } from "@angular/core"
import { ProductRepository } from "../domain/ports/product.repository"
import { Observable } from "rxjs"
import { Product } from "../domain/model/product.model"

@Injectable({
  providedIn: 'root'
})
export class SaveProductUseCase {

  private productRepository = inject(ProductRepository)

  execute(product: Product): Observable<Product> {
    return this.productRepository.saveProduct(product)
  }
}
