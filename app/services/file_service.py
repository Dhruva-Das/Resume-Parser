import os
import shutil
from pdf2image import convert_from_path
# import pytesseract  # Commented out - requires system dependencies
from PIL import Image
import docx2txt
import re
import PyPDF2

class FileService:
    @staticmethod
    def pdf_to_jpg(pdf_path, output_folder):
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)

        try:
            images = convert_from_path(pdf_path, dpi=300)
        except Exception as e:
            return []
        image_files = []
        for i, image in enumerate(images):
            image_file = f'{output_folder}/page_{i + 1}.jpg'
            image.save(image_file, 'JPEG')
            image_files.append(image_file)
        return image_files

    @staticmethod
    def extract_text_from_pdf(pdf_path):
        """Extract text from PDF using PyPDF2 instead of OCR"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
                return text
        except Exception as e:
            print(f"Error extracting text from PDF: {e}")
            return ""

    @staticmethod
    def extract_text_from_images(image_files):
        """Simplified text extraction - returns placeholder for now"""
        # Note: OCR functionality is disabled for Render deployment
        # You can re-enable this by uncommenting pytesseract and installing system dependencies
        return "Text extraction from images is currently disabled for deployment compatibility."

    @staticmethod
    def extract_text_from_docx(docx_path):
        return docx2txt.process(docx_path)

    @staticmethod
    def save_uploaded_file(file, destination):
        with open(destination, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
