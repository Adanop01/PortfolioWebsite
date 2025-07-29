# Formspree Setup Guide

Formspree is the easiest way to add email functionality to your contact form. Follow these simple steps:

## 1. Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account using your email (adanop01@gmail.com)
3. Verify your email address

## 2. Create a New Form
1. In your Formspree dashboard, click "New Form"
2. Enter your email address: `adanop01@gmail.com`
3. Give your form a name: "Portfolio Contact Form"
4. Click "Create Form"

## 3. Get Your Form Endpoint
1. After creating the form, you'll see your form endpoint
2. It will look like: `https://formspree.io/f/xpznvqrw`
3. Copy this URL

## 4. Update Your Code
Replace the placeholder in `contact.component.ts`:

```typescript
private readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

Replace `YOUR_FORM_ID` with your actual form ID from step 3.

## 5. Test Your Setup
1. Run your application: `ng serve`
2. Fill out the contact form
3. Submit the form
4. Check your email inbox (adanop01@gmail.com)

## 6. Verify Your Form (First Time Only)
1. The first submission will require email verification
2. Check your email for a verification link from Formspree
3. Click the verification link
4. After verification, all future submissions will work automatically

## Form Features Included:
- ✅ **Name** - User's full name
- ✅ **Email** - User's email (set as reply-to)
- ✅ **Subject** - Message subject line
- ✅ **Message** - User's message content
- ✅ **Auto-reply** - Formspree can send auto-replies
- ✅ **Spam protection** - Built-in spam filtering

## Free Plan Includes:
- 50 submissions per month
- Email notifications
- Spam filtering
- File uploads (up to 10MB)
- Basic integrations

## Optional: Customize Email Template
1. In your Formspree dashboard, go to your form settings
2. Click "Emails" tab
3. Customize the email template that you receive
4. You can include custom subject lines and formatting

## Optional: Set Up Auto-Reply
1. In form settings, go to "Emails" tab
2. Enable "Send auto-reply to form submitter"
3. Customize the auto-reply message
4. This sends a confirmation email to users who contact you

## Troubleshooting:
- Make sure you've verified your email address
- Check spam folder for Formspree emails
- Ensure the form endpoint URL is correct
- Check browser console for error messages
- Verify your form is active in Formspree dashboard

## Example Email You'll Receive:
```
From: noreply@formspree.io
Reply-To: user@example.com
Subject: New Contact Form Submission

Name: John Doe
Email: user@example.com
Subject: Interested in your services
Message: Hi Adan, I'd like to discuss a potential project...
```

That's it! Formspree is much simpler than EmailJS and requires no API keys or complex setup.