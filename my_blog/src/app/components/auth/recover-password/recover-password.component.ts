import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  // Use a string to store the email from the form input
  email: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  // Method to handle form submission
  recoverPassword(): void {
    console.log('Password recovery initiated for:', this.email);
    // In a real application, you would add logic here to
    // send a password reset email to the provided address.
    // For now, this just logs the email to the console.
    // You might also want to show a message to the user that
    // an email has been sent.
  }
}
