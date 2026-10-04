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

  products: Product[] = []
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(): void {

    this.SearchProductsUseCase.execute(0, 10).subscribe({
      next: (r) => {
        this.products = r.content;
        this.isLoading = false;
      },
      error: (e) => {
        console.error('Error al cargar los productos:', e);
        this.isLoading = false;
      }
    })

  }
}
