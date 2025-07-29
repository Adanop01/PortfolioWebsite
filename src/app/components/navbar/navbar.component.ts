import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isDarkMode = true; // Default to dark mode
  isMobileMenuOpen = false;

  navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  getNavbarStyles() {
    if (this.isDarkMode) {
      return {
        background: 'rgba(0, 0, 0, 0.8)',
        'border-bottom': '1px solid rgba(255, 255, 255, 0.1)',
        'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.3)',
      };
    } else {
      return {
        background: 'rgba(255, 255, 255, 0.9)',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.1)',
        'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.1)',
      };
    }
  }

  getNavLinkStyles() {
    return this.isDarkMode ? '#e0e0e0' : '#374151';
  }

  getNavLinkHoverStyles() {
    return this.isDarkMode ? '#00f5ff' : '#3b82f6';
  }

  onNavLinkHover(event: Event, isHover: boolean): void {
    const target = event.target as HTMLElement;
    if (isHover) {
      target.style.color = this.getNavLinkHoverStyles();
      target.style.textShadow = this.isDarkMode
        ? '0 0 10px rgba(0, 245, 255, 0.5)'
        : '0 0 10px rgba(59, 130, 246, 0.5)';
    } else {
      target.style.color = this.getNavLinkStyles();
      target.style.textShadow = 'none';
    }
  }

  onThemeButtonHover(event: Event, isHover: boolean): void {
    const target = event.target as HTMLElement;
    if (isHover) {
      target.style.background = this.isDarkMode
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)';
    } else {
      target.style.background = this.isDarkMode
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)';
    }
  }

  onMobileButtonHover(event: Event, isHover: boolean): void {
    const target = event.target as HTMLElement;
    if (isHover) {
      target.style.background = this.isDarkMode
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)';
    } else {
      target.style.background = this.isDarkMode
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)';
    }
  }

  getMobileButtonColor(): string {
    return this.isDarkMode ? '#ffffff' : '#000000';
  }

  onMobileLinkHover(event: Event, isHover: boolean): void {
    const target = event.target as HTMLElement;
    if (isHover) {
      target.style.background = this.isDarkMode
        ? 'rgba(0, 245, 255, 0.1)'
        : 'rgba(59, 130, 246, 0.1)';
      target.style.color = this.isDarkMode ? '#00f5ff' : '#3b82f6';
    } else {
      target.style.background = 'transparent';
      target.style.color = this.isDarkMode ? '#e0e0e0' : '#4b5563';
    }
  }
}
