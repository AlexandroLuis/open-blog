import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: [''],
      email: [''],
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
    this.userService.updateCurrentUser(this.profileForm.value).subscribe(() => {
      alert('Profile updated!');
    });
  }
}
