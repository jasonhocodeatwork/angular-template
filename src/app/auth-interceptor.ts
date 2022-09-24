import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const modifiedrequest = req.clone({url: 'new-url', headers: req.headers.append()})
        const modifiedrequest = req.clone({headers: req.headers.append('Auth', 'xyz')})
        return next.handle(modifiedrequest) // [must] pass request and return it (observable) to continue
    }

}