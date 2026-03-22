import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler-service';
import { APIResponse } from '../lib/interface';

interface ICurrentUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/v1';
  private http = inject(HttpClient);
  private router = inject(Router);
  private authenticationSubject = new BehaviorSubject<boolean>(!!this.getCurrentUser()?.email);
  private currentUserSubject = new BehaviorSubject<ICurrentUser | null>(this.getCurrentUser());
  isAuthenticated$ = this.authenticationSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  // setAuthentication(isAuthenticated: boolean) {
  //   this.authenticationSubject.next(isAuthenticated);
  // }

  login<T>(email: string, password: string): Observable<APIResponse<T>> {
    // localStorage.setItem('email', email);
    // this.authenticationSubject.next(true);
    // this.router.navigate(['/products']);
    return this.http.post<APIResponse<T>>(`${this.baseUrl}/auth/login`, { email, password });
  }

  setAuthSubject(): void {
    this.authenticationSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.authenticationSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authenticationSubject.getValue();
  }

  getCurrentUser(): ICurrentUser | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData).user : null;
  }
}
