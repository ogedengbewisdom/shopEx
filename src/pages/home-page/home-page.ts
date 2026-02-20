import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button-component/button-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  router = inject(Router);

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}
