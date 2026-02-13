# SurakshaAI - System Design Document

## 1. System Architecture Overview

SurakshaAI follows a three-tier architecture consisting of a React-based frontend, Python backend API, and AI/ML engine for threat detection. The system is designed for scalability, maintainability, and optimal performance on low-bandwidth networks.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │         React Web Application (PWA)                 │    │
│  │  - User Interface Components                        │    │
│  │  - State Management (Redux/Context)                 │    │
│  │  - Offline Support (Service Workers)                │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS/REST API
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Python Backend (FastAPI/Flask)              │    │
│  │  - API Gateway & Request Routing                    │    │
│  │  - Authentication & Authorization                   │    │
│  │  - Business Logic Layer                             │    │
│  │  - Caching Layer (Redis)                            │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      AI/ML Engine Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ SMS Scam     │  │ URL Phishing │  │ Fake Job     │     │
│  │ Detector     │  │ Detector     │  │ Detector     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────────────────────────────────────────┐     │
│  │      NLP Pipeline & Feature Extraction            │     │
│  └──────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ PostgreSQL   │  │ MongoDB      │  │ Threat DB    │     │
│  │ (User Data)  │  │ (Logs/Cache) │  │ (Patterns)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```



## 2. Frontend Architecture (React)

### 2.1 Component Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── LanguageSelector.jsx
│   │   └── AlertBanner.jsx
│   ├── scanner/
│   │   ├── SMSScanner.jsx
│   │   ├── URLScanner.jsx
│   │   ├── JobScanner.jsx
│   │   └── ScanResult.jsx
│   ├── dashboard/
│   │   ├── ThreatHistory.jsx
│   │   ├── Statistics.jsx
│   │   └── RecentScans.jsx
│   └── education/
│       ├── TipsCarousel.jsx
│       └── ScamExamples.jsx
├── services/
│   ├── api.js
│   ├── scanner.js
│   └── i18n.js
├── store/
│   ├── actions/
│   ├── reducers/
│   └── store.js
├── utils/
│   ├── validators.js
│   ├── formatters.js
│   └── offline.js
└── locales/
    ├── en.json
    └── kn.json
```

### 2.2 Key Frontend Technologies

- **React 18+**: Component-based UI development
- **Redux Toolkit**: State management for scan results and user preferences
- **React Router**: Client-side routing
- **Axios**: HTTP client with interceptors for API calls
- **i18next**: Internationalization framework for English/Kannada
- **Material-UI / Chakra UI**: Accessible component library
- **Service Workers**: Offline functionality and caching
- **IndexedDB**: Local storage for offline threat database

### 2.3 Progressive Web App (PWA) Features

- Installable on mobile devices
- Offline-first architecture with cached threat patterns
- Background sync for threat database updates
- Push notifications for critical security alerts
- Responsive design optimized for mobile screens



## 3. Backend Architecture (Python)

