import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css',
})
export class ButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();
  @Input() buttonText!: string;
  @Input() isDisabled: boolean = false;
}
