import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main/update/:code',
    loadComponent: () => import('./features/products/presentation/components/product-update/product-update.component').then(m => m.ProductUpdateComponent)
  },
  {
    path: 'main/save',
    loadComponent: () => import('./features/products/presentation/components/product-create/product-create.component').then(m => m.ProductCreateComponent)
  },
  {
    path: 'main',
    loadComponent: () => import('./features/products/presentation/components/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];