### 3.1 Backend Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── scan.py
│   │   │   │   ├── history.py
│   │   │   │   ├── feedback.py
│   │   │   │   └── education.py
│   │   │   └── router.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── logging.py
│   ├── models/
│   │   ├── user.py
│   │   ├── scan_result.py
│   │   └── threat.py
│   ├── services/
│   │   ├── sms_detector.py
│   │   ├── url_detector.py
│   │   ├── job_detector.py
│   │   └── translation.py
│   ├── ml/
│   │   ├── models/
│   │   │   ├── sms_classifier.pkl
│   │   │   ├── url_classifier.pkl
│   │   │   └── job_classifier.pkl
│   │   ├── preprocessor.py
│   │   ├── feature_extractor.py
│   │   └── inference.py
│   ├── db/
│   │   ├── database.py
│   │   ├── repositories/
│   │   └── migrations/
│   └── utils/
│       ├── validators.py
│       ├── text_processing.py
│       └── url_analysis.py
├── tests/
├── requirements.txt
└── main.py
```

### 3.2 Backend Technologies

- **FastAPI**: Modern, high-performance web framework
- **Pydantic**: Data validation and settings management
- **SQLAlchemy**: ORM for PostgreSQL
- **Motor**: Async MongoDB driver
- **Redis**: Caching and rate limiting
- **Celery**: Asynchronous task queue for batch processing
- **JWT**: Token-based authentication
- **Uvicorn**: ASGI server

### 3.3 API Endpoints

#### Scan Endpoints
- `POST /api/v1/scan/sms` - Analyze SMS message
- `POST /api/v1/scan/url` - Check URL for phishing
- `POST /api/v1/scan/job` - Validate job posting
- `POST /api/v1/scan/batch` - Batch analysis

#### User Endpoints
- `GET /api/v1/history` - Retrieve scan history
- `POST /api/v1/feedback` - Submit user feedback
- `GET /api/v1/stats` - User statistics

#### Education Endpoints
- `GET /api/v1/tips` - Security tips
- `GET /api/v1/examples` - Scam examples



## 4. AI/ML Engine Architecture

### 4.1 NLP Pipeline

```
Input Text → Preprocessing → Feature Extraction → Classification → Risk Scoring → Output
```

### 4.2 Core AI Components

#### 4.2.1 SMS Scam Detection

**Model Architecture:**
- **Primary Model**: Fine-tuned BERT/DistilBERT for text classification
- **Fallback Model**: TF-IDF + Random Forest for lightweight processing
- **Ensemble**: Combines multiple models for improved accuracy

**Features Extracted:**
- Urgency indicators (keywords: "urgent", "immediately", "expire")
- Financial terms (money, bank, account, payment)
- Phone numbers and suspicious patterns
- URL presence and characteristics
- Sender information analysis
- Grammar and spelling anomalies
- Emotional manipulation indicators

**Training Data:**
- Labeled dataset of 50,000+ SMS messages
- Indian-specific scam patterns
- Multilingual corpus (English + Kannada)
- Regular updates from user reports

#### 4.2.2 URL Phishing Detection

**Detection Methods:**

1. **Lexical Analysis**
   - Domain age verification
   - URL length and complexity
   - Presence of IP addresses
   - Suspicious TLD usage
   - Typosquatting detection (Levenshtein distance)
   - Homograph attack detection

2. **Blacklist Checking**
   - Google Safe Browsing API
   - PhishTank database
   - Custom threat intelligence feeds
   - Real-time blocklist updates

3. **ML-Based Classification**
   - Random Forest classifier on URL features
   - Features: domain entropy, subdomain count, special characters
   - SSL certificate validation
   - WHOIS data analysis

4. **Content Analysis** (when accessible)
   - HTML structure analysis
   - Form field detection
   - Brand impersonation detection
   - Visual similarity to legitimate sites

#### 4.2.3 Fake Job Detection

**Model**: Gradient Boosting Classifier (XGBoost/LightGBM)

**Features:**
- Salary-to-experience ratio anomalies
- Upfront payment requests
- Vague job descriptions
- Company verification status
- Contact information legitimacy
- Job posting platform reputation
- Language quality indicators
- Unrealistic promises detection

**Rule-Based Filters:**
- Red flag keywords: "registration fee", "training charges", "refundable deposit"
- Missing company details
- Personal email domains (@gmail, @yahoo)
- Excessive urgency in hiring



### 4.3 NLP Libraries and Frameworks

- **Transformers (Hugging Face)**: Pre-trained language models
- **spaCy**: NLP pipeline for text processing
- **NLTK**: Text preprocessing and tokenization
- **scikit-learn**: Traditional ML algorithms
- **TensorFlow/PyTorch**: Deep learning framework
- **IndicNLP**: Specialized library for Indian languages
- **Polyglot**: Multilingual NLP support

### 4.4 Model Training Pipeline

```
Data Collection → Data Cleaning → Labeling → 
Feature Engineering → Model Training → Validation → 
Hyperparameter Tuning → Testing → Deployment → Monitoring
```

**Continuous Learning:**
- Weekly model retraining with new data
- A/B testing for model improvements
- User feedback integration
- Performance monitoring and drift detection



## 5. Data Flow Architecture

### 5.1 SMS Scan Flow

```
1. User Input (Frontend)
   ↓
