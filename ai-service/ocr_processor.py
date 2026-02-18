import pytesseract
from PIL import Image
import io

class OCRProcessor:
    def __init__(self):
        # Configure Tesseract for English and Kannada
        self.languages = 'eng+kan'
    
    def extract_text(self, image_file) -> str:
        try:
            # Read image from file
            image = Image.open(image_file.stream)
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Extract text using Tesseract OCR
            text = pytesseract.image_to_string(
                image,
                lang=self.languages,
                config='--psm 6'  # Assume uniform block of text
            )
            
            # Clean up extracted text
            text = text.strip()
            
            return text
        
        except Exception as e:
            print(f"OCR error: {str(e)}")
            raise Exception(f"Failed to extract text from image: {str(e)}")
