import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {

  currentLang = 'en';
  isAdmin = false;

  constructor(
    public translationService: TranslationService,
    private userService: UserService,
    private router: Router
  ) {
    this.translationService.currentLanguage.subscribe(lang => this.currentLang = lang);
    this.userService.getCurrentUser().subscribe(user => this.isAdmin = user?.is_admin ?? false);
  }

  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      const value = target.value;
      // now use value
      this.translationService.loadTranslations(value);
    }
  }


  logout() {
    alert('Logged out!');
    this.router.navigate(['/login']);
  }
}
