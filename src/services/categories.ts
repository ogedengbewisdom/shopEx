import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { APIResponse, ICategory } from '../lib/interface';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  private baseUrl = 'http://localhost:3000/api/v1';
  private http = inject(HttpClient);
  private categorySubject = new BehaviorSubject<ICategory[]>([]);
  categories$ = this.categorySubject.asObservable();
  categoryCache: ICategory[] | null = null;

  getCategories(): Observable<ICategory[]> {
    if (this.categoryCache) {
      this.categorySubject.next(this.categoryCache);
      return of(this.categoryCache);
    }
    return this.http.get<APIResponse<ICategory[]>>(`${this.baseUrl}/category`).pipe(
      map((res) => {
        this.categoryCache = res.data;
        this.categorySubject.next(res.data);
        return this.categoryCache;
      }),
    );
  }
}
