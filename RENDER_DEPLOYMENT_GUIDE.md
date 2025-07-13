# Render Deployment Guide - Fixed Version

## What Was Fixed

The original deployment was failing due to several issues:

1. **System Dependencies**: `pytesseract` requires Tesseract OCR which isn't available on Render's free tier
2. **Heavy Dependencies**: `llama-index` and `gradient` are memory-intensive and cause build timeouts
3. **Missing Language Models**: Spacy language model wasn't being downloaded during build
4. **Python Version**: No specific Python version was specified

## Changes Made

### 1. Updated `requirements.txt`
- Commented out problematic dependencies: `pytesseract`, `cassandra-driver`, `llama-index`, `gradient`
- Added `PyPDF2` for direct PDF text extraction
- Kept essential packages: `fastapi`, `uvicorn`, `spacy`, `docx2txt`, `pdf2image`, `pillow`

### 2. Created `build.sh`
- Downloads spacy language model (`en_core_web_sm`)
- Creates necessary directories
- Handles the build process properly

### 3. Updated `file_service.py`
- Replaced OCR-based text extraction with direct PDF text extraction using `PyPDF2`
- Added fallback mechanism for PDF processing
- Disabled image-based text extraction for deployment compatibility

### 4. Created `runtime.txt`
- Specifies Python 3.11.7 for compatibility

### 5. Created `.render.yaml`
- Configures build and start commands
- Sets environment variables
- Uses free tier plan

## Deployment Steps

### Step 1: Push Changes to GitHub
```bash
git add .
git commit -m "Fix Render deployment issues"
git push origin main
```

### Step 2: Deploy on Render

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `resume-parser-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `chmod +x build.sh && ./build.sh`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: `Free`

5. **Click "Create Web Service"**

### Step 3: Monitor the Build

The build process will:
1. Install Python dependencies
2. Download spacy language model
3. Create necessary directories
4. Start the FastAPI server

**Expected build time**: 5-10 minutes

## Troubleshooting

### If Build Still Fails:

1. **Check Render Logs**
   - Go to your service dashboard
   - Click on "Logs" tab
   - Look for specific error messages

2. **Common Issues and Solutions:**

   **Issue**: "No module named 'spacy'"
   **Solution**: The build script should handle this. If not, manually add to build command:
   ```
   pip install -r requirements.txt && python -m spacy download en_core_web_sm
   ```

   **Issue**: "Memory limit exceeded"
   **Solution**: The free tier has 512MB RAM limit. We've removed heavy dependencies to stay within limits.

   **Issue**: "Build timeout"
   **Solution**: Build should complete within 10 minutes. If it times out, check for infinite loops or heavy operations.

3. **Alternative: Use Railway**
   - Railway has better free tier limits
   - Follow the Railway deployment guide in `DEPLOYMENT.md`

### Testing Your Deployment

1. **Check if service is running:**
   - Visit your Render URL + `/docs`
   - Should see FastAPI documentation

2. **Test file upload:**
   - Use the frontend or Postman
   - Upload a PDF or DOCX file
   - Check if text extraction works

## Current Limitations

Due to the changes made for deployment compatibility:

1. **OCR Disabled**: Image-based text extraction is disabled
2. **PDF Processing**: Uses direct text extraction (works for text-based PDFs)
3. **No AI Features**: Llama-index integration is disabled

## Re-enabling Features (Optional)

If you want to re-enable advanced features:

1. **For OCR**: Deploy on a platform with system dependencies (Railway, Heroku, or paid Render plan)
2. **For AI Features**: Add back `llama-index` and `gradient` dependencies
3. **For Database**: Add back `cassandra-driver` and configure database connection

## Next Steps

1. **Deploy the backend** using the steps above
2. **Update frontend URL** in `script.js` with your new backend URL
3. **Deploy frontend** to Netlify
4. **Test the complete application**

Your resume parser should now deploy successfully on Render! 🚀 