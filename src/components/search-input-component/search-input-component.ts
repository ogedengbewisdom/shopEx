import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input-component',
  imports: [FormsModule],
  templateUrl: './search-input-component.html',
  styleUrl: './search-input-component.css',
})
export class SearchInputComponent {
  @Input() searchValue = '';
  @Output() search = new EventEmitter<string>();
}
