#!/usr/bin/env bash
# Build script for Render deployment

# Install Python dependencies with faster pip
pip install --no-cache-dir --upgrade pip
pip install --no-cache-dir -r requirements.txt

# Download spacy language model (only if not already present)
python -c "import spacy; spacy.load('en_core_web_sm')" 2>/dev/null || python -m spacy download en_core_web_sm

# Create necessary directories
mkdir -p files
mkdir -p images

echo "Build completed successfully!" 