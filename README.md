# Resume Parser - AI-Powered Resume Analysis

A modern web application that extracts and analyzes information from resume files (PDF and DOCX) using AI and NLP techniques.

## Features

- 📄 **Multi-format Support**: Upload PDF and DOCX resume files
- 🎯 **Smart Extraction**: Automatically extracts key information like:
  - Personal details (name, email, phone)
  - Education history
  - Work experience
  - Skills and certifications
  - Projects and awards
  - Links and contact information
- 🎨 **Modern UI**: Clean, responsive design with drag-and-drop functionality
- ⚡ **Real-time Processing**: Instant feedback and results display
- 📱 **Mobile Responsive**: Works perfectly on all devices

## Project Structure

```
NLP-main/
├── app/                    # Backend API (FastAPI)
│   ├── controllers/        # Request handlers
│   ├── routers/           # API routes
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
├── files/                 # Uploaded files storage
├── images/                # Generated images from PDFs
├── index.html             # Frontend main page
├── styles.css             # Frontend styles
├── script.js              # Frontend JavaScript
├── netlify.toml           # Netlify configuration
└── requirements.txt       # Python dependencies
```

## Quick Start

### Option 1: Deploy to Netlify (Recommended)

1. **Fork/Clone this repository**
2. **Deploy Backend** (Choose one):
   - Deploy to Heroku, Railway, or any Python hosting service
   - Update the `API_BASE_URL` in `script.js` with your backend URL
3. **Deploy Frontend to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build settings:
     - Build command: (leave empty)
     - Publish directory: `.`
   - Deploy!

### Option 2: Local Development

#### Backend Setup

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Install additional system dependencies** (for PDF processing):
   ```bash
   # Ubuntu/Debian
   sudo apt-get install tesseract-ocr poppler-utils
   
   # macOS
   brew install tesseract poppler
   
   # Windows
   # Download and install from: https://github.com/UB-Mannheim/tesseract/wiki
   ```

3. **Run the backend server**:
   ```bash
   cd app
   python main.py
   ```
   The API will be available at `http://localhost:8000`

#### Frontend Setup

1. **Open the frontend**:
   - Simply open `index.html` in your browser, or
   - Use a local server:
     ```bash
     # Python 3
     python -m http.server 8080
     
     # Node.js
     npx serve .
     ```

2. **Update API URL** (if needed):
   - Edit `script.js` and change `API_BASE_URL` to your backend URL

## API Endpoints

### POST `/uploadfile`
Upload and process a resume file.

**Request**: Multipart form data with a file field
**Response**: JSON object containing extracted information

```json
{
  "name": "John Doe",
  "email_id": "john@example.com",
  "mobile_number": "+1234567890",
  "education": "Bachelor's in Computer Science...",
  "experience": "Software Engineer at Tech Corp...",
  "skills": "Python, JavaScript, React...",
  "projects": "E-commerce platform...",
  "certifications": "AWS Certified Developer...",
  "awardsection": "Best Employee Award 2023...",
  "about": "Passionate software developer...",
  "links": ["https://github.com/johndoe", "https://linkedin.com/in/johndoe"],
  "other": "Additional information...",
  "pos_tags": {...},
  "words_freq": {...}
}
```

## Configuration

### Environment Variables

For production deployment, consider setting these environment variables:

- `CORS_ORIGINS`: Comma-separated list of allowed frontend domains
- `MAX_FILE_SIZE`: Maximum file size in bytes (default: 10MB)

### API URL Configuration

Update the `API_BASE_URL` in `script.js`:

```javascript
// For local development
const API_BASE_URL = 'http://localhost:8000';

// For production (replace with your backend URL)
const API_BASE_URL = 'https://your-backend-url.com';
```

## Deployment Guide

### Backend Deployment

#### Heroku
1. Create a `Procfile`:
   ```
   web: uvicorn app.main:app --host=0.0.0.0 --port=$PORT
   ```

2. Deploy using Heroku CLI or GitHub integration

#### Railway
1. Connect your GitHub repository
2. Railway will automatically detect the Python app
3. Set environment variables if needed

#### Other Platforms
- **Render**: Connect GitHub repo, set build command and start command
- **DigitalOcean App Platform**: Similar to Heroku
- **AWS/GCP**: Use container deployment

### Frontend Deployment (Netlify)

1. **Connect Repository**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**:
   - Build command: (leave empty)
   - Publish directory: `.`

3. **Environment Variables** (optional):
   - Add any environment variables if needed

4. **Deploy**:
   - Click "Deploy site"
   - Your site will be live at `https://your-site-name.netlify.app`

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure your backend has CORS middleware configured
   - Check that the frontend URL is in the allowed origins

2. **File Upload Fails**:
   - Check file size (max 10MB)
   - Ensure file is PDF or DOCX format
   - Verify backend is running and accessible

3. **PDF Processing Issues**:
   - Install required system dependencies (tesseract, poppler)
   - Check file permissions for upload directory

4. **Netlify Deployment Issues**:
   - Ensure all files are committed to Git
   - Check build logs for errors
   - Verify `netlify.toml` configuration

### Performance Optimization

1. **Backend**:
   - Use async processing for large files
   - Implement file size limits
   - Add caching for processed results

2. **Frontend**:
   - Compress images and assets
   - Use CDN for external libraries
   - Implement progressive loading

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy Resume Parsing! 🚀** 