import { inject, Injectable } from "@angular/core"
import { ProductRepository } from "../domain/ports/product.repository"
import { Observable } from "rxjs"
import { Product } from "../domain/model/product.model"

@Injectable({
  providedIn: 'root'
})
export class GetByCodeUseCase {

  private productRepository = inject(ProductRepository)

  execute(code: string): Observable<Product> {
    return this.productRepository.getProduct(code)
  }
}
