import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
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
    {
      title: 'BRSR/GRI Analyzer – End-to-End Validation',
      details: 'Automated validation and analysis of BRSR/GRI sustainability reports. End-to-end data extraction, compliance checks, and insights dashboard.',
    },
  ]);
} 