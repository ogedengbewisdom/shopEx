import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface ICurrentUser {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private authenticationSubject = new BehaviorSubject<boolean>(!!this.getCurrentUser()?.email);
  private currentUserSubject = new BehaviorSubject<ICurrentUser | null>(this.getCurrentUser());
  isAuthenticated$ = this.authenticationSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  // setAuthentication(isAuthenticated: boolean) {
  //   this.authenticationSubject.next(isAuthenticated);
  // }

  login(email: string): void {
    localStorage.setItem('email', email);
    this.authenticationSubject.next(true);
    // this.router.navigate(['/products']);
  }

  logout(): void {
    localStorage.removeItem('email');
    this.authenticationSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authenticationSubject.getValue();
  }

  getCurrentUser(): ICurrentUser | null {
    const email = localStorage.getItem('email');
    return email ? { email: email } : null;
  }
}
