import { inject, Injectable } from "@angular/core"
import { ProductRepository } from "../domain/ports/product.repository"
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class DeleteUseCase {

  private productRepository = inject(ProductRepository)

  execute(code: string): Observable<void> {
    return this.productRepository.deleteProduct(code)
  }
}
