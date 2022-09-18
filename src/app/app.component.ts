import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultQ ="pet"
  answer=""
  genders = ['male', 'female']
  @ViewChild("f") form: NgForm

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: 'abcd',
    //   gender: 'female'
    // })

    // only update what you need 
    this.form.form.patchValue({
      userData: {
        username: 'xxxaaa'
      }
    })
  }

  // onsubmit(form: NgForm) {
  //   console.log(form);
  // }

  // alternative
  
  onsubmit() {
    this.user.username = this.form.value.userData.username
    this.user.email = this.form.value.userData.email
    this.user.secretQuestion = this.form.value.secret
    this.user.answer = this.form.value.questionAnswer
    this.user.gender = this.form.value.gender
    this.form.reset();
  }
}
