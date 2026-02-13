import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card-component',
  imports: [CommonModule],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.css',
})
export class ProductCardComponent {
  router = inject(Router);
  @Input() name!: string;
  @Input() description?: string = '';
  @Input() price!: number;
  @Input() imageUrl!: string;
  @Input() isInCart: boolean = false;
  // @Output() addToCart = new EventEmitter<void>();
  @Output() navigateToProduct = new EventEmitter<number>();
}
