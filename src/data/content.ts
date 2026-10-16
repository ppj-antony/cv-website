export type Language = 'de' | 'en';

export interface Responsibility {
  title: string;
  desc: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  isCurrent?: boolean;
  description: string;
  responsibilities?: Responsibility[];
}

export interface EducationItem {
  period: string;
  degree: string;
  school: string;
  details: string;
}

export interface SkillItem {
  title: string;
  description: string;
}

export const content = {
  de: {
    nav: {
      experience: "ERFAHRUNG",
      education: "AUSBILDUNG",
      skills: "FÄHIGKEITEN",
      contact: "KONTAKT"
    },
    hero: {
      greeting: "Hallo, ich bin",
      name: "Paul Antony",
      title: "Head of Data & Digital Strategist",
      description: "Wirtschaftsabsolvent mit Fokus auf Data-Driven Business, E-Commerce, digitale Innovationen und skalierbare Prozesse.",
      downloadCv: "CV herunterladen",
      contactMe: "Kontakt aufnehmen",
      keywords: [
        "PROCESS OPTIMIZATION",
        "UI/UX DESIGN",
        "PRODUCT ANALYTICS",
        "DATA & AI STRATEGY",
        "HIGH AGENCY",
        "PYTHON",
        "ON-SITE EXPERIENCE",
        "SQL",
        "USER JOURNEY MAPPING",
        "INFORMATION ARCHITECTURE"
      ]
    },
    experience: {
      title: "Berufserfahrung",
      coreResponsibilities: "KERNVERANTWORTLICHKEITEN",
      items: [
        {
          period: "2025 – AKTUELL",
          role: "Head of Data",
          company: "FoodNotify GmbH (Wien)",
          isCurrent: true,
          description: "Verantwortlich für die Datenstrategie und damit verbundene Prozesse bei FoodNotify, mit Fokus auf Priorisierung, datenbasierte Entscheidungsfindung und bereichsübergreifende Zusammenarbeit.",
          responsibilities: [
            {
              title: "Datenstrategie & Priorisierung",
              desc: "Roadmap, Business-Prioritäten und strategische Entscheidungsunterstützung."
            },
            {
              title: "Datenbasierte Entscheidungen",
              desc: "Datenanalyse, Business Insights und operative Unterstützung."
            },
            {
              title: "Stakeholder Management",
              desc: "Bereichsübergreifende Koordination, Abstimmung mit Lieferanten & Partnern."
            }
          ]
        },
        {
          period: "2024 – 2025",
          role: "Senior Data Manager",
          company: "FoodNotify GmbH (Wien)",
          isCurrent: false,
          description: "Entwicklung und Betreuung der Dateninfrastruktur sowie interner Tools zur Optimierung datenbasierter Prozesse im Unternehmen in einem dynamischen Start-up-Umfeld.",
          responsibilities: [
            {
              title: "Projektkoordination",
              desc: "Steuerung der Implementierung eines Datenintegrationstools mit Dienstleister."
            },
            {
              title: "Technischer Betrieb",
              desc: "PostgreSQL Datenbankmanagement, Linux-Systemadmin & Fehlerbehebung."
            },
            {
              title: "Lieferantenmanagement",
              desc: "Abstimmung mit Lieferanten & Partnern zur sicheren Datenintegration."
            }
          ]
        },
        {
          period: "2021 – 2024",
          role: "E-Commerce Manager",
          company: "Decathlon Austria GmbH (Vösendorf)",
          isCurrent: false,
          description: "Verbesserung der firmeneigenen Website, markenübergreifender Austausch mit Decathlon-Eigenmarken in Frankreich und Deutschland sowie saisonale Koordination der Sportarten Radfahren, Laufen, Walking und Triathlon.",
          responsibilities: [
            {
              title: "Project Lead",
              desc: "Algolia Search Integration & Homepage Management."
            },
            {
              title: "Webmarketing",
              desc: "Category Management, Search Optimization mit Algolia & SEO."
            },
            {
              title: "Digital Tools",
              desc: "Python, HTML, CSS, Google Analytics, Ads & Looker Studio."
            }
          ]
        },
        {
          period: "2020 – 2021",
          role: "Vertriebsmitarbeiter",
          company: "Decathlon Austria GmbH (Vösendorf)",
          isCurrent: false,
          description: "Produktexperte für Radsport und Laufen; Produktorganisation und saisonale Anpassung zur Optimierung des Storelayouts und Aufrechterhaltung des Kundenflusses."
        }
      ] as ExperienceItem[]
    },
    education: {
      title: "Ausbildung",
      items: [
        {
          period: "2023 – 2024 • Amsterdam University of Applied Sciences (Niederlande)",
          degree: "MSc, Master of Science // Digital Driven Business",
          school: "Amsterdam University of Applied Sciences",
          details: "Schwerpunkte: Digital Business Management, Emerging Technologies, AI & Machine Learning, Online Datamining. Tools: Python, SQL (pgAdmin), Tableau."
        },
        {
          period: "2019 – 2022 • Fachhochschule St. Pölten (Österreich)",
          degree: "BA, Bachelor of Arts // Medienmanagement",
          school: "Fachhochschule St. Pölten",
          details: "Schwerpunkte: Project & Technology Management, Leadership & Organization, Strategy & Media Management. Tools: HTML, CSS, CMS, Adobe Premiere Pro, Photoshop, Illustrator."
        },
        {
          period: "2012 – 2017 • Vienna Business School (Mödling)",
          degree: "Schulabschluss (Matura)",
          school: "Vienna Business School",
          details: "Spezialisierung auf digitale Technologien, Wirtschaftsinformatik und Business-Grundlagen."
        }
      ] as EducationItem[]
    },
    skills: {
      title: "Fähigkeiten & Expertisen",
      items: [
        {
          title: "Digital & E-Commerce",
          description: "Algolia Search Optimization, Category Management, SEO, Google Analytics, Looker Studio, HTML/CSS, CMS"
        },
        {
          title: "Führung & Strategie",
          description: "Strategische Führung, Data-Roadmaps & KPI-Frameworks, Projektkoordination, bereichsübergreifende Leitung, Lieferantenmanagement"
        },
        {
          title: "Daten & Infrastruktur",
          description: "PostgreSQL, SQL (pgAdmin), Python (Data Science Libraries), Linux Systemadministration, Tableau, Online Datamining"
        }
      ] as SkillItem[]
    },
    contact: {
      title: "Kontakt",
      subtitle: "Interesse an einer Zusammenarbeit oder Fragen? Melde dich gerne direkt bei mir.",
      email: "E-Mail",
      phone: "Telefon",
      social: "Social"
    }
  },
  en: {
    nav: {
      experience: "EXPERIENCE",
      education: "EDUCATION",
      skills: "SKILLS",
      contact: "CONTACT"
    },
    hero: {
      greeting: "Hello, I am",
      name: "Paul Antony",
      title: "Head of Data & Digital Strategist",
      description: "Business & management graduate with a strong focus on e-commerce, data-driven strategy, and digital innovation.",
      downloadCv: "Download CV",
      contactMe: "Get in touch",
      keywords: [
        "PROCESS OPTIMIZATION",
        "UI/UX DESIGN",
        "PRODUCT ANALYTICS",
        "DATA & AI STRATEGY",
        "HIGH AGENCY",
        "PYTHON",
        "ON-SITE EXPERIENCE",
        "SQL",
        "USER JOURNEY MAPPING",
        "INFORMATION ARCHITECTURE"
      ]
    },
    experience: {
      title: "Work Experience",
      coreResponsibilities: "CORE RESPONSIBILITIES",
      items: [
        {
          period: "2025 – PRESENT",
          role: "Head of Data",
          company: "FoodNotify GmbH (Vienna)",
          isCurrent: true,
          description: "Responsible for FoodNotify's data strategy and related processes, with a focus on prioritization, data-driven decision-making, and cross-functional collaboration.",
          responsibilities: [
            {
              title: "Data Strategy & Prioritization",
              desc: "Roadmap, business priorities, and strategic decision support."
            },
            {
              title: "Data-Driven Decisions",
              desc: "Data analysis, business insights, and decision support."
            },
            {
              title: "Stakeholder Management",
              desc: "Cross-functional coordination, suppliers, and external partners."
            }
          ]
        },
        {
          period: "2024 – 2025",
          role: "Senior Data Manager",
          company: "FoodNotify GmbH (Vienna)",
          isCurrent: false,
          description: "Development and management of data infrastructure and internal tooling to improve data-driven processes across the company in a dynamic startup environment.",
          responsibilities: [
            {
              title: "Project Coordination",
              desc: "Leading the Data Integration Tool implementation with a partner."
            },
            {
              title: "Technical Operations",
              desc: "PostgreSQL management, Linux system administration, and error handling."
            },
            {
              title: "Supplier Management",
              desc: "Coordinating with suppliers and development for process alignment."
            }
          ]
        },
        {
          period: "2021 – 2024",
          role: "E-Commerce Manager",
          company: "Decathlon Austria GmbH (Vösendorf)",
          isCurrent: false,
          description: "Improvement of the company website, cross-brand exchange with Decathlon own brands in France and Germany, and seasonal coordination of sports categories.",
          responsibilities: [
            {
              title: "Project Lead",
              desc: "Algolia search integration and homepage management."
            },
            {
              title: "Webmarketing",
              desc: "Category Management, Search Optimization with Algolia & SEO."
            },
            {
              title: "Digital Tools",
              desc: "Python, HTML, CSS, Google Analytics, Ads & Looker Studio."
            }
          ]
        },
        {
          period: "2020 – 2021",
          role: "Sales Associate",
          company: "Decathlon Austria GmbH (Vösendorf)",
          isCurrent: false,
          description: "Product expert for cycling and running; product organization and seasonal adaptation to optimize store layout and customer flow."
        }
      ] as ExperienceItem[]
    },
    education: {
      title: "Education",
      items: [
        {
          period: "2023 – 2024 • Amsterdam University of Applied Sciences (Netherlands)",
          degree: "MSc, Master of Science // Digital Driven Business",
          school: "Amsterdam University of Applied Sciences",
          details: "Program Focus: Digital Business Management, Emerging Technology, AI & Machine Learning, Online Datamining. Tools: Python, SQL (pgAdmin), Tableau."
        },
        {
          period: "2019 – 2022 • University of Applied Sciences St. Pölten (Austria)",
          degree: "BA, Bachelor of Arts // Media Management",
          school: "University of Applied Sciences St. Pölten",
          details: "Program Focus: Project & Technology Management, Leadership & Organization, Strategy & Media Management. Tools: HTML, CSS, CMS, Adobe Suite."
        },
        {
          period: "2012 – 2017 • Vienna Business School (Mödling)",
          degree: "Graduation (Matura)",
          school: "Vienna Business School",
          details: "Specialization in digital technologies, business informatics, and management skills."
        }
      ] as EducationItem[]
    },
    skills: {
      title: "Skills & Expertise",
      items: [
        {
          title: "Digital & E-Commerce",
          description: "Algolia Search Optimization, Category Management, SEO, Google Analytics, Looker Studio, HTML/CSS, CMS"
        },
        {
          title: "Leadership & Strategy",
          description: "Strategic Leadership, Data Roadmap & KPI Frameworks, Project Coordination, Cross-Functional Leadership, Supplier Management"
        },
        {
          title: "Data & Infrastructure",
          description: "PostgreSQL, SQL (pgAdmin), Python (Data Science Libraries), Linux Systemadministration, Tableau, Online Datamining"
        }
      ] as SkillItem[]
    },
    contact: {
      title: "Contact",
      subtitle: "Interested in working together or have any questions? Feel free to reach out.",
      email: "Email",
      phone: "Phone",
      social: "Social"
    }
  }
};