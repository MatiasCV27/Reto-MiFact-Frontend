import { SearchProductsUseCase } from './../../../application/search-products.use-case';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../domain/model/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  private SearchProductsUseCase = inject(SearchProductsUseCase)

  products: Product[] = [];
  isLoading: boolean = false;

  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  ngOnInit(): void {
    this.loadProducts()
  }

loadProducts(): void {
    this.isLoading = true;
    this.SearchProductsUseCase.execute(this.currentPage, this.pageSize).subscribe({
      next: (result) => {
        this.products = result.content;
        this.totalElements = result.totalElements;
        this.totalPages = result.totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los productos:', err);
        this.isLoading = false;
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }
}
