import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { BookDetails } from './features/book-details/book-details';
import { Login } from './auth/login/login';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
{ path: '', component: Home },
// { path: 'book/:id', component: BookDetails }

    { path: 'login', component: Login },
    { path: 'register', 
        loadComponent: () => import('../app/auth/register/register')
            .then(m => m.Register)
    },
    { path: 'user',
        loadComponent: () => import('../app//dashboard/user-dashboard/user-dashboard')
            .then(m => m.UserDashboard),
        canActivate: [ AuthGuard ]
    },
    // { path: 'admin', 
    //     loadComponent: () => import('./dashboard/admin-dashboard/admin-dashboard')
    //         .then(m => m.AdminDashboard),
    //     canActivate: [ AuthGuard ]
    // },
    { path: 'admin', 
        loadComponent: () => import('../app/features/home/home')
            .then(m => m.Home),
        canActivate: [ AuthGuard ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
