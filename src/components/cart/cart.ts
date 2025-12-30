import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { IProduct } from '../../lib/interface';

@Component({
  selector: 'app-cart-component',
  imports: [ButtonComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  @Input() name!: string;
  @Input() price!: number;
  @Input() quantity!: number;
  @Input() imageUrl!: string;
  @Input() id!: number;
  @Output() removeFromCart = new EventEmitter<IProduct>();
  @Output() addToCart = new EventEmitter<IProduct>();
}
