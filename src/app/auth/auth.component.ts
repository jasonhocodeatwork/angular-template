import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isloginmode = true;
  isloading = false;
  error: string = null

  onswitchmode() {
    this.isloginmode = !this.isloginmode;
  }

  constructor(private as: AuthService, private router: Router) {}


  
  onSubmit(form: NgForm) {
    if(!form.valid)
      return;
    this.isloading = true;

    let authObs: Observable<AuthResponseData>;
    if (this.isloginmode) {
      authObs = this.as.login(form.value.email, form.value.password)
    } else {
      authObs = this.as.singup(form.value.email, form.value.password)
    }
    authObs.subscribe(res => {
      this.isloading = false;
      this.router.navigate(['/recipes'])
    },err => {
      console.log(err);
      this.error = err
      this.isloading = false; 
    }) 
    form.reset()
  }


}