2. API Request to /api/v1/scan/sms
   ↓
3. Request Validation & Rate Limiting
   ↓
4. Check Cache (Redis) for similar messages
   ↓ (Cache Miss)
5. Preprocessing Pipeline
   - Text normalization
   - Language detection
   - Tokenization
   ↓
6. Feature Extraction
   - NLP features
   - Pattern matching
   - Entity extraction
   ↓
7. ML Model Inference
   - Primary model prediction
   - Ensemble voting
   - Confidence scoring
   ↓
8. Risk Assessment
   - Calculate threat score (0-100)
   - Categorize risk level (Low/Medium/High)
   - Generate explanation
   ↓
9. Translation (if needed)
   - Translate warning to user's language
   ↓
10. Store Result (Database + Cache)
    ↓
11. Return Response to Frontend
    ↓
12. Display Warning with Recommendations
```

### 5.2 URL Scan Flow

```
1. User submits URL
   ↓
2. Quick validation (format, protocol)
   ↓
3. Check local blacklist cache
   ↓ (Not found)
4. Parallel Processing:
   ├─→ Lexical Analysis
   ├─→ External API checks (Safe Browsing)
   ├─→ WHOIS lookup
   └─→ ML model prediction
   ↓
5. Aggregate results
   ↓
6. Risk scoring and categorization
   ↓
7. Generate multilingual warning
   ↓
8. Return result with safety recommendations
```

### 5.3 Offline Data Flow

```
1. Service Worker intercepts request
   ↓
2. Check IndexedDB for cached threat patterns
   ↓
3. Perform local analysis with lightweight model
   ↓
4. Return preliminary result
   ↓
5. Queue for server verification when online
   ↓
6. Sync and update result if different
```



## 6. Multilingual Support Design

### 6.1 Language Architecture

**Supported Languages:**
- English (en)
- Kannada (kn)

**Future Support:**
- Hindi (hi)
- Tamil (ta)
- Telugu (te)

### 6.2 Implementation Strategy

#### Frontend Internationalization

```javascript
// i18n configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('./locales/en.json') },
      kn: { translation: require('./locales/kn.json') }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });
```

**Translation Files Structure:**
```json
{
  "scanner": {
    "title": "Scan Message",
    "placeholder": "Enter SMS or URL to scan",
    "button": "Analyze"
  },
  "warnings": {
    "high": "High Risk - Do Not Proceed",
    "medium": "Caution Required",
    "low": "Appears Safe"
  },
  "explanations": {
    "urgency": "This message uses urgent language to pressure you",
    "financial": "Requests for money or financial information detected"
  }
}
```

#### Backend Translation Service

**Approach:**
- Pre-translated warning templates for common scenarios
- Dynamic translation for user-specific content
- Translation API integration (Google Translate API / IndicTrans)

**Translation Service:**
```python
class TranslationService:
    def __init__(self):
        self.templates = self.load_templates()
        self.translator = IndicTranslator()
    
    def translate_warning(self, warning_key, language, params=None):
        template = self.templates[language][warning_key]
        return template.format(**params) if params else template
    
    def translate_dynamic(self, text, target_lang):
        return self.translator.translate(text, target_lang)
```

### 6.3 Kannada Language Processing

**Challenges:**
- Script: Kannada uses Kannada script (Unicode range: U+0C80–U+0CFF)
- Code-switching: Mixed English-Kannada messages
- Transliteration: Roman script Kannada (Kanglish)

**Solutions:**
- **IndicNLP Library**: Tokenization and normalization for Kannada
- **Transliteration**: Convert Roman script to Kannada script
- **Bilingual Models**: Train on mixed-language corpus
- **Script Detection**: Automatic detection of Kannada vs English

**Preprocessing Pipeline:**
```python
def preprocess_kannada(text):
    # Normalize Unicode
    text = unicodedata.normalize('NFC', text)
    
    # Detect and separate scripts
    scripts = detect_scripts(text)
    
    # Transliterate if needed
    if 'roman' in scripts:
        text = transliterate_to_kannada(text)
    
    # Tokenize with Kannada-aware tokenizer
    tokens = kannada_tokenizer(text)
    
    return tokens
```

### 6.4 Language Detection

**Auto-detection:**
- Use `langdetect` or `fastText` for language identification
- Store user preference for future sessions
- Allow manual override



## 7. Security and Privacy Considerations

### 7.1 Data Privacy Principles

**Privacy by Design:**
- Minimize data collection to essential information only
- Process data locally when possible
- Encrypt all data in transit and at rest
- Implement data retention policies
- Provide user control over data

### 7.2 Security Architecture

#### 7.2.1 Authentication & Authorization

```
┌─────────────────────────────────────────┐
│  User Authentication Flow               │
├─────────────────────────────────────────┤
│  1. User Login (Phone/Email + OTP)      │
│  2. Generate JWT Token                  │
│  3. Store in HttpOnly Cookie            │
│  4. Refresh Token Rotation              │
│  5. Session Management                  │
└─────────────────────────────────────────┘
```

**Implementation:**
- JWT tokens with short expiration (15 minutes)
- Refresh tokens stored securely
- Rate limiting on authentication endpoints
- Multi-factor authentication (optional)

#### 7.2.2 Data Encryption

**In Transit:**
- TLS 1.3 for all API communications
- Certificate pinning in mobile app
- HTTPS enforcement

**At Rest:**
- AES-256 encryption for sensitive data
- Database-level encryption (PostgreSQL pgcrypto)
- Encrypted backups

**Field-Level Encryption:**
```python
from cryptography.fernet import Fernet

class DataEncryption:
    def __init__(self, key):
        self.cipher = Fernet(key)
    
    def encrypt_message(self, message):
        return self.cipher.encrypt(message.encode())
    
    def decrypt_message(self, encrypted_message):
        return self.cipher.decrypt(encrypted_message).decode()
```

### 7.3 Privacy-Preserving Analysis

#### 7.3.1 Local Processing

**Client-Side Analysis:**
- Lightweight ML models run in browser (TensorFlow.js)
- Basic pattern matching without server communication
- Offline threat detection using cached patterns

**Benefits:**
- No message content sent to server for basic scans
- Faster response time
- Works without internet connection

#### 7.3.2 Anonymization

**Data Anonymization Pipeline:**
```python
def anonymize_message(message):
    # Remove phone numbers
    message = re.sub(r'\d{10}', '[PHONE]', message)
    
    # Remove email addresses
    message = re.sub(r'\S+@\S+', '[EMAIL]', message)
    
    # Remove names (using NER)
    entities = ner_model.extract_entities(message)
    for entity in entities:
        if entity.type == 'PERSON':
            message = message.replace(entity.text, '[NAME]')
    
    # Remove account numbers
    message = re.sub(r'\d{9,18}', '[ACCOUNT]', message)
    
    return message
```

**Storage Policy:**
- Store only anonymized message hashes for duplicate detection
- Original message content not persisted
- Scan results stored with minimal metadata
- Automatic deletion after 90 days

### 7.4 Secure API Design

#### 7.4.1 Input Validation

```python
from pydantic import BaseModel, validator

class SMSScanRequest(BaseModel):
    message: str
    language: str = 'en'
    
    @validator('message')
    def validate_message(cls, v):
        if len(v) > 1000:
            raise ValueError('Message too long')
        if not v.strip():
            raise ValueError('Message cannot be empty')
        return v
    
    @validator('language')
    def validate_language(cls, v):
        if v not in ['en', 'kn']:
            raise ValueError('Unsupported language')
        return v
