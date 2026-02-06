import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInput } from '../../components/text-input/text-input';
import { SelectInput } from '../../components/select-input/select-input';
import { RadioButton } from '../../components/radio-button/radio-button';
import { ButtonComponent } from '../../components/button-component/button-component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product-service';
import { Router } from '@angular/router';
import { TextArea } from '../../components/text-area/text-area';
import { StateService } from '../../services/state-service';
import { CustomError, IProduct } from '../../lib/interface';
// import { PropertyInput } from '../../components/property-input/property-input';

@Component({
  selector: 'app-product-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextArea,
    TextInput,
    SelectInput,
    RadioButton,
    ButtonComponent,
  ],
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.css',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private productServices = inject(ProductService);
  productForm!: FormGroup;
  destroyRef$ = inject(DestroyRef);
  private stateService = inject(StateService);
  state$ = this.stateService.state$;
  private cdr = inject(ChangeDetectorRef);

  // constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.stateService.resetSuccessAndError();
    this.buildForm();
    // this.listenToChanges()
  }

  isInValid!: boolean;

  buildForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(50)]],
      category: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      inStock: [true],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      properties: this.fb.array([]),
    });
  }

  get propertiesArray() {
    return this.productForm.get('properties') as FormArray;
  }

  addProperty() {
    const propertyGroup = this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required],
    });

    this.propertiesArray.push(propertyGroup);
  }

  removeProperty(id: number) {
    this.propertiesArray.removeAt(id);
  }

  // listenToChanges () {
  //   this.productForm.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef$)).subscribe((data) => {
  //     // this.isInValid
  //     console.log(data)
  //   })
  // }

  get controls() {
    return this.productForm.controls;
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

    if (control.errors['min']) {
      const minValue = control.errors['min'].min;
      return `${this.formatFieldName(formInputName)} must be at least ${minValue}`;
    }

    if (control.errors['max']) {
      const maxValue = control.errors['max'].max;
      return `${this.formatFieldName(formInputName)} cannot exceed ${maxValue}`;
    }

    if (control.errors['pattern']) {
      return `${this.formatFieldName(formInputName)} format is invalid`;
    }

    return 'Invalid field';
  }

  hasArrayError(fieldName: string, index: number): boolean {
    const control = this.propertiesArray.at(index)?.get(fieldName);
    return !!(control && control.touched && control.invalid);
  }

  getArrayErrorMessage(fieldName: string, index: number): string {
    const control = this.propertiesArray.at(index)?.get(fieldName);

    if (!control || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return `${this.formatFieldName(fieldName)} is required`;
    }

    if (control.errors['minlength']) {
      const minLength = control.errors['minlength'].requiredLength;
      return `${this.formatFieldName(fieldName)} must be at least ${minLength} characters`;
    }

    if (control.errors['pattern']) {
      return `${this.formatFieldName(fieldName)} format is invalid`;
    }

    return 'Invalid field';
  }

  submitFormHandler() {
    if (!this.productForm.valid) {
      this.stateService.setError('Please fill all required fields', 400);
      return;
    }

    this.stateService.setLoading(true);
    this.stateService.setError(null, null);
    this.stateService.setSuccess(null, null);
    const productData = this.productForm.value;
    this.productServices.createProduct(productData).subscribe({
      next: (value) => {
        this.stateService.setSuccess('Product created successfully!', 201);
        this.stateService.setLoading(false);
        this.stateService.setProduct(value as IProduct);

        // console.log('Created product:', value);

        this.productForm.reset({ inStock: true, rating: 0 });

        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 3000);
      },
      error: (error: CustomError) => {
        this.stateService.setLoading(false);
        this.stateService.setError(error.message || 'Error creating product', error.statusCode);
      },
      complete: () => {},
    });
  }
}
