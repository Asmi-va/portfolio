import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'Asmi Vashista',
    contact: {
      phone: '7988123720',
      email: 'asmivashisth@gmail.com',
      github: '',
    },
    objective: 'Aspiring Software Engineer eager to contribute to enterprise-level systems through strong skills in backend development, database management, and real-time monitoring. Proficient in Python and SQL with experience in debugging, building APIs, and enhancing software architecture.',
    education: {
      degree: 'B.Tech in Computer Science (AI & ML)',
      institute: 'Panipat Institute of Engineering and Technology, Haryana',
      years: '2022–2026',
    },
    experience: [
      {
        title: 'Machine Learning Intern',
        company: 'Prasunet Pvt. Ltd.',
        date: 'March 2025',
        details: 'Deployed real-time ML models for system monitoring',
      },
      {
        title: 'ML Intern',
        company: 'Grades Global, Noida',
        date: 'Oct 2024',
        details: 'Built predictive models on academic datasets',
      },
      {
        title: 'Data Science Intern',
        company: 'Imarticus Learning, Noida',
        date: 'Sep 2023',
        details: 'Created Power BI dashboards, handled SQL queries',
      },
    ],
    skills: {
      languages: ['Python', 'SQL', 'C', 'C++'],
      libraries: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
      frameworks: ['Django', 'Flask', 'FastAPI', 'TensorFlow', 'Keras'],
      tools: ['Kafka', 'Firebase', 'Grafana', 'Prometheus', 'Elasticsearch', 'Snowflake', 'Power BI'],
      concepts: ['ML', 'Anomaly Detection', 'Time Series', 'Data Visualization'],
      others: ['Twilio API', 'OpenCV', 'PyGame', 'Git', 'Database', 'Anomaly Detection', 'OCR'],
    },
    projects: [
      {
        title: 'Women Safety Detection System',
        details: 'Real-time alerting via Twilio & Firebase, ML-based threat detection',
      },
      {
        title: 'End-to-End Text-to-SQL LLM App',
        details: 'Natural language to SQL interface using Google Gemini API, executes live queries',
      },
      {
        title: 'DDoS Detection System',
        details: 'Real-time attack detection using Kafka, Grafana, and Scikit-learn',
      },
      {
        title: 'OCR-Based Document Insight Generator',
        details: 'Extracted and analyzed text from scanned docs using Tesseract OCR and exposed via FastAPI',
      },
      {
        title: 'Self-Driving Car Simulator',
        details: 'Lane detection with OpenCV, CNN steering model in PyGame',
      },
    ],
    achievements: [
      'Infosys Pragati – Cohort 4',
      'Reliance Foundation Scholar – Top 500 nationwide',
      'Winner – Smart India Hackathon 2024 (Internal round)',
    ],
  });
} 