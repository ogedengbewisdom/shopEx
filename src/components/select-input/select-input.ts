import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../lib/interface';

@Component({
  selector: 'app-select-input',
  imports: [ReactiveFormsModule],
  templateUrl: './select-input.html',
  styleUrl: './select-input.css',
})
export class SelectInput {
  @Input() formGroup!: FormGroup;
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() hasError: boolean = false;
  @Input() errorMessage: string = '';
  @Input() options: ICategory[] = [];
}