```

#### 7.4.2 Rate Limiting

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/v1/scan/sms")
@limiter.limit("10/minute")
async def scan_sms(request: SMSScanRequest):
    # Process request
    pass
```

**Rate Limits:**
- 10 scans per minute per user
- 100 scans per hour per user
- 1000 scans per day per IP address

#### 7.4.3 CORS Configuration

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://surakshaai.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

### 7.5 Compliance

**Regulatory Compliance:**
- **IT Act 2000**: Compliance with Indian cybersecurity laws
- **DPDP Act 2023**: Data protection and privacy regulations
- **TRAI Guidelines**: SMS analysis permissions
- **GDPR**: For international users

**User Consent:**
- Clear privacy policy
- Explicit consent for data processing
- Opt-in for data sharing
- Right to data deletion (RTBF)

### 7.6 Security Monitoring

**Logging and Monitoring:**
- Centralized logging (ELK Stack)
- Security event monitoring
- Anomaly detection
- Regular security audits

**Incident Response:**
- Automated threat detection
- Alert system for suspicious activities
- Incident response playbook
- Regular security drills



## 8. Database Design

### 8.1 PostgreSQL Schema (Relational Data)

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(15) UNIQUE,
    email VARCHAR(255),
    preferred_language VARCHAR(5) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Scan results table
CREATE TABLE scan_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    scan_type VARCHAR(20) NOT NULL, -- 'sms', 'url', 'job'
    content_hash VARCHAR(64) NOT NULL, -- SHA-256 hash
    risk_level VARCHAR(10) NOT NULL, -- 'low', 'medium', 'high'
    risk_score DECIMAL(5,2),
    threat_categories TEXT[], -- Array of detected threat types
    scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_scans (user_id, scanned_at),
    INDEX idx_content_hash (content_hash)
);

-- User feedback table
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_result_id UUID REFERENCES scan_results(id),
    user_id UUID REFERENCES users(id),
    feedback_type VARCHAR(20), -- 'false_positive', 'false_negative', 'correct'
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Threat patterns table
CREATE TABLE threat_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_type VARCHAR(20),
    pattern_text TEXT,
    regex_pattern TEXT,
    severity VARCHAR(10),
    language VARCHAR(5),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 8.2 MongoDB Schema (Logs and Cache)

```javascript
// Scan logs collection
{
  _id: ObjectId,
  userId: String,
  scanType: String,
  timestamp: ISODate,
  requestMetadata: {
    ipAddress: String,
    userAgent: String,
    language: String
  },
  processingTime: Number, // milliseconds
  modelVersion: String,
  features: Object, // Extracted features
  predictions: {
    model1: { score: Number, label: String },
    model2: { score: Number, label: String },
    ensemble: { score: Number, label: String }
  }
}

// Threat intelligence collection
{
  _id: ObjectId,
  type: String, // 'url', 'phone', 'keyword'
  value: String,
  threatLevel: String,
  source: String, // 'user_report', 'external_api', 'ml_detection'
  reportCount: Number,
  firstSeen: ISODate,
  lastSeen: ISODate,
  metadata: Object
}
```

### 8.3 Redis Cache Structure

```
# URL blacklist cache
url:blacklist:{url_hash} -> { risk_level, expiry }

# Scan result cache (1 hour TTL)
scan:result:{content_hash} -> { risk_score, risk_level, explanation }

# Rate limiting
ratelimit:user:{user_id} -> scan_count (TTL: 1 minute)
ratelimit:ip:{ip_address} -> scan_count (TTL: 1 hour)

# Session management
session:{session_id} -> { user_id, created_at, last_activity }
```



## 9. Deployment Architecture

### 9.1 Infrastructure Overview

