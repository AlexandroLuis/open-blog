import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

const MOCK_USER: User = {
  id: 1,
  username: 'john_doe',
  email: 'john@example.com',
  bio: 'Just a blogger.',
  avatar_url: 'https://i.pravatar.cc/150?img=3',
  is_admin: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = { ...MOCK_USER };

  getCurrentUser(): Observable<User> {
    return of(this.user);
  }

  updateCurrentUser(data: Partial<User>): Observable<User> {
    this.user = { ...this.user, ...data, updated_at: new Date().toISOString() };
    return of(this.user);
  }
}
