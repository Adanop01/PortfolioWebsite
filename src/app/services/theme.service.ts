import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(true); // Default to dark mode
  public isDarkMode$ = this.isDarkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Check for saved theme preference or default to dark mode
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'light') {
        this.setDarkMode(false);
      } else {
        this.setDarkMode(true); // Default to dark mode
      }
    }
  }

  toggleTheme(): void {
    this.setDarkMode(!this.isDarkMode.value);
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode.next(isDark);
    
    if (isPlatformBrowser(this.platformId)) {
      if (isDark) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode.value;
  }
}