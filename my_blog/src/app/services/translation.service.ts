import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('en');
  private translations: Record<string, any> = {};

  constructor(private http: HttpClient) {
    this.loadTranslations('en');
  }

  loadTranslations(lang: string) {
    this.http.get(`/assets/i18n/${lang}.json`).subscribe((res: any) => {
      this.translations = res;
      this.currentLang.next(lang);
    });
  }

  get currentLanguage(): Observable<string> {
    return this.currentLang.asObservable();
  }

  translate(key: string): string {
    const keys = key.split('.');
    let result = this.translations;
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // fallback to key if not found
      }
    }
    return typeof result === 'string' ? result : key;
  }
}
