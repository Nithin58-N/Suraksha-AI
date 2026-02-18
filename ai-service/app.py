from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from detector import ScamDetector
from ocr_processor import OCRProcessor

app = Flask(__name__)
CORS(app)

# Initialize detectors
detector = ScamDetector()
ocr_processor = OCRProcessor()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'SurakshaAI AI Service'})

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        text = data.get('text', '')
        scan_type = data.get('type', 'text')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        result = detector.analyze(text, scan_type)
        return jsonify(result)
    
    except Exception as e:
        print(f"Analysis error: {str(e)}")
        return jsonify({
            'error': 'Analysis failed',
            'riskLevel': 'error',
            'message': str(e)
        }), 500

@app.route('/analyze/image', methods=['POST'])
def analyze_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        image_file = request.files['image']
        
        # Extract text from image using OCR
        extracted_text = ocr_processor.extract_text(image_file)
        
        if not extracted_text.strip():
            return jsonify({
                'riskLevel': 'error',
                'message': 'No text found in image',
                'extractedText': ''
            })
        
        # Analyze extracted text
        result = detector.analyze(extracted_text, 'text')
        result['extractedText'] = extracted_text
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Image analysis error: {str(e)}")
        return jsonify({
            'error': 'Image analysis failed',
            'riskLevel': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    print("✓ Starting AI Service on http://localhost:8000")
    app.run(host='0.0.0.0', port=8000, debug=True)
