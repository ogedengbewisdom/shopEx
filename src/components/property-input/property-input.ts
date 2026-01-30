import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-input',
  imports: [ReactiveFormsModule],
  templateUrl: './property-input.html',
  styleUrl: './property-input.css',
})
export class PropertyInput {
  @Input() propertyGroup!: FormGroup; 
}
