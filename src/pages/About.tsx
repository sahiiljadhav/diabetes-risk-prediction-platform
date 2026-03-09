import React from 'react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  Stethoscope, 
  Scale, 
  FileText, 
  AlertTriangle,
  HeartPulse,
  Microscope
} from 'lucide-react';
import { motion } from 'motion/react';

const About: React.FC = () => {
  const sections = [
    {
      title: 'How AI Predicts Diabetes',
      icon: BrainCircuit,
      color: 'text-blue-600 bg-blue-50',
      content: 'DiaRisk AI uses advanced machine learning algorithms to analyze clinical parameters like glucose levels, BMI, and age. By identifying complex patterns in large medical datasets, the model can estimate the probability of diabetes with high precision.'
    },
    {
      title: 'Ethical AI & Data Privacy',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50',
      content: 'We prioritize patient privacy and data security. All data processed through our platform is anonymized and adheres to HIPAA and GDPR standards. Our models are regularly audited for bias to ensure fair and equitable risk assessments.'
    },
    {
      title: 'Clinical Validation',
      icon: Microscope,
      color: 'text-amber-600 bg-amber-50',
      content: 'Our prediction engine is validated against established medical datasets, including the PIMA Indian Diabetes Dataset. While highly accurate, the platform is designed to support, not replace, clinical judgment by healthcare professionals.'
    },
    {
      title: 'Medical Disclaimer',
      icon: AlertTriangle,
      color: 'text-rose-600 bg-rose-50',
      content: 'This platform is for informational and educational purposes only. It does not provide medical diagnosis or treatment. Always consult with a qualified healthcare provider for medical advice and diagnosis.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-200 mb-4">
          <HeartPulse className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900">About DiaRisk AI</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Empowering healthcare professionals with predictive intelligence to combat the global diabetes epidemic.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl mb-6 ${section.color}`}>
              <section.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-3xl bg-gray-900 p-8 md:p-12 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              We believe that early detection is the most powerful tool in modern medicine. 
              By making advanced predictive analytics accessible to clinics worldwide, 
              we aim to reduce the global burden of chronic diseases through proactive intervention.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Scale className="h-4 w-4 text-blue-400" /> Fairness First
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <FileText className="h-4 w-4 text-blue-400" /> Open Standards
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Stethoscope className="h-4 w-4 text-blue-400" /> Patient Centric
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto rounded-xl bg-white px-8 py-4 text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors">
              Read Our Whitepaper
            </button>
          </div>
        </div>
      </div>

      <div className="text-center pb-8">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
          DiaRisk AI Platform v2.4.0 • Build 2026.03.08
        </p>
      </div>
    </div>
  );
};

export default About;