```
┌─────────────────────────────────────────────────────────┐
│                    CDN (Cloudflare)                      │
│              Static Assets & DDoS Protection             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Load Balancer (Nginx/HAProxy)               │
│                   SSL Termination                        │
└─────────────────────────────────────────────────────────┘
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                     ↓
┌──────────────────┐              ┌──────────────────┐
│  Web Server 1    │              │  Web Server 2    │
│  (React App)     │              │  (React App)     │
└──────────────────┘              └──────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              API Gateway (Kong/AWS API Gateway)          │
└─────────────────────────────────────────────────────────┘
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                     ↓
┌──────────────────┐              ┌──────────────────┐
│  API Server 1    │              │  API Server 2    │
│  (FastAPI)       │              │  (FastAPI)       │
└──────────────────┘              └──────────────────┘
                          ↓
        ┌─────────────────┴─────────────────┬──────────────┐
        ↓                 ↓                  ↓              ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ PostgreSQL   │  │   MongoDB    │  │    Redis     │  │  ML Models   │
│  (Primary)   │  │   (Logs)     │  │   (Cache)    │  │  (Storage)   │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

### 9.2 Containerization (Docker)

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```dockerfile
# Backend Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 9.3 Docker Compose (Development)

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:8000

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - mongodb
      - redis
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/surakshaai
      - MONGODB_URL=mongodb://mongodb:27017/surakshaai
      - REDIS_URL=redis://redis:6379

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=surakshaai
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  mongodb:
    image: mongo:6
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  mongo_data:
  redis_data:
```

### 9.4 Cloud Deployment (AWS/GCP)

**Recommended Stack:**
- **Compute**: AWS ECS/Fargate or GCP Cloud Run
- **Database**: AWS RDS (PostgreSQL) or GCP Cloud SQL
- **NoSQL**: MongoDB Atlas
- **Cache**: AWS ElastiCache (Redis) or GCP Memorystore
- **Storage**: AWS S3 or GCP Cloud Storage (for ML models)
- **CDN**: CloudFront or Cloud CDN
- **Monitoring**: CloudWatch or Cloud Monitoring



## 10. Performance Optimization

### 10.1 Frontend Optimization

**Code Splitting:**
```javascript
// Lazy load components
const Dashboard = lazy(() => import('./components/Dashboard'));
const Scanner = lazy(() => import('./components/Scanner'));

// Route-based code splitting
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/scan" element={<Scanner />} />
  </Routes>
</Suspense>
```

**Caching Strategy:**
- Service Worker caching for static assets
- IndexedDB for threat patterns (updated daily)
- LocalStorage for user preferences
- Cache-first strategy for offline support

**Bundle Optimization:**
- Tree shaking to remove unused code
- Minification and compression (Gzip/Brotli)
- Image optimization (WebP format)
- Lazy loading of images and components

### 10.2 Backend Optimization

**Caching Layers:**
```python
# Multi-level caching
async def get_scan_result(content_hash):
    # L1: In-memory cache
    if content_hash in memory_cache:
        return memory_cache[content_hash]
    
    # L2: Redis cache
    cached = await redis.get(f"scan:{content_hash}")
    if cached:
        memory_cache[content_hash] = cached
        return cached
    
    # L3: Database
    result = await db.get_scan_result(content_hash)
    if result:
        await redis.setex(f"scan:{content_hash}", 3600, result)
        memory_cache[content_hash] = result
    
    return result
```

**Database Optimization:**
- Connection pooling (SQLAlchemy pool_size=20)
- Query optimization with proper indexes
- Read replicas for scaling reads
- Batch processing for bulk operations

**Async Processing:**
```python
# Celery task for heavy processing
@celery.app.task
def retrain_model(feedback_data):
    # Long-running model training
    model = train_model(feedback_data)
    save_model(model)
    return {"status": "success"}

# Non-blocking API endpoint
@app.post("/api/v1/feedback")
async def submit_feedback(feedback: Feedback):
    # Store feedback immediately
    await db.save_feedback(feedback)
    
    # Queue retraining task
    retrain_model.delay(feedback.dict())
    
    return {"status": "accepted"}
