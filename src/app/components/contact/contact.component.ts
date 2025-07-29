import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  // Formspree Configuration
  private readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzzvgekq';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  async onSubmit(event?: Event): Promise<void> {
    // Prevent default form submission
    if (event) {
      event.preventDefault();
    }

    if (!this.isFormValid() || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    try {
      // Prepare JSON data for Formspree
      const formPayload = {
        name: this.formData.name.trim(),
        email: this.formData.email.trim(),
        subject: this.formData.subject?.trim() || 'Contact from Portfolio',
        message: this.formData.message.trim(),
        _replyto: this.formData.email.trim(),
        _subject: `Portfolio Contact: ${this.formData.subject?.trim() || 'New Message'}`
      };

      console.log('Sending form data:', formPayload);

      // Send to Formspree with proper headers
      const response = await this.http.post(this.FORMSPREE_ENDPOINT, formPayload, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).toPromise();

      console.log('Email sent successfully via Formspree:', response);
      this.submitSuccess = true;
      this.submitMessage = 'Thank you! Your message has been sent successfully.';
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

      // Clear success message after 5 seconds
      setTimeout(() => {
        this.submitMessage = '';
        this.submitSuccess = false;
      }, 5000);

    } catch (error: any) {
      console.error('Failed to send email via Formspree:', error);
      console.error('Error details:', error.error);
      this.submitSuccess = false;
      
      // Handle specific Formspree errors
      if (error.status === 422) {
        const errorMsg = error.error?.errors ? 
          Object.values(error.error.errors).flat().join(', ') : 
          'Please check your form data and try again.';
        this.submitMessage = `Validation error: ${errorMsg}`;
      } else if (error.status === 429) {
        this.submitMessage = 'Too many requests. Please try again later.';
      } else if (error.status === 403) {
        this.submitMessage = 'Form submission blocked. Please verify your email address.';
      } else {
        this.submitMessage = 'Sorry, there was an error sending your message. Please try the email client option below.';
      }
      
      // Clear error message after 8 seconds for longer messages
      setTimeout(() => {
        this.submitMessage = '';
      }, 8000);
    } finally {
      this.isSubmitting = false;
    }
  }

  // Fallback method using mailto
  openMailClient(): void {
    if (isPlatformBrowser(this.platformId)) {
      const subject = encodeURIComponent(this.formData.subject || 'Contact from Portfolio');
      const body = encodeURIComponent(
        `Hi Adan,\n\nName: ${this.formData.name}\nEmail: ${this.formData.email}\n\nMessage:\n${this.formData.message}`
      );
      
      window.location.href = `mailto:adanop01@gmail.com?subject=${subject}&body=${body}`;
    }
  }

  private isFormValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = !!(
      this.formData.name?.trim() && 
      this.formData.email?.trim() && 
      emailRegex.test(this.formData.email.trim()) &&
      this.formData.message?.trim()
    );
    
    console.log('Form validation:', {
      name: !!this.formData.name?.trim(),
      email: !!this.formData.email?.trim(),
      emailValid: emailRegex.test(this.formData.email?.trim() || ''),
      message: !!this.formData.message?.trim(),
      overall: isValid
    });
    
    return isValid;
  }

  // Test method to verify Formspree endpoint
  async testFormspree(): Promise<void> {
    console.log('Testing Formspree endpoint...');
    try {
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
        _replyto: 'test@example.com'
      };

      const response = await this.http.post(this.FORMSPREE_ENDPOINT, testData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).toPromise();

      console.log('Test successful:', response);
    } catch (error) {
      console.error('Test failed:', error);
    }
  }
}
