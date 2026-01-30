import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInput } from '../../components/text-input/text-input';
import { SelectInput } from '../../components/select-input/select-input';
import { RadioButton } from '../../components/radio-button/radio-button';
import { ButtonComponent } from '../../components/button-component/button-component';
// import { PropertyInput } from '../../components/property-input/property-input';

@Component({
  selector: 'app-product-form-component',
  imports: [ReactiveFormsModule, TextInput, SelectInput, RadioButton, ButtonComponent],
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.css',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder)
  // placeholer = ""
  productForm!: FormGroup

  categoryError= true

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(50)]],
      category: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      inStock: [true],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      properties: this.fb.array([])
    })
  }

    get propertiesArray() {
    return this.productForm.get('properties') as FormArray;
  }

    addProperty() {
    const propertyGroup = this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required]
    })

    this.propertiesArray.push(propertyGroup)
  }

}
