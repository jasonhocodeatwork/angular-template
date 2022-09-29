import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
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

  constructor(private as: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}


  
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
      this.showerroralert(err)
      this.isloading = false; 
    }) 
    form.reset()
  }

  onhandleerror() {
    this.error = null
  }

  //automatically find the first occurrence of this directive
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  closeSub: Subscription;
  private showerroralert(message: string) {
    // instead of using new AlertComponent to create this instance,
    // you have to do instantiate this way to let Angular know
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewcontainerref
    //clear what might be rendered in this place at this ref before
    hostViewContainerRef.clear()
    //create mew component in that place
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      //one-time only
      this.closeSub.unsubscribe();
      // clear the modal made by alert component
      hostViewContainerRef.clear()
    })
  } 


}
