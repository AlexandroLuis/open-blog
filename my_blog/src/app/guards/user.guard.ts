import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.getCurrentUser().pipe(
      map(user => {
        // If a user exists, allow them to access the route
        if (user) {
          return true;
        }
        // If no user exists, redirect to the login page and block access
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}

