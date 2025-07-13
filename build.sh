#!/usr/bin/env bash
# Build script for Render deployment

# Install Python dependencies
pip install -r requirements.txt

# Download spacy language model
python -m spacy download en_core_web_sm

# Create necessary directories
mkdir -p files
mkdir -p images

echo "Build completed successfully!" 