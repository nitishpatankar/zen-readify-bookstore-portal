import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private _authService = inject(AuthService);
    private _router = inject(Router);

  canActivate() {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
