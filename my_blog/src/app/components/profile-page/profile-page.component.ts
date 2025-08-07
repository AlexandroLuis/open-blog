import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {

  profileForm: FormGroup;
  isSaving: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      avatar_url: ['']
    });
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.profileForm.patchValue(user);
    });
  }

  save() {
    // Clear any previous messages
    this.successMessage = '';
    this.errorMessage = '';

    if (this.profileForm.invalid) {
      this.errorMessage = 'Please fill in all required fields and correct any errors.';
      return;
    }
    
    this.isSaving = true;
    this.userService.updateCurrentUser(this.profileForm.value).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully!';
        this.isSaving = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to update profile. Please try again.';
        this.isSaving = false;
        console.error(err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
