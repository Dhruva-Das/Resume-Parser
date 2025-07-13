# Deployment Guide

This guide will help you deploy both the backend API and frontend to production.

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Sign up for Railway** at [railway.app](https://railway.app)
2. **Connect your GitHub repository**
3. **Deploy automatically**:
   - Railway will detect the Python app
   - Install dependencies from `requirements.txt`
   - Start the server using the `Procfile`

4. **Get your backend URL**:
   - Railway will provide a URL like `https://your-app-name.railway.app`
   - Copy this URL for the frontend configuration

### Option 2: Heroku

1. **Install Heroku CLI** and login
2. **Create a new Heroku app**:
   ```bash
   heroku create your-resume-parser-backend
   ```

3. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

4. **Get your backend URL**:
   - Your app will be at `https://your-app-name.herokuapp.com`

### Option 3: Render (Fast Build)

1. **Sign up for Render** at [render.com](https://render.com)
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure**:
   - Build Command: `chmod +x build.sh && ./build.sh`
   - Start Command: `uvicorn app.main:app --host=0.0.0.0 --port=$PORT`

### Option 4: Render with Docker (Fastest)

1. **Sign up for Render** at [render.com](https://render.com)
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure**:
   - Environment: Docker
   - Build Command: (leave empty - Docker will handle it)
   - Start Command: (leave empty - Docker will handle it)

## Frontend Deployment (Netlify)

### Step 1: Update Backend URL

Before deploying, update the backend URL in `script.js`:

```javascript
const API_BASE_URL = 'https://your-backend-url.com'; // Replace with your actual backend URL
```

### Step 2: Deploy to Netlify

1. **Go to [Netlify](https://netlify.com)**
2. **Click "New site from Git"**
3. **Connect your GitHub repository**
4. **Configure build settings**:
   - Build command: (leave empty)
   - Publish directory: `.`
5. **Click "Deploy site"**

### Step 3: Configure Environment Variables (Optional)

In Netlify dashboard:
1. Go to Site settings > Environment variables
2. Add any environment variables if needed

## Testing Your Deployment

1. **Test the backend**:
   - Visit your backend URL + `/docs` (e.g., `https://your-backend.railway.app/docs`)
   - You should see the FastAPI documentation

2. **Test the frontend**:
   - Visit your Netlify URL
   - Try uploading a resume file
   - Check if it connects to your backend

## Troubleshooting

### Build Taking Too Long

If your build is taking more than 10 minutes:

1. **Use Docker deployment** (Option 4 above) - fastest method
2. **Check your requirements.txt** - remove unnecessary dependencies
3. **Use build caching** - platforms like Railway cache dependencies
4. **Pre-download spacy model** locally and include it in your repo

### CORS Issues
If you see CORS errors in the browser console:

1. **Update the backend CORS settings** in `app/main.py`:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://your-netlify-site.netlify.app"],  # Your frontend URL
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Redeploy the backend**

### File Upload Issues
1. **Check file size limits** (max 10MB)
2. **Verify file format** (PDF or DOCX only)
3. **Check backend logs** for errors

### Performance Issues
1. **Enable compression** on your hosting platform
2. **Use CDN** for static assets
3. **Optimize images** before upload

## Security Considerations

1. **Update CORS origins** to only allow your frontend domain
2. **Set up environment variables** for sensitive data
3. **Enable HTTPS** on both frontend and backend
4. **Add rate limiting** to prevent abuse

## Monitoring

1. **Set up logging** for your backend
2. **Monitor error rates** in Netlify
3. **Set up alerts** for downtime

## Cost Optimization

1. **Use free tiers** where possible
2. **Monitor usage** to avoid unexpected charges
3. **Optimize resource usage** (memory, CPU)

---

**Your resume parser should now be live and accessible to users worldwide! 🌍** 