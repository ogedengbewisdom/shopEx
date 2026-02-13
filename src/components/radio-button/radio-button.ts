import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  imports: [ReactiveFormsModule],
  templateUrl: './radio-button.html',
  styleUrl: './radio-button.css',
})
export class RadioButton {
  @Input() formGroup!: FormGroup;
  @Input() name: string = "";
  @Input() label: string = "";
}
