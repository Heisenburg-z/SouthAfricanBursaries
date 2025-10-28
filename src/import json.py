import json
from datetime import datetime, timedelta

def get_date(months_ahead):
    return (datetime.now() + timedelta(days=30*months_ahead)).isoformat() + "Z"

opportunities = []

# BURSARIES (15)
bursaries = [
    ("Sasol Engineering & Science Bursary 2026", "Engineering", "Sasol", "https://www.sasolbursaries.com", "bursaries@sasol.com", "0860 106 235", "70%", "National"),
    ("Standard Bank Bursary Fund 2026", "Multiple Fields", "Standard Bank Group", "https://www.standardbank.com/bursaries", "bursaries@standardbank.co.za", "011 636 9111", "65%", "National"),
    ("Old Mutual Imfundo Trust 2025", "Accounting", "Old Mutual", "https://www.oldmutual.co.za/bursaries", "imfundo@oldmutual.com", "0860 653 688", "65%", "National"),
    ("Funza Lushaka Programme 2026", "Education", "Department of Basic Education", "https://funzalushaka.doe.gov.za", "funzalushaka@dbe.gov.za", "0800 202 933", "60%", "National"),
    ("JSE Bursary 2026", "Finance", "JSE", "https://www.jse.co.za/bursaries", "bursaries@jse.co.za", "011 520 7000", "65%", "Johannesburg"),
    ("IDC Bursary 2026", "Engineering", "IDC", "https://www.idc.co.za/bursaries", "bursaries@idc.co.za", "011 269 3374", "60%", "National"),
    ("FNB Bursary 2026", "Finance and IT", "FNB", "https://www.fnb.co.za/careers/bursaries", "bursaries@fnb.co.za", "087 575 9405", "65%", "National"),
    ("Nedbank Bursary 2026", "Banking", "Nedbank", "https://www.nedbank.co.za/bursaries", "bursaries@nedbank.co.za", "0860 555 111", "65%", "National"),
    ("Absa Bursary 2026", "Finance", "Absa", "https://www.absa.co.za/careers/bursaries", "bursaries@absa.co.za", "0860 008 600", "65%", "National"),
    ("MTN Bursary 2026", "Engineering", "MTN", "https://www.mtn.co.za/bursaries", "bursaries@mtn.com", "083 123", "65%", "National"),
    ("Vodacom Bursary 2026", "Engineering and IT", "Vodacom", "https://www.vodacom.co.za/careers/bursaries", "bursaries@vodacom.co.za", "082 1940", "65%", "National"),
    ("Eskom Bursary 2026", "Engineering", "Eskom", "https://www.eskom.co.za/bursaries", "bursaries@eskom.co.za", "0860 037 566", "70%", "National"),
    ("Transnet Bursary 2026", "Engineering", "Transnet", "https://www.transnet.net/careers/bursaries", "bursaries@transnet.net", "0860 864 331", "65%", "National"),
    ("Anglo American Bursary 2026", "Mining", "Anglo American", "https://www.angloamerican.com/careers/bursaries", "bursaries.sa@angloamerican.com", "011 638 9111", "70%", "National"),
    ("Sasol Foundation STEM 2026", "STEM", "Sasol Foundation", "https://www.sasolbursaries.com/foundation", "foundation@sasol.com", "0860 106 235", "65%", "National")
]

for i, (title, field, provider, url, email, phone, avg, loc) in enumerate(bursaries):
    opportunities.append({
        "title": title,
        "description": f"Comprehensive bursary programme for {field} studies with full financial support including tuition, accommodation, and living allowance.",
        "category": "bursary",
        "field": field,
        "provider": provider,
        "eligibility": {
            "minAge": 18,
            "maxAge": 30,
            "requiredEducation": "Matric",
            "requiredFields": [field],
            "minimumAverage": avg,
            "citizenship": ["South African"],
            "yearOfStudy": [],
            "otherRequirements": "Strong academic record and leadership potential"
        },
        "funding": {
            "tuition": "Full tuition coverage",
            "accommodation": "Provided or allowance",
            "allowance": "Monthly living stipend"
        },
        "applicationDeadline": get_date(3 + i % 6),
        "applicationProcess": "Online application, assessment, and interview.",
        "applyMethod": {"type": "redirect", "url": url},
        "documentsRequired": ["CV", "Academic Transcript", "ID Copy", "Proof of Registration", "Motivation Letter"],
        "contactInfo": {"email": email, "phone": phone, "website": url},
        "location": loc,
        "rating": 4.5 + (i % 5) * 0.1,
        "applicationsCount": 0,
        "isActive": True,
        "views": 0,
        "applications": [],
        "createdAt": get_date(-1),
        "updatedAt": get_date(-1)
    })

