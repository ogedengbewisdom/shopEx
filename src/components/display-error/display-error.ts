import { Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';

@Component({
  selector: 'app-display-error',
  imports: [ButtonComponent],
  templateUrl: './display-error.html',
  styleUrl: './display-error.css',
})
export class DisplayError {
  private location = inject(Location);
  @Input() error: string | null = null;
  @Input() statusCode: number | null = null;
  goBack(): void {
    this.location.back();
  }

  reload(): void {
    window.location.reload();
  }
}
