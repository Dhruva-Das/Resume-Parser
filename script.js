// API Configuration
// For local development: http://localhost:8000
// For production: Update this to your deployed backend URL
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:8000' 
    : 'https://resume-parser-6-njyc.onrender.com'; // Replace with your actual backend URL

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadSection = document.getElementById('uploadSection');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const errorSection = document.getElementById('errorSection');
const resultsGrid = document.getElementById('resultsGrid');
const errorText = document.getElementById('errorText');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    setupDragAndDrop();
    setupFileInput();
});

function setupDragAndDrop() {
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('click', () => fileInput.click());
}

function setupFileInput() {
    fileInput.addEventListener('change', handleFileSelect);
}

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFile(file) {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        showError('Please upload a PDF or DOCX file.');
        return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        showError('File size must be less than 10MB.');
        return;
    }

    uploadFile(file);
}

async function uploadFile(file) {
    showLoading();
    
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${API_BASE_URL}/uploadfile`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        showResults(data);
    } catch (error) {
        console.error('Upload error:', error);
        showError(error.message || 'Failed to process the file. Please try again.');
    }
}

function showLoading() {
    uploadSection.style.display = 'none';
    loadingSection.style.display = 'block';
    resultsSection.style.display = 'none';
    errorSection.style.display = 'none';
}

function showResults(data) {
    loadingSection.style.display = 'none';
    resultsSection.style.display = 'block';
    
    // Clear previous results
    resultsGrid.innerHTML = '';
    
    // Define the sections to display
    const sections = [
        { key: 'name', title: 'Name', icon: 'fas fa-user', priority: 1 },
        { key: 'email_id', title: 'Email', icon: 'fas fa-envelope', priority: 1 },
        { key: 'mobile_number', title: 'Phone', icon: 'fas fa-phone', priority: 1 },
        { key: 'about', title: 'About', icon: 'fas fa-info-circle', priority: 2 },
        { key: 'education', title: 'Education', icon: 'fas fa-graduation-cap', priority: 2 },
        { key: 'experience', title: 'Experience', icon: 'fas fa-briefcase', priority: 2 },
        { key: 'skills', title: 'Skills', icon: 'fas fa-tools', priority: 3 },
        { key: 'projects', title: 'Projects', icon: 'fas fa-project-diagram', priority: 3 },
        { key: 'certifications', title: 'Certifications', icon: 'fas fa-certificate', priority: 3 },
        { key: 'awardsection', title: 'Awards', icon: 'fas fa-trophy', priority: 3 },
        { key: 'links', title: 'Links', icon: 'fas fa-link', priority: 3 }
    ];

    // Sort sections by priority
    sections.sort((a, b) => a.priority - b.priority);

    sections.forEach(section => {
        const value = data[section.key];
        if (value && (typeof value === 'string' ? value.trim() : value.length > 0)) {
            const card = createResultCard(section.title, section.icon, value);
            resultsGrid.appendChild(card);
        }
    });

    // If no results found
    if (resultsGrid.children.length === 0) {
        const noResultsCard = createResultCard('No Data Found', 'fas fa-exclamation-triangle', 'No information could be extracted from the resume.');
        resultsGrid.appendChild(noResultsCard);
    }
}

function createResultCard(title, icon, content) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    let formattedContent = content;
    
    // Handle different content types
    if (Array.isArray(content)) {
        formattedContent = content.map(item => `<li>${item}</li>`).join('');
        formattedContent = `<ul>${formattedContent}</ul>`;
    } else if (typeof content === 'string') {
        // Format text with line breaks
        formattedContent = content.replace(/\n/g, '<br>');
    }
    
    card.innerHTML = `
        <h3><i class="${icon}"></i>${title}</h3>
        <div class="result-content">
            ${formattedContent}
        </div>
    `;
    
    return card;
}

function showError(message) {
    loadingSection.style.display = 'none';
    resultsSection.style.display = 'none';
    errorSection.style.display = 'block';
    errorText.textContent = message;
}

function resetForm() {
    // Reset file input
    fileInput.value = '';
    
    // Show upload section
    uploadSection.style.display = 'block';
    loadingSection.style.display = 'none';
    resultsSection.style.display = 'none';
    errorSection.style.display = 'none';
    
    // Clear results
    resultsGrid.innerHTML = '';
}

// Add some utility functions for better UX
function showNotification(message, type = 'info') {
    // Create a simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 