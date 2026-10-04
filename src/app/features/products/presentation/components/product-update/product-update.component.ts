import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UpdateProductUseCase } from '../../../application/update-product.use-case';
import { GetByCodeUseCase } from '../../../application/get-by-code.use-case';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private getByCodeUseCase = inject(GetByCodeUseCase);
  private updateProductUseCase = inject(UpdateProductUseCase);

  productCode: string = '';
  isLoading: boolean = false;

  productForm: FormGroup = this.fb.group({
    code: [{ value: '', disabled: true }, [Validators.required]],
    name: ['', [Validators.required]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    category: ['']
  });

  ngOnInit(): void {
    const codeParam = this.route.snapshot.paramMap.get('code');
    console.log('Código recibido para actualizar:', this.productCode);
    if (codeParam) {
      this.productCode = codeParam;
      this.loadProductData(this.productCode);
    }
  }

  loadProductData(code: string): void {
    this.getByCodeUseCase.execute(code).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          code: product.code,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la información del producto', 'error');
        this.router.navigate(['/main']);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const productData = {
      ...this.productForm.getRawValue(),
      code: this.productCode
    };

    this.updateProductUseCase.execute(this.productCode, productData).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Producto modificado correctamente',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: 'rounded-2xl shadow-xl' }
        }).then(() => {
          this.router.navigate(['/main']);
        });
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
      }
    });
  }

}
