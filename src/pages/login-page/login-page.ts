import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInput } from '../../components/text-input/text-input';
import { ButtonComponent } from '../../components/button-component/button-component';
import { AuthService } from '../../services/auth-service';
import { PasswordInput } from '../../components/password-input/password-input';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, TextInput, ButtonComponent, PasswordInput],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef$ = inject(DestroyRef);
  loginForm!: FormGroup;
  private authService = inject(AuthService);

  redirectUrl: string = '/products';

  ngOnInit(): void {
    this.buildForm();
    this.route.queryParams
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef$))
      .subscribe((params) => {
        this.redirectUrl = params['redirectUrl'] || '/products';
      });
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginHandler() {
    console.log('redirectUrl', this.redirectUrl);
    if (!this.loginForm.valid) {
      return;
    }

    const loginData = this.loginForm.value;

    // console.log(loginData.email);
    this.authService.login(loginData.email);
    this.router.navigateByUrl(this.redirectUrl);
  }

  get controls() {
    return this.loginForm.controls;
  }

  hasError(formInputName: string): boolean {
    return this.controls[formInputName]?.touched && this.controls[formInputName]?.invalid;
  }

  formatFieldName(fieldName: string): string {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  errorMessage(formInputName: string): string {
    const control = this.controls[formInputName];

    if (!control || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return `${this.formatFieldName(formInputName)} is required`;
    }

    if (control.errors['minlength']) {
      const minLength = control.errors['minlength'].requiredLength;
      return `${this.formatFieldName(formInputName)} must be at least ${minLength} characters`;
    }

    if (control.errors['email']) {
      return 'Invalid email address';
    }

    return 'Invalid field';
  }
}
