import { inject, Injectable } from "@angular/core";
import { ProductRepository } from "../domain/ports/product.repository";
import { Observable } from "rxjs";
import { PaginationResult } from "../domain/model/pagination.model";
import { Product } from "../domain/model/product.model";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductApiAdapter implements ProductRepository {

  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:1100/api/v1/products'

  searchProducts(page: number, size: number): Observable<PaginationResult<Product>> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', size.toString());

    return this.http.get<PaginationResult<Product>>(`${this.apiUrl}/search`, { params });
  }

  getProduct(code: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${code}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(code: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${code}`, product);
  }

  deleteProduct(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${code}`);
  }
}