```

### 10.3 ML Model Optimization

**Model Compression:**
- Quantization (FP32 → INT8) for 4x size reduction
- Pruning to remove unnecessary weights
- Knowledge distillation (BERT → DistilBERT)

**Inference Optimization:**
- Batch prediction for multiple requests
- Model caching in memory
- ONNX Runtime for faster inference
- GPU acceleration for heavy models

**Edge Deployment:**
- TensorFlow.js models for browser execution
- Lightweight models (<5MB) for offline use
- Progressive enhancement (offline → online)



## 11. Monitoring and Observability

### 11.1 Logging Strategy

**Structured Logging:**
```python
import structlog

logger = structlog.get_logger()

logger.info(
    "scan_completed",
    user_id=user_id,
    scan_type="sms",
    risk_level="high",
    processing_time_ms=245,
    model_version="v2.1"
)
```

**Log Levels:**
- ERROR: System failures, exceptions
- WARNING: High-risk detections, rate limit hits
- INFO: Scan requests, user actions
- DEBUG: Detailed processing steps (dev only)

### 11.2 Metrics Collection

**Key Metrics:**
- Request rate (requests/second)
- Response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- Model accuracy (precision, recall, F1)
- Cache hit rate
- Database query time

**Prometheus Metrics:**
```python
from prometheus_client import Counter, Histogram

scan_requests = Counter('scan_requests_total', 'Total scan requests', ['scan_type'])
scan_duration = Histogram('scan_duration_seconds', 'Scan processing time')
threat_detections = Counter('threats_detected_total', 'Threats detected', ['risk_level'])
```

### 11.3 Alerting

**Alert Conditions:**
- Error rate > 5% for 5 minutes
- Response time p95 > 3 seconds
- Model accuracy drops below 85%
- Database connection failures
- High-risk threat detection spike

### 11.4 Monitoring Stack

- **Metrics**: Prometheus + Grafana
- **Logs**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **APM**: New Relic or Datadog
- **Uptime**: UptimeRobot or Pingdom
- **Error Tracking**: Sentry



## 12. Testing Strategy

### 12.1 Frontend Testing

**Unit Tests (Jest + React Testing Library):**
```javascript
describe('SMSScanner', () => {
  test('displays high risk warning for scam message', async () => {
    render(<SMSScanner />);
    
    const input = screen.getByPlaceholderText('Enter SMS to scan');
    fireEvent.change(input, { 
      value: 'URGENT: Your account will be blocked. Click here immediately' 
    });
    
    const button = screen.getByText('Analyze');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/High Risk/i)).toBeInTheDocument();
    });
  });
});
```

**Integration Tests:**
- API integration tests
- Component interaction tests
- Routing tests

**E2E Tests (Cypress/Playwright):**
- Complete user flows
- Cross-browser testing
- Mobile responsiveness

### 12.2 Backend Testing

**Unit Tests (pytest):**
```python
def test_sms_scam_detection():
    detector = SMSDetector()
    message = "Congratulations! You won 10 lakh rupees. Send 500 Rs processing fee."
    
    result = detector.analyze(message)
    
    assert result.risk_level == "high"
    assert "financial" in result.threat_categories
    assert result.risk_score > 80
```

**Integration Tests:**
- Database operations
- External API calls
- Cache interactions

**Load Tests (Locust):**
```python
from locust import HttpUser, task, between

class SurakshaAIUser(HttpUser):
    wait_time = between(1, 3)
    
    @task
    def scan_sms(self):
        self.client.post("/api/v1/scan/sms", json={
            "message": "Test scam message",
            "language": "en"
        })
