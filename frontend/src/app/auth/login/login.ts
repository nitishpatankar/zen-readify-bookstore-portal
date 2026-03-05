import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  
  loading = false;

  form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;

    this._authService.login(this.form.value).subscribe({
      next: (res) => {
        this._authService.saveToken(res.token);

        // Role-based redirect
        if (res.role === 'ADMIN') {
          this._router.navigate(['/admin']);
        } else {
          this._router.navigate(['/']);
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
