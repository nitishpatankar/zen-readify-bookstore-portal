import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toast = inject(ToastService);

  return next(req).pipe(
    catchError(err => {

      toast.show('error', err.error?.message || 'Something went wrong');

      return throwError(() => err);
    })
  );
};