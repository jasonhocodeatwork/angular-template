import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupform: FormGroup
  forbiddenusernames = ['chris','anna']

  ngOnInit(): void {
    this.signupform = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl('default name', [Validators.required, this.forbiddennames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenemails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupform.valueChanges.subscribe((value) => console.log(value));
    // this.signupform.statusChanges.subscribe((value) => console.log(value));
    
    // this.signupform.patchValue
    this.signupform.setValue({
      'userData': {
        'username': 'jason',
        'email': 'max@dd.com'
      },
      'gender': 'male',
      'hobbies': []
    })
  }

  onSubmit() {
    console.log(this.signupform);
  }

  onaddhobby() {
    const control = new FormControl(null);
    (<FormArray>this.signupform.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupform.get('hobbies')).controls;
  }

  //own validator
  forbiddennames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenusernames.indexOf(control.value) !== -1)
      return {'nameIsForbbiden111': true};
    return null;
  }

  forbiddenemails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve,reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'forbiddenemail111': true})
        } else {
          resolve(null)
        }
      }, 1500);
    })
    return promise
  }
  
}
