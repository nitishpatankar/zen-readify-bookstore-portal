import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  type: 'success' | 'error';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {

  private _toast = signal<ToastMessage | null>(null);
  toast = this._toast.asReadonly();

  show(type: 'success' | 'error', message: string) {
    this._toast.set({ type, message });

    setTimeout(() => {
      this._toast.set(null);
    }, 3000);
  }
}