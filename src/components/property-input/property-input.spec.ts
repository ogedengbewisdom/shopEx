import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyInput } from './property-input';

describe('PropertyInput', () => {
  let component: PropertyInput;
  let fixture: ComponentFixture<PropertyInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