# GRADUATE PROGRAMS (15)
graduates = [
    ("Deloitte Graduate Programme 2026", "Accounting", "Deloitte", "https://careers.deloitte.co.za", "graduates@deloitte.co.za", "011 806 5000", "Multiple Locations"),
    ("KPMG Training Contract 2026", "Auditing", "KPMG", "https://kpmg.com/za/careers/graduates", "graduates@kpmg.co.za", "011 647 7111", "National"),
    ("PwC Graduate Programme 2026", "Professional Services", "PwC", "https://www.pwc.co.za/careers/graduates", "za_graduates@pwc.com", "011 797 4000", "Multiple Locations"),
    ("Standard Bank Graduate 2026", "Banking", "Standard Bank", "https://www.standardbank.com/careers/graduates", "graduates@standardbank.co.za", "011 636 9111", "Johannesburg"),
    ("Nedbank Young Analyst 2026", "Analytics", "Nedbank", "https://www.nedbank.co.za/careers/graduates", "graduates@nedbank.co.za", "0860 555 111", "Johannesburg"),
    ("RMB Graduate Programme 2026", "Investment Banking", "RMB", "https://www.rmb.co.za/graduate-programme", "graduates@rmb.co.za", "011 282 8000", "Sandton"),
    ("FNB Future League 2026", "Banking", "FNB", "https://www.fnb.co.za/careers/graduates", "futureleague@fnb.co.za", "087 575 9405", "National"),
    ("BMW Graduate Programme 2026", "Automotive", "BMW", "https://www.bmw.co.za/careers/graduates", "graduates@bmw.co.za", "012 677 9111", "Gauteng"),
    ("Heineken Management Trainee 2025", "FMCG", "Heineken", "https://www.heinekenbeverages.co.za/careers", "graduates@heineken.co.za", "011 340 0000", "National"),
    ("Anglo American Graduate 2026", "Mining", "Anglo American", "https://www.angloamerican.com/careers/graduates", "graduates.sa@angloamerican.com", "011 638 9111", "National"),
    ("Sasol Graduate Development 2026", "Energy", "Sasol", "https://www.sasol.com/careers/graduates", "graduates@sasol.com", "011 441 3111", "Gauteng"),
    ("Bidvest Graduate 2026", "Multiple", "Bidvest", "https://www.bidvest.co.za/careers/graduates", "graduates@bidvest.co.za", "011 772 8700", "National"),
    ("Clicks Graduate 2026", "Retail", "Clicks", "https://www.clicks.co.za/careers/graduates", "graduates@clicks.co.za", "021 460 1911", "National"),
    ("Woolworths Graduate 2026", "Retail", "Woolworths", "https://www.woolworthsholdings.co.za/careers/graduates", "graduates@woolworths.co.za", "021 407 9111", "Cape Town"),
    ("BBD Graduate 2025", "IT", "BBD", "https://www.bbd.co.za/careers/graduates", "graduates@bbd.co.za", "011 274 2000", "Gauteng")
]

for i, (title, field, provider, url, email, phone, loc) in enumerate(graduates):
    opportunities.append({
        "title": title,
        "description": f"Graduate programme in {field} with professional development, training, and career advancement opportunities.",
        "category": "graduate",
        "field": field,
        "provider": provider,
        "eligibility": {
            "minAge": 21,
            "maxAge": 27,
            "requiredEducation": "Bachelor's Degree",
            "requiredFields": [field],
            "minimumAverage": "65%",
            "citizenship": ["South African", "Permanent Resident"],
            "yearOfStudy": [],
            "otherRequirements": "Recent graduate with strong academic record"
        },
        "funding": {
            "tuition": "Study support if applicable",
            "accommodation": "Relocation assistance",
            "allowance": "Market-related salary"
        },
        "applicationDeadline": get_date(2 + i % 5),
        "applicationProcess": "Online application, psychometric testing, assessment centre, and interviews.",
        "applyMethod": {"type": "redirect", "url": url},
        "documentsRequired": ["CV", "Academic Transcript", "ID Copy", "Degree Certificate", "Motivation Letter"],
        "contactInfo": {"email": email, "phone": phone, "website": url},
        "location": loc,
        "rating": 4.5 + (i % 5) * 0.1,
        "applicationsCount": 0,
        "isActive": True,
        "views": 0,
        "applications": [],
        "createdAt": get_date(-1),
        "updatedAt": get_date(-1)
    })

