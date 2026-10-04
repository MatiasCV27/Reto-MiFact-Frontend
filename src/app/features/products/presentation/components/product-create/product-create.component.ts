import { Component, inject } from '@angular/core';
import { SaveProductUseCase } from '../../../application/save-product.use-case';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  private saveProductUseCase = inject(SaveProductUseCase);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  productForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(3)]],
    name: ['', [Validators.required]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    category: ['']
  });

  isLoading: boolean = false;

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const productData = this.productForm.value;

    this.saveProductUseCase.execute(productData).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          title: '¡Éxito!',
          text: 'Producto creado correctamente',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: 'rounded-2xl shadow-xl' }
        }).then(() => {
          this.router.navigate(['/main']);
        });
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire('Error', 'No se pudo crear el producto', 'error');
      }
    });
  }
}
