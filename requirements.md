# SurakshaAI - Requirements Document

## Project Overview

SurakshaAI is an AI-powered digital safety assistant designed to protect first-time internet users in India from digital threats. The system detects and warns users about scam SMS messages, phishing URLs, and fraudulent job postings through intelligent analysis and multilingual support in English and Kannada.

The platform aims to bridge the digital literacy gap by providing accessible, real-time protection against common online scams that target vulnerable populations, particularly those new to digital services.

---

## Functional Requirements

### FR1: SMS Scam Detection
- The system shall analyze incoming SMS messages for scam indicators
- The system shall identify common scam patterns including fake lottery wins, urgent payment requests, and impersonation attempts
- The system shall extract and validate phone numbers, URLs, and financial information from messages
- The system shall provide a risk score (Low/Medium/High) for each analyzed message

### FR2: Phishing URL Detection
- The system shall scan URLs for phishing indicators before users click them
- The system shall check URLs against known phishing databases
- The system shall analyze domain age, SSL certificates, and URL structure
- The system shall detect typosquatting and homograph attacks
- The system shall provide real-time warnings before navigation to suspicious sites

### FR3: Fake Job Message Detection
- The system shall identify fraudulent job postings and recruitment messages
- The system shall detect red flags such as upfront payment requests, unrealistic salaries, and vague job descriptions
- The system shall verify company legitimacy through cross-referencing
- The system shall flag messages requesting personal financial information during recruitment

### FR4: Multilingual Support
- The system shall provide all warnings and notifications in English and Kannada
- The system shall automatically detect the user's preferred language
- The system shall allow manual language switching
- The system shall analyze messages written in both English and Kannada scripts

### FR5: User Alerts and Warnings
- The system shall display clear, actionable warnings when threats are detected
- The system shall explain why a message or URL is flagged as suspicious
- The system shall provide guidance on safe actions to take
- The system shall use simple, non-technical language appropriate for first-time users

### FR6: Reporting and Feedback
- The system shall allow users to report suspicious messages not caught by the system
- The system shall enable users to mark false positives
- The system shall collect user feedback to improve detection accuracy
- The system shall maintain a history of analyzed messages and threats detected

### FR7: Educational Content
- The system shall provide tips and guidance on recognizing digital scams
- The system shall offer contextual education when threats are detected
- The system shall include a knowledge base of common scam types

---

## Non-Functional Requirements

### NFR1: Performance
- The system shall analyze SMS messages within 2 seconds of receipt
- URL scanning shall complete within 1 second
- The system shall support concurrent analysis of multiple messages
- The application shall maintain responsive UI with load times under 3 seconds

### NFR2: Accuracy
- The system shall achieve minimum 90% accuracy in scam detection
- False positive rate shall not exceed 5%
- The system shall continuously improve through machine learning updates

### NFR3: Availability
- The system shall maintain 99% uptime
- Critical detection features shall function offline with cached threat databases
- The system shall sync with cloud services when connectivity is restored

### NFR4: Security and Privacy
- The system shall process messages locally on-device when possible
- User data shall be encrypted in transit and at rest
- The system shall not store message content longer than necessary for analysis
- The system shall comply with Indian data protection regulations
- No personal information shall be shared with third parties without explicit consent

### NFR5: Usability
- The interface shall be intuitive for users with minimal digital literacy
- The system shall use clear visual indicators (colors, icons) for threat levels
- Font sizes and UI elements shall be optimized for readability
- The system shall provide voice-based alerts as an accessibility option

### NFR6: Scalability
- The system shall support growing user base without performance degradation
- The threat database shall be updateable without app reinstallation
- The architecture shall accommodate addition of new languages and threat types

### NFR7: Compatibility
- The system shall support Android 8.0 and above
- The system shall work on devices with minimum 2GB RAM
- The system shall function on low-bandwidth networks (2G/3G)
- The system shall integrate with popular messaging apps

---

## User Requirements

### UR1: Target Users
- First-time internet users in India, particularly in rural and semi-urban areas
- Users with limited digital literacy
- Non-English speakers, specifically Kannada speakers
- Age range: 18-65 years, with focus on elderly users

### UR2: User Capabilities
- Users may have basic smartphone operation skills
- Users may not understand technical security terminology
- Users may have limited English proficiency
- Users may have intermittent internet connectivity

### UR3: User Needs
- Simple, clear warnings without technical jargon
- Visual and audio alerts for detected threats
- Guidance on what actions to take when threats are identified
- Confidence in using digital services safely
- Protection without requiring manual configuration

### UR4: User Experience Goals
- Users shall feel protected and confident while using digital services
- Users shall understand why something is flagged as dangerous
- Users shall be able to use the app without training
- Users shall receive help in their native language

---

## Constraints

### C1: Technical Constraints
- Must operate on resource-constrained mobile devices
- Must function with limited or intermittent internet connectivity
- Must integrate with Android SMS and notification systems
- Limited to Android platform initially (iOS future consideration)

### C2: Regulatory Constraints
- Must comply with Indian IT Act and data protection laws
- Must adhere to TRAI regulations for SMS analysis
- Must respect user privacy and obtain necessary permissions
- Cannot block messages without user consent

### C3: Resource Constraints
- Development timeline: 6 months for MVP
- Limited budget for cloud infrastructure
- Small development team (4-6 members)
- Dependency on open-source ML models and libraries

### C4: Language Constraints
- Initial support limited to English and Kannada
- Kannada language processing requires specialized NLP models
- Mixed-language messages (code-switching) present detection challenges

### C5: Operational Constraints
- Requires regular updates to threat databases
- Dependent on third-party APIs for URL verification
- Must balance detection accuracy with battery consumption
- Cannot guarantee 100% detection of all scam types

### C6: Business Constraints
- Free tier must be sustainable with limited monetization
- Must establish partnerships for threat intelligence
- Requires user adoption strategy for low-literacy populations
- Must build trust in communities skeptical of technology

---

## Success Criteria

- Successful detection and warning of at least 90% of known scam types
- User base of 10,000+ active users within 6 months of launch
- User satisfaction rating of 4+ stars
- Measurable reduction in scam victimization among users
- Positive feedback from community organizations and NGOs
- Successful integration with at least 3 popular messaging platforms

---

## Future Enhancements

- Support for additional Indian languages (Hindi, Tamil, Telugu)
- Voice call scam detection
- Integration with UPI payment systems for transaction verification
- Community-driven threat reporting network
- AI-powered personalized security education
- WhatsApp and social media scam detection
- Browser extension for desktop protection
