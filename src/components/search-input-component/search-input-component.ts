import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-input-component',
  imports: [FormsModule],
  templateUrl: './search-input-component.html',
  styleUrl: './search-input-component.css',
})
export class SearchInputComponent implements OnInit {
  @Input() searchValue = '';
  @Output() search = new EventEmitter<string>();
  router = inject(ActivatedRoute);
  private route = inject(Router);
  

  ngOnInit(): void {
    this.router.params.pipe(debounceTime(300), distinctUntilChanged()).subscribe((params) => {
      const search = params['name'] || '';
      this.search.emit(search);
    });
  }

  navigateToCreateProduct(){
    this.route.navigate(['/products/new'])
  }
}
