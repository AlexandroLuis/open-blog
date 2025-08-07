// src/app/components/auth/signup/signup.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule for [(ngModel)]
import { TranslateModule } from '@ngx-translate/core'; // <-- Import TranslateModule for the 'translate' pipe
import { SignupComponent } from './signup.component'; // <-- Import the component

@NgModule({
  declarations: [
    SignupComponent // <-- Declare the component
  ],
  imports: [
    CommonModule,
    FormsModule, // <-- Add FormsModule here
    TranslateModule.forChild() // <-- Add TranslateModule here
  ],
  exports: [
    SignupComponent
  ]
})
export class SignupModule { }
