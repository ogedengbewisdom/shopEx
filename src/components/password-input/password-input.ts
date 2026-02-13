import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

type TInput = 'text' | 'password';

@Component({
  selector: 'app-password-input',
  imports: [ReactiveFormsModule],
  templateUrl: './password-input.html',
  styleUrl: './password-input.css',
})
export class PasswordInput {
  @Input() formGroup!: FormGroup;
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() errorMessage?: string = '';
  @Input() hasError?: boolean = false;
  @Input() inputType: TInput = 'password';
  @Input() isPasswordVisible: boolean = false;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputType = this.isPasswordVisible ? 'text' : 'password';
  }
}
