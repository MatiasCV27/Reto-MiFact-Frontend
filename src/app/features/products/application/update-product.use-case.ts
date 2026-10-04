import { inject, Injectable } from "@angular/core"
import { ProductRepository } from "../domain/ports/product.repository"
import { Product } from "../domain/model/product.model"
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class UpdateProductUseCase {

  private productRepository = inject(ProductRepository)

  execute(code: string, product: Product): Observable<Product> {
    return this.productRepository.updateProduct(code, product)
  }
}
