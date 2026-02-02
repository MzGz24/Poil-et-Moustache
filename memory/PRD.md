# Poil et Moustache + - PRD

## Original Problem Statement
Create a single-page bilingual website for a pet grooming business in Gatineau called "Poil et Moustache +". The website should be in French and English, mobile-friendly, modern, and professional. Include an online appointment booking form, contact info, and showcase the grooming services.

## User Personas
1. **Pet Owners in Gatineau** - French/English speaking residents looking for professional grooming services
2. **Business Owner (Valérie Trépanier)** - Needs a professional online presence to attract customers

## Core Requirements
- Bilingual website (FR/EN) with language toggle
- Hero section with headline, address, phone, CTA
- About section with business info
- Services section (Bath & Haircut, Nail Trimming, Full Grooming, Special Care)
- Gallery with lightbox
- Booking form with MongoDB storage
- Contact section with address, phone, email, hours
- Footer with Facebook link
- Mobile responsive design

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB
- **Design**: Warm minimalist theme (browns, pastels, cream)
- **Fonts**: Montserrat (headings), Open Sans (body)

## What's Been Implemented (Dec 2025)
- [x] Hero section with French/English content
- [x] Language toggle (FR/EN) with localStorage persistence
- [x] Navigation with smooth scroll
- [x] About section
- [x] Services section with 4 service cards
- [x] Gallery with lightbox modal
- [x] **Reviews section with customer testimonials** (NEW)
- [x] **Add review form with 5-star rating** (NEW)
- [x] Booking form with all fields (name, phone, email, pet name, pet type, service, date, time, notes)
- [x] Backend API for bookings (/api/bookings)
- [x] **Backend API for reviews (/api/reviews)** (NEW)
- [x] Contact section with 4 info cards
- [x] CTA section
- [x] Footer with Facebook link
- [x] Mobile responsive design

## Prioritized Backlog
### P0 (Critical) - Done
- Bilingual content ✅
- Booking form ✅
- Contact information ✅

### P1 (High) - Future
- Email notifications for new bookings
- Admin dashboard for booking management
- Google Maps embed with actual location

### P2 (Medium) - Future
- Before/after gallery photos
- Pricing information
- Newsletter signup
- Review moderation admin panel

## User Choices
- Booking: Integrated form (not external link)
- Design: Balanced minimalist with darker tones
- Language: Toggle button (not side-by-side)
- Social: Facebook only (https://www.facebook.com/share/1GHgKQAyaJ/)

## Next Tasks
1. Add email notifications for bookings
2. Create admin dashboard for managing appointments
3. Replace placeholder images with actual salon photos
4. Add Google Maps integration with actual business location
