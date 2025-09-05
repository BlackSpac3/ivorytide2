# Wedding Invitation Customization Guide

## 🎉 Your Beautiful Wedding Invitation Site is Ready!

This modern, elegant wedding invitation website includes all the features you requested and more!

## ✨ Features Included

### 1. **Hero Section**
- Elegant typography with couple names (Sarah & Michael)
- Animated entrance effects
- Wedding date and venue information
- Scroll indicator

### 2. **Wedding Details**
- Ceremony, cocktail hour, and reception timeline
- Interactive cards with hover effects
- Venue address with directions button
- Beautiful iconography

### 3. **Honeymoon Fund (GoFundMe Style)**
- Multiple funding goals (flights, dinners, excursions)
- Progress bars showing current funding status
- Donation form with preset and custom amounts
- Secure payment integration ready

### 4. **Photo Gallery with QR Code**
- QR code that guests can scan with their phones
- Direct link to photo upload page
- Instructions for easy photo sharing
- Apple Photos album integration ready

### 5. **Additional Features**
- **Navigation Bar**: Smooth scrolling between sections
- **RSVP Form**: Guest response collection
- **Responsive Design**: Works perfectly on all devices
- **Modern Animations**: Framer Motion for smooth interactions
- **Elegant Typography**: Cormorant Garamond + Poppins fonts
- **Wedding Color Scheme**: Gold, cream, and warm tones

## 🎨 Customization Instructions

### Update Couple Information
1. **Names**: Search and replace "Sarah & Michael" throughout the components
2. **Wedding Date**: Update "June 15th, 2024" in Hero and Footer components
3. **Venue**: Change "Sunset Garden Estate, Napa Valley" to your venue

### Customize Colors
Edit `app/globals.css` to change the color scheme:
```css
:root {
  --primary: #d4a574;     /* Gold accent color */
  --secondary: #8b7355;   /* Brown accent */
  --accent: #f5f1eb;      /* Light cream background */
}
```

### Update Gallery QR Code
In `app/components/Gallery.tsx`, replace:
```javascript
const albumLink = 'https://www.apple.com/photos/album'; // Replace with your actual album link
```

### Honeymoon Fund Integration
In `app/components/HoneymoonFund.tsx`:
1. Update fund goals and descriptions
2. Replace the alert in `handleDonate()` with actual payment processor integration (Stripe, PayPal, etc.)

### RSVP Form Integration
In `app/components/RSVP.tsx`:
1. Replace the alert in `handleSubmit()` with actual form submission
2. Integrate with email service or database

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Drag and drop your build folder to Netlify
2. Or connect your GitHub repository

### Custom Domain
1. Purchase your domain (e.g., sarahandmichael.com)
2. Configure DNS settings in your deployment platform

## 📱 Mobile Optimization

The site is fully responsive and includes:
- Mobile-friendly navigation
- Touch-optimized interactions
- Optimized QR code scanning
- Fast loading on mobile networks

## 🎯 Next Steps

1. **Test the QR Code**: Replace the placeholder link with your actual photo album
2. **Set up Payment Processing**: Integrate Stripe or PayPal for the honeymoon fund
3. **Configure RSVP**: Set up email notifications for RSVPs
4. **Add Real Photos**: Replace placeholder content with your engagement photos
5. **Custom Domain**: Set up your wedding website domain

## 💡 Pro Tips

- Test the QR code thoroughly before printing invitations
- Set up analytics to track visitor engagement
- Create a backup of RSVP responses
- Consider adding a countdown timer to the wedding day
- Add social media integration for easy sharing

## 🎨 Design Philosophy

This design follows modern wedding invitation trends:
- **Elegant Typography**: Classic serif fonts for timeless appeal
- **Warm Color Palette**: Gold and cream for luxury feel
- **Subtle Animations**: Smooth, non-distracting motion
- **Clean Layout**: Plenty of white space for readability
- **Mobile-First**: Designed for smartphone users

Your wedding invitation website is now ready to share with your guests! 💕

---

*Made with love for your special day* ❤️
