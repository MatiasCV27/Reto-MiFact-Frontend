import { inject, Injectable } from "@angular/core";
import { ProductRepository } from "../domain/ports/product.repository";
import { Observable } from "rxjs";
import { PaginationResult } from "../domain/model/pagination.model";
import { Product } from "../domain/model/product.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ProductFilter } from "../domain/model/ProductFilter";

@Injectable({
  providedIn: 'root'
})
export class ProductApiAdapter implements ProductRepository {

  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:1100/api/v1/products'

  searchProducts(page: number, size: number, filters?: ProductFilter): Observable<PaginationResult<Product>> {

    let params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', size.toString());

    if (filters) {
      if (filters.code) params = params.set('code', filters.code);
      if (filters.name) params = params.set('name', filters.name);
      if (filters.description) params = params.set('description', filters.description);
      if (filters.category) params = params.set('category', filters.category);
      if (filters.enabled !== undefined && filters.enabled !== null) params = params.set('enabled', filters.enabled.toString());
    }

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
