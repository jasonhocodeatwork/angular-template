

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./users/auth.service";

//auth-guard.service.ts
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authservice: AuthService, private router : Router) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
}

    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.authservice.isAuthenticated()
                    .then((authenticated: boolean) => {
                        if (authenticated) {
                            return true
                        }
                        else {
                            this.router.navigate(['/'])
                        }
                    }
                )
    }


}