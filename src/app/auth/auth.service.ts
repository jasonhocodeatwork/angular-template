import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.mode";



export interface AuthResponseData {
    king: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}
   
    // user = new Subject<User>();
    //just a different type of subject but with init value
    user = new BehaviorSubject<User>(null);

    singup(email, password) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAs9F5mXL-lUrcwofLtf3T1DlI1ZXQze1U',
            {
                email: email,
                password: password, 
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError), 
                tap(resData => {
                        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                })
            ) 
    }

    login(email, password) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAs9F5mXL-lUrcwofLtf3T1DlI1ZXQze1U', 
        {
            email: email,
            password: password, 
            returnSecureToken: true           
        })
        .pipe(
            catchError(this.handleError), 
            tap(resData => {
                    this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            })
        )
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
        // Date().getTime() get back milisecond since 1970 add resData.expiresIn (second) will be future expiration Date
        const expiredDate = new Date(new Date().getTime() + expiresIn*1000);
        const user = new User(email, userId, token, expiredDate);
        this.user.next(user)
        this.autologout(expiresIn * 1000) // second -> milisecond
        localStorage.setItem('userData', JSON.stringify(user))
    }

    autologin() {
        const userdata: {email: string, id: string, _token:string, _tokenExpDate: string} 
            = JSON.parse(localStorage.getItem('userData'))
        if (!userdata) return
        const loadeduser 
            = new User(userdata.email, userdata.id, userdata._token, new Date(userdata._tokenExpDate))
        console.log(loadeduser);
        
        if (loadeduser.token) {
            this.user.next(loadeduser)
             // second -> milisecond, 
             // target future total time from 1970 - current total time from 1970 = time to arrive
            this.autologout( new Date(userdata._tokenExpDate).getTime() - new Date().getTime() * 1000)
        }
    }

    private handleError(errRes: HttpErrorResponse) {
        let error = 'an unknown error'
        if (!errRes.error || !errRes.error.error) {
            return throwError(error)
        }
        switch(errRes.error.error.message) {
            case 'EMAIL_EXISTS':
             error = 'this email existed!'
             break;
            case 'EMAIL_NOT_FOUND':
             error = 'email not found!'       
             break;  
            case 'INVALID_PASSWORD':
             error = 'password incorrect'       
             break;                
        }
        return throwError(error)
    }

    private timer: any
    logout() {
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if (this.timer) {
            // if manual logout, the app is still working with its autologout().
            // so we need to handle this timeout function as well.
            clearTimeout(this.timer)
        }
        this.timer = null;
    }

    autologout(expiredin: number) {
        console.log(expiredin);
        this.timer = setTimeout(() => {
            this.logout()
        }, expiredin);
    }



}