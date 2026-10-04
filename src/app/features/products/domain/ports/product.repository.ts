import { Observable } from "rxjs";
import { PaginationResult } from "../model/pagination.model";
import { Product } from "../model/product.model";

export abstract class ProductRepository {

  abstract searchProducts(page: number, size: number): Observable<PaginationResult<Product>>
  abstract getProduct(code: string): Observable<Product>;
  abstract saveProduct(product: Product): Observable<Product>;
  abstract updateProduct(code: string, product: Product): Observable<Product>;
  abstract deleteProduct(code: string): Observable<void>;
}
