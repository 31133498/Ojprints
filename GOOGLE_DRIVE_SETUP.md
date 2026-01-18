# Google Drive Integration Setup Guide

## Overview
This portfolio now dynamically loads images from a Google Drive folder, automatically updating when new images are added.

## Setup Instructions

### 1. Get Google Drive API Key
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable the Google Drive API
4. Create credentials (API Key)
5. Restrict the API key to Google Drive API only (recommended)

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Add your Google Drive API key:
   ```
   VITE_GOOGLE_DRIVE_API_KEY=your_actual_api_key_here
   ```

### 3. Google Drive Folder Setup
The portfolio is configured to use this folder:
- **Folder ID**: `1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05`
- **Link**: https://drive.google.com/drive/folders/1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05

**Important**: Make sure this folder is set to "Anyone with the link can view" for public access.

### 4. Supported Image Formats
- PNG
- JPG/JPEG
- GIF
- WebP

## Features

### ✅ Dynamic Loading
- Images automatically appear when added to the Drive folder
- No code changes needed for new images
- Auto-refresh every 5 minutes

### ✅ Performance Optimized
- Lazy loading for better performance
- Thumbnail support for faster initial load
- Responsive images for all devices
- CDN-like caching through Google Drive

### ✅ User Experience
- Lightbox viewing for full-size images
- Smooth animations and transitions
- Loading states and error handling
- Mobile-responsive design

### ✅ Smart Metadata
- Automatic project titles based on filename
- Intelligent technology tag assignment
- Professional descriptions generated
- Chronological ordering (newest first)

## File Naming Conventions
For better automatic categorization, use these naming patterns:

- `logo_*` or `brand_*` → Brand Identity projects
- `social_*` or `marketing_*` → Digital Marketing projects  
- `print_*` or `flyer_*` or `brochure_*` → Print Design projects
- `photo_*` or `edit_*` → Photo Manipulation projects
- Other names → Generic Creative Design projects

## Fallback Behavior
If Google Drive API fails or no API key is provided:
- Portfolio falls back to mock data
- No errors shown to users
- Graceful degradation

## Security Notes
- API key is restricted to Google Drive API only
- Folder is read-only (view access only)
- No editing or deletion permissions
- Images are served through Google's CDN

## Troubleshooting

### Images not loading?
1. Check API key is correct in `.env`
2. Verify Google Drive API is enabled
3. Ensure folder has public view access
4. Check browser console for errors

### New images not appearing?
- Wait up to 5 minutes for auto-refresh
- Or refresh the page manually
- Check image format is supported

### Performance issues?
- Images are lazy-loaded automatically
- Thumbnails load first, then high-res
- Google Drive provides CDN-like performance