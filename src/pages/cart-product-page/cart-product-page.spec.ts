import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductPage } from './cart-product-page';

describe('CartProductPage', () => {
  let component: CartProductPage;
  let fixture: ComponentFixture<CartProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartProductPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartProductPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
