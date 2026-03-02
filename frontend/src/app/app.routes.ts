import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { BookDetails } from './features/book-details/book-details';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'book/:id', component: BookDetails }
];
