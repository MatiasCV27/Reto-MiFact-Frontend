import { SearchProductsUseCase } from './../../../application/search-products.use-case';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../domain/model/product.model';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';
import { DeleteProductUseCase } from '../../../application/delete-product.use-case';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailModalComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  private searchProductsUseCase = inject(SearchProductsUseCase)
  private deleteProductUseCase = inject(DeleteProductUseCase);

  private router = inject(Router);

  products: Product[] = [];
  isLoading: boolean = false;

  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  selectedProduct: Product | null = null;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(): void {
    this.isLoading = true;
    this.searchProductsUseCase.execute(this.currentPage, this.pageSize).subscribe({
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

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  onEdit(code: string): void {
    console.log(code)
    this.router.navigate(['/main/update/', code]);
  }

  onSearch(event: any): void {
    const rawInput = event.target.value.trim();
    const page = 0;
    const size = 10;

   let filters: any = {};

    if (rawInput) {
      if (rawInput.includes(':')) {
        const regex = /(\w+)\s*:\s*([^\s]+)/g;
        let match;
        let foundMatches = false;

        while ((match = regex.exec(rawInput)) !== null) {
          foundMatches = true;
          const key = match[1].toLowerCase();
          const value = match[2];

          switch (key) {
            case 'code':
              filters.code = value;
              break;
            case 'name':
              filters.name = value;
              break;
            case 'description':
              filters.description = value;
              break;
            case 'category':
              filters.category = value;
              break;
            case 'enabled':
              filters.enabled = value.toLowerCase() === 'true';
              break;
          }
        }

        if (!foundMatches) {
          filters.code = rawInput;
        }
      } else {
        filters.code = rawInput;
      }
    }

    const finalFilters = Object.keys(filters).length > 0 ? filters : undefined;

    this.searchProductsUseCase.execute(page, size, finalFilters).subscribe({
      next: (response) => {
        this.products = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al buscar productos:', err);
      }
    });
  }

  onDeleteProduct(code: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el producto con código: ${code}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'rounded-2xl shadow-xl border border-gray-100 bg-white p-6',
        title: 'text-xl font-bold text-gray-800',
        htmlContainer: 'text-gray-600'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProductUseCase.execute(code).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El producto ha sido borrado exitosamente.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
              customClass: { popup: 'rounded-2xl shadow-xl' }
            });
            this.loadProducts();
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el producto. Inténtalo de nuevo.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'bg-indigo-600 text-white font-medium px-4 py-2.5 rounded-xl'
              },
              buttonsStyling: false
            });
            console.error('Error al eliminar:', err);
          }
        });
      } else {
        console.log('Eliminación cancelada por el usuario');
      }
    });
  }
}
