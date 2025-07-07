import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'auth/login', 
        pathMatch: 'full' 
    },
    {
        path: 'auth/login',
        loadComponent: () =>
            import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./features/dashboard/layout/dashboard-layout.component')
            .then(m => m.DashboardLayoutComponent)
    }
];
