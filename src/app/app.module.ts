import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor';
import { LogginInterceptor } from './loggin-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  // provide: let angular detect this token 'HTTP_INTERCEPTORS' identified by interceptor
  // useClass: define class
  // multi: let angular inject the multiple services by this token 'HTTP_INTERCEPTORS'
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LogginInterceptor, multi: true},
  ],  
  
  bootstrap: [AppComponent]
})
export class AppModule {}
