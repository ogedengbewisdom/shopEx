// import { HttpInterceptorFn } from '@angular/common/http';
// import { map, tap } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const allowedUrls = ['/products'];
//   const isProductUrl = allowedUrls.some((url) => req.url.startsWith(url));
//   if (isProductUrl) {
//     const modifiedReq = req.clone({
//       setHeaders: {
//         'X-User-Email': localStorage.getItem('email') || '',
//       },
//     });
//     return next(modifiedReq).pipe(
//       tap((event) => {
//         console.log('event', event);
//         return event;
//       }),
//     );
//   }

//   return next(req);
// };
import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const allowedUrls = ['/products'];
  const isProductUrl = allowedUrls.some((url) => req.url.includes(url));

  // const logHeaders = (header: HttpHeaders) => {
  //   const headerObj: Record<string, string> = {};

  //   header.keys().forEach((key) => {
  //     headerObj[key] = header.get(key) || '';
  //   });

  //   return headerObj;
  // };

  if (isProductUrl) {
    const modifiedReq = req.clone({
      setHeaders: {
        'X-User-Email': localStorage.getItem('email') || '',
      },
    });

    // Now you can handle the response and i can see the x-user-email in the request headers
    return next(modifiedReq);
  }

  return next(req);
};
