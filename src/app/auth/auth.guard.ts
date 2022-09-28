import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private as: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.as.user.pipe(
             take(1), // without this, the user subject may emit more than once
            map(user => {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            // if it is false isAuth
            return this.router.createUrlTree(['/auth'])
        }))
    }
    
}