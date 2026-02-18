import re
from typing import Dict, List

class ScamDetector:
    def __init__(self):
        # Scam indicators
        self.urgency_keywords = [
            'urgent', 'immediately', 'expire', 'limited time', 'act now',
            'hurry', 'last chance', 'expires today', 'urgent action required'
        ]
        
        self.financial_keywords = [
            'bank account', 'credit card', 'password', 'pin', 'otp', 'cvv',
            'account number', 'debit card', 'net banking', 'payment', 'transfer',
            'refund', 'prize', 'lottery', 'won', 'claim', 'reward'
        ]
        
        self.threat_keywords = [
            'blocked', 'suspended', 'deactivated', 'legal action', 'arrest',
            'police', 'court', 'fine', 'penalty', 'verify', 'confirm'
        ]
        
        self.job_scam_keywords = [
            'registration fee', 'training charges', 'deposit', 'upfront payment',
            'work from home', 'earn money fast', 'no experience required',
            'guaranteed income', 'easy money'
        ]
        
        # Phishing URL patterns
        self.suspicious_tlds = ['.tk', '.ml', '.ga', '.cf', '.gq']
        self.suspicious_patterns = [
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}',  # IP address
            r'[a-z0-9-]{20,}',  # Very long subdomain
            r'@',  # @ symbol in URL
        ]
    
    def analyze(self, text: str, scan_type: str) -> Dict:
        text_lower = text.lower()
        
        # Calculate risk score
        score = 0
        threats = []
        
        # Check urgency
        urgency_count = sum(1 for keyword in self.urgency_keywords if keyword in text_lower)
        if urgency_count > 0:
            score += urgency_count * 15
            threats.append(f"Uses urgent language ({urgency_count} indicators)")
        
        # Check financial keywords
        financial_count = sum(1 for keyword in self.financial_keywords if keyword in text_lower)
        if financial_count > 0:
            score += financial_count * 20
            threats.append(f"Requests financial information ({financial_count} indicators)")
        
        # Check threats
        threat_count = sum(1 for keyword in self.threat_keywords if keyword in text_lower)
        if threat_count > 0:
            score += threat_count * 15
            threats.append(f"Contains threatening language ({threat_count} indicators)")
        
        # URL-specific checks
        if scan_type == 'url':
            url_score, url_threats = self._check_url(text)
            score += url_score
            threats.extend(url_threats)
        
        # Job-specific checks
        if scan_type == 'job':
            job_score, job_threats = self._check_job(text_lower)
            score += job_score
            threats.extend(job_threats)
        
        # Check for suspicious patterns
        if re.search(r'\d{10,}', text):  # Long number sequences
            score += 10
            threats.append("Contains suspicious number sequences")
        
        if re.search(r'http[s]?://', text_lower):
            score += 10
            threats.append("Contains URLs")
        
        # Cap score at 100
        score = min(score, 100)
        
        # Determine risk level
        if score >= 70:
            risk_level = 'dangerous'
        elif score >= 40:
            risk_level = 'suspicious'
        else:
            risk_level = 'safe'
        
        # Generate recommendations
        recommendations = self._generate_recommendations(risk_level, threats)
        
        return {
            'riskLevel': risk_level,
            'score': score,
            'threats': threats if threats else ['No immediate threats detected'],
            'recommendations': recommendations
        }
    
    def _check_url(self, url: str) -> tuple:
        score = 0
        threats = []
        url_lower = url.lower()
        
        # Check suspicious TLDs
        for tld in self.suspicious_tlds:
            if tld in url_lower:
                score += 30
                threats.append(f"Suspicious domain extension ({tld})")
                break
        
        # Check for IP address
        if re.search(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', url):
            score += 25
            threats.append("Uses IP address instead of domain name")
        
        # Check for @ symbol
        if '@' in url:
            score += 30
            threats.append("Contains @ symbol (common phishing technique)")
        
        # Check for excessive subdomains
        if url.count('.') > 3:
            score += 15
            threats.append("Excessive subdomains detected")
        
        # Check for HTTPS
        if url.startswith('http://'):
            score += 10
            threats.append("Not using secure HTTPS connection")
        
        return score, threats
    
    def _check_job(self, text: str) -> tuple:
        score = 0
        threats = []
        
        job_scam_count = sum(1 for keyword in self.job_scam_keywords if keyword in text)
        if job_scam_count > 0:
            score += job_scam_count * 25
            threats.append(f"Contains job scam indicators ({job_scam_count} found)")
        
        # Check for personal email domains
        if re.search(r'@(gmail|yahoo|hotmail|outlook)\.com', text):
            score += 15
            threats.append("Uses personal email domain (not company email)")
        
        return score, threats
    
    def _generate_recommendations(self, risk_level: str, threats: List[str]) -> List[str]:
        recommendations = []
        
        if risk_level == 'dangerous':
            recommendations.append("⚠️ DO NOT respond to this message")
            recommendations.append("⚠️ DO NOT click any links")
            recommendations.append("⚠️ DO NOT share personal or financial information")
            recommendations.append("⚠️ Block and report this sender")
        elif risk_level == 'suspicious':
            recommendations.append("⚠️ Verify sender identity through official channels")
            recommendations.append("⚠️ Do not click links - visit official website directly")
            recommendations.append("⚠️ Be cautious about sharing information")
            recommendations.append("⚠️ Contact the organization directly if unsure")
        else:
            recommendations.append("✓ Message appears safe")
            recommendations.append("✓ Still verify sender if requesting sensitive information")
            recommendations.append("✓ Be cautious with links from unknown sources")
        
        return recommendations
