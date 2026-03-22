import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HandleError } from '../services/handle-error';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const allowedUrls = ['/products', '/users'];
  const isProductUrl = allowedUrls.some((url) => req.url.includes(url));
  const handleError = inject(HandleError);

  const userData = localStorage.getItem('userData');
  const userDataObject = userData ? JSON.parse(userData) : null;

  if (isProductUrl) {
    const modifiedReq = req.clone({
      setHeaders: {
        'X-User-Email': userDataObject?.user?.email,
        Authorization: `Bearer ${userDataObject?.accessToken}`,
      },
    });

    // Now you can handle the response and i can see the x-user-email in the request headers
    return next(modifiedReq).pipe(
      catchError((error) => {
        return throwError(() => handleError.errorHandler(error));
      }),
    );
  }

  return next(req);
};