# INTERNSHIPS (15)
internships = [
    ("Allan Gray Internship 2025", "Finance", "Allan Gray", "https://www.allangray.co.za/careers/internships", "internships@allangray.co.za", "021 415 2301", "Cape Town"),
    ("Baker Hughes Manufacturing Intern", "Engineering", "Baker Hughes", "https://careers.bakerhughes.com", "internships.sa@bakerhughes.com", "011 451 5000", "Midrand"),
    ("Standard Bank CIB Internship 2025", "Banking", "Standard Bank", "https://www.standardbank.com/careers/internships", "internships@standardbank.co.za", "011 636 9111", "Johannesburg"),
    ("Clicks Business Internship 2025", "Business", "Clicks", "https://www.clicks.co.za/careers/internships", "internships@clicks.co.za", "021 460 1911", "Centurion"),
    ("Gauteng Economic Dev Internship", "Public Sector", "Gauteng Government", "https://www.gauteng.gov.za/careers", "internships@gauteng.gov.za", "011 355 7000", "Johannesburg"),
    ("Dept of Labour Internship 2025", "Public Sector", "Dept of Labour", "https://www.labour.gov.za/vacancies", "internships@labour.gov.za", "012 309 5000", "Pretoria"),
    ("CIPC Graduate Internship 2026", "Public Sector", "CIPC", "https://www.cipc.co.za/careers", "internships@cipc.co.za", "012 394 9500", "Pretoria"),
    ("City of Johannesburg Internship", "Public Sector", "City of Joburg", "https://www.joburg.org.za/careers", "internships@joburg.org.za", "011 407 6000", "Johannesburg"),
    ("Hesto Harnesses Internship 2025", "Manufacturing", "Hesto", "https://www.hesto.co.za/careers", "internships@hesto.co.za", "032 559 1000", "Stanger, KZN"),
    ("Telekom Elevate Internship 2025", "Telecommunications", "Telekom SA", "https://www.telekom.co.za/careers", "elevate@telekom.co.za", "012 680 4200", "National"),
    ("TotalEnergies Marketing Intern", "Marketing", "TotalEnergies", "https://www.totalenergies.co.za/careers", "internships@totalenergies.com", "011 540 4000", "Gauteng"),
    ("Stefanutti Stocks Internship", "Engineering", "Stefanutti Stocks", "https://www.stefanuttistocks.com/careers", "internships@stefanuttistocks.com", "011 571 4300", "Durban"),
    ("PPS Healthcare Internship 2025", "Healthcare", "PPS Healthcare", "https://www.ppshealthcare.co.za/careers", "internships@pps.co.za", "012 648 5000", "Centurion"),
    ("NMISA Audit Internship 2025", "Auditing", "NMISA", "https://www.nmisa.org/careers", "internships@nmisa.org", "012 841 2000", "Pretoria"),
    ("Ray Nkonyeni Internship 2025", "Public Sector", "Ray Nkonyeni Municipality", "https://www.raynkonyeni.gov.za/careers", "internships@raynkonyeni.gov.za", "039 688 5000", "KZN")
]

for i, (title, field, provider, url, email, phone, loc) in enumerate(internships):
    opportunities.append({
        "title": title,
        "description": f"Internship programme in {field} providing hands-on experience and professional development.",
        "category": "internship",
        "field": field,
        "provider": provider,
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "requiredEducation": "Diploma or Degree",
            "requiredFields": [field],
            "minimumAverage": "60%",
            "citizenship": ["South African"],
            "yearOfStudy": [],
            "otherRequirements": "Unemployed graduates or final year students"
        },
        "funding": {
            "tuition": "N/A",
            "accommodation": "Not provided",
            "allowance": "Monthly stipend R5,000 - R10,000"
        },
        "applicationDeadline": get_date(1 + i % 4),
        "applicationProcess": "Online application, screening, and interview.",
        "applyMethod": {"type": "redirect", "url": url},
        "documentsRequired": ["CV", "Academic Transcript", "ID Copy", "Qualification Certificate"],
        "contactInfo": {"email": email, "phone": phone, "website": url},
        "location": loc,
        "rating": 4.2 + (i % 6) * 0.1,
        "applicationsCount": 0,
        "isActive": True,
        "views": 0,
        "applications": [],
        "createdAt": get_date(-1),
        "updatedAt": get_date(-1)
    })

