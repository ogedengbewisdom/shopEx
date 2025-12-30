import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card-component',
  imports: [],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.css',
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() description?: string = '';
  @Input() price!: number;
  @Input() imageUrl!: string;
  @Input() isInCart: boolean = false;
  @Output() addToCart = new EventEmitter<void>();
}
