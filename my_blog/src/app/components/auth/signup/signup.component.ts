// src/app/components/auth/signup/signup.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Define properties for two-way data binding with [(ngModel)]
  // These properties must exist for the template to bind to them.
  fullName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;

  constructor() { }

  // Define the signup method that is called on form submission
  signup() {
    // Your signup logic goes here.
    // For now, we'll just log the data to the console.
    console.log('Signup form submitted with the following data:');
    console.log({
      fullName: this.fullName,
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      acceptTerms: this.acceptTerms
    });
  }
}