```

### 12.3 ML Model Testing

**Model Evaluation:**
- Accuracy, Precision, Recall, F1-Score
- Confusion matrix analysis
- Cross-validation (k-fold)
- A/B testing in production

**Adversarial Testing:**
- Test with obfuscated scam messages
- Typo variations
- Mixed language inputs
- Edge cases



## 13. Scalability Considerations

### 13.1 Horizontal Scaling

**Stateless Architecture:**
- API servers are stateless (session in Redis)
- Load balancer distributes requests
- Auto-scaling based on CPU/memory metrics

**Database Scaling:**
- Read replicas for PostgreSQL
- Sharding for MongoDB (by user_id)
- Redis cluster for distributed caching

### 13.2 Vertical Scaling

**Resource Optimization:**
- Increase server resources during peak hours
- GPU instances for ML inference
- Memory optimization for model loading

### 13.3 Microservices Evolution

**Future Architecture:**
```
API Gateway
    ├── User Service
    ├── SMS Detection Service
    ├── URL Detection Service
    ├── Job Detection Service
    ├── Translation Service
    └── Analytics Service
```

**Benefits:**
- Independent scaling of services
- Technology flexibility per service
- Fault isolation
- Easier maintenance



## 14. Development Workflow

### 14.1 Version Control

**Git Branching Strategy:**
```
main (production)
  ├── develop (staging)
  │   ├── feature/sms-detection
  │   ├── feature/kannada-support
  │   └── bugfix/url-validation
  └── hotfix/security-patch
```

### 14.2 CI/CD Pipeline

```yaml
# GitHub Actions / GitLab CI
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm test
          pytest
      - name: Lint code
        run: |
          npm run lint
          flake8 .
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker images
        run: docker-compose build
      - name: Push to registry
        run: docker push surakshaai/app:latest
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: kubectl apply -f k8s/
```

### 14.3 Code Quality

**Linting:**
- ESLint for JavaScript/React
- Pylint/Flake8 for Python
- Prettier for code formatting

**Pre-commit Hooks:**
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
  - repo: https://github.com/psf/black
    hooks:
      - id: black
```



## 15. Technology Stack Summary

### Frontend
- **Framework**: React 18+
- **State Management**: Redux Toolkit / Zustand
- **Routing**: React Router v6
- **UI Library**: Material-UI / Chakra UI
- **HTTP Client**: Axios
- **i18n**: i18next
- **PWA**: Workbox
- **Testing**: Jest, React Testing Library, Cypress

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Authentication**: JWT (PyJWT)
- **Task Queue**: Celery
- **Testing**: pytest, Locust

### AI/ML
- **Deep Learning**: TensorFlow / PyTorch
- **NLP**: Transformers (Hugging Face), spaCy
- **Traditional ML**: scikit-learn, XGBoost
- **Indian Languages**: IndicNLP
- **Model Serving**: ONNX Runtime

### Databases
- **Relational**: PostgreSQL 15
- **NoSQL**: MongoDB 6
- **Cache**: Redis 7

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose / Kubernetes
- **CI/CD**: GitHub Actions / GitLab CI
- **Monitoring**: Prometheus, Grafana, ELK Stack
- **Cloud**: AWS / GCP

### External Services
- **URL Verification**: Google Safe Browsing API
- **Translation**: Google Translate API / IndicTrans
- **SMS Gateway**: Twilio (for notifications)
- **CDN**: Cloudflare

---

## 16. Implementation Phases

### Phase 1: MVP (Months 1-3)
- Basic SMS scam detection (English only)
- Simple URL checking
- React frontend with core features
- Python backend with FastAPI
- PostgreSQL database
- Basic authentication

### Phase 2: Enhanced Detection (Months 4-5)
- Kannada language support
- Improved ML models
- Fake job detection
- User feedback system
- Offline support (PWA)

### Phase 3: Scale & Optimize (Month 6)
- Performance optimization
- Caching implementation
- Load testing and scaling
- Security hardening
- Production deployment

### Phase 4: Future Enhancements (Post-MVP)
- Additional languages
- Mobile app (React Native)
- Browser extension
- Community reporting
- Advanced analytics

---

## Conclusion

This design document provides a comprehensive blueprint for building SurakshaAI as a scalable, secure, and user-friendly digital safety platform. The architecture emphasizes privacy, performance, and accessibility while leveraging modern web technologies and AI/ML capabilities to protect vulnerable users from digital threats.

The modular design allows for incremental development and future enhancements while maintaining system stability and user trust.
