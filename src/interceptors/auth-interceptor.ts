import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const allowedUrls = ['/products'];
  const isProductUrl = allowedUrls.some((url) => req.url.startsWith(url));
  if (isProductUrl) {
    const modifiedReq = req.clone({
      setHeaders: {
        'X-User-Email': localStorage.getItem('email') || '',
      },
    });
    return next(modifiedReq);
  }

  return next(req);
};