# LEARNERSHIPS (10)
learnerships = [
    ("Rand Water Learnership 2025", "Engineering", "Rand Water", "https://www.randwater.co.za/careers", "learnerships@randwater.co.za", "011 682 0911", "Gauteng"),
    ("Eskom Learnership 2025", "Engineering", "Eskom", "https://www.eskom.co.za/careers/learnerships", "learnerships@eskom.co.za", "0860 037 566", "National"),
    ("Transnet Learnership 2025", "Logistics", "Transnet", "https://www.transnet.net/careers/learnerships", "learnerships@transnet.net", "0860 864 331", "National"),
    ("Shoprite Learnership 2025", "Retail", "Shoprite", "https://www.shopriteholdings.co.za/careers", "learnerships@shoprite.co.za", "021 980 4000", "National"),
    ("Pick n Pay Learnership 2025", "Retail", "Pick n Pay", "https://www.pnp.co.za/careers/learnerships", "learnerships@pnp.co.za", "021 658 1000", "National"),
    ("Telkom Learnership 2025", "Telecommunications", "Telkom", "https://www.telkom.co.za/careers/learnerships", "learnerships@telkom.co.za", "012 311 3000", "National"),
    ("Sasol Learnership 2025", "Chemical", "Sasol", "https://www.sasol.com/careers/learnerships", "learnerships@sasol.com", "011 441 3111", "Secunda"),
    ("SAB Learnership 2025", "FMCG", "SAB", "https://www.ab-inbev.co.za/careers", "learnerships@za.ab-inbev.com", "011 407 1700", "National"),
    ("Dept Public Works Learnership", "Construction", "Dept Public Works", "https://www.publicworks.gov.za/careers", "learnerships@dpw.gov.za", "012 492 4000", "National"),
    ("Sanral Learnership 2025", "Civil Engineering", "SANRAL", "https://www.nra.co.za/careers", "learnerships@nra.co.za", "012 426 6000", "National")
]

for i, (title, field, provider, url, email, phone, loc) in enumerate(learnerships):
    opportunities.append({
        "title": title,
        "description": f"Learnership programme in {field} combining theoretical training with practical workplace experience.",
        "category": "learnership",
        "field": field,
        "provider": provider,
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "requiredEducation": "Matric",
            "requiredFields": [field],
            "minimumAverage": "50%",
            "citizenship": ["South African"],
            "yearOfStudy": [],
            "otherRequirements": "Unemployed youth"
        },
        "funding": {
            "tuition": "Training provided",
            "accommodation": "Not provided",
            "allowance": "Monthly stipend R3,000 - R6,000"
        },
        "applicationDeadline": get_date(2 + i % 5),
        "applicationProcess": "Online or walk-in application, screening, and selection.",
        "applyMethod": {"type": "redirect", "url": url},
        "documentsRequired": ["CV", "Matric Certificate", "ID Copy"],
        "contactInfo": {"email": email, "phone": phone, "website": url},
        "location": loc,
        "rating": 4.0 + (i % 5) * 0.1,
        "applicationsCount": 0,
        "isActive": True,
        "views": 0,
        "applications": [],
        "createdAt": get_date(-1),
        "updatedAt": get_date(-1)
    })

# Save to JSON file
with open('opportunities_55.json', 'w') as f:
    json.dump(opportunities, f, indent=2)

print(f"\n{'='*60}")
print(f"✅ SUCCESS! Created {len(opportunities)} opportunities!")
print(f"{'='*60}")
print(f"\nBreakdown:")
print(f"  • Bursaries: 15")
print(f"  • Graduate Programs: 15")
print(f"  • Internships: 15")
print(f"  • Learnerships: 10")
print(f"\n📁 Saved to: opportunities_55.json")
print(f"{'='*60}\n")
