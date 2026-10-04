import { SearchProductsUseCase } from './../../../application/search-products.use-case';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../domain/model/product.model';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';
import { DeleteUseCase } from '../../../application/delete.use-case';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailModalComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  private SearchProductsUseCase = inject(SearchProductsUseCase)
  private deleteUseCase = inject(DeleteUseCase);

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

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
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
        this.deleteUseCase.execute(code).subscribe({
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
