import React, { useState } from 'react';
import { 
  BookOpen, 
  Heart, 
  AlertTriangle, 
  Shield, 
  Apple,
  Activity,
  ChevronRight,
  Check,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/helpers';

type ModuleId = 'basics' | 'symptoms' | 'prevention' | 'diet' | 'exercise';

interface Module {
  id: ModuleId;
  title: string;
  icon: any;
  color: string;
  duration: string;
  description: string;
}

const modules: Module[] = [
  {
    id: 'basics',
    title: 'What is Diabetes?',
    icon: BookOpen,
    color: 'blue',
    duration: '5 min read',
    description: 'Understanding diabetes, types, and how it affects your body',
  },
  {
    id: 'symptoms',
    title: 'Signs & Symptoms',
    icon: AlertTriangle,
    color: 'amber',
    duration: '4 min read',
    description: 'Early warning signs and when to seek medical attention',
  },
  {
    id: 'prevention',
    title: 'Prevention Methods',
    icon: Shield,
    color: 'emerald',
    duration: '6 min read',
    description: 'Evidence-based strategies to prevent or delay diabetes',
  },
  {
    id: 'diet',
    title: 'Diet Guide',
    icon: Apple,
    color: 'rose',
    duration: '8 min read',
    description: 'Nutrition principles and meal planning for diabetes prevention',
  },
  {
    id: 'exercise',
    title: 'Exercise Guide',
    icon: Activity,
    color: 'purple',
    duration: '7 min read',
    description: 'Physical activity recommendations and safe workout tips',
  },
];

const Education: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<ModuleId | null>(null);

  const handleBack = () => {
    setSelectedModule(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {!selectedModule ? (
        <>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Education</h1>
            <p className="text-gray-500">Learn about diabetes prevention and healthy living</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <motion.button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-3xl border-2 border-gray-200 bg-white p-6 text-left hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0",
                    module.color === 'blue' && "bg-blue-100",
                    module.color === 'amber' && "bg-amber-100",
                    module.color === 'emerald' && "bg-emerald-100",
                    module.color === 'rose' && "bg-rose-100",
                    module.color === 'purple' && "bg-purple-100"
                  )}>
                    <module.icon className={cn(
                      "h-6 w-6",
                      module.color === 'blue' && "text-blue-600",
                      module.color === 'amber' && "text-amber-600",
                      module.color === 'emerald' && "text-emerald-600",
                      module.color === 'rose' && "text-rose-600",
                      module.color === 'purple' && "text-purple-600"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                    <p className="text-xs text-gray-500">{module.duration}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 border border-blue-100">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Medical Disclaimer</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This educational content is for informational purposes only and is not a substitute for professional 
                  medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for 
                  personalized medical guidance.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ModuleContent moduleId={selectedModule} onBack={handleBack} />
      )}
    </div>
  );
};

interface ModuleContentProps {
  moduleId: ModuleId;
  onBack: () => void;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ moduleId, onBack }) => {
  const module = modules.find(m => m.id === moduleId)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
      >
        <ChevronRight className="h-4 w-4 rotate-180" />
        Back to modules
      </button>

      <div className="flex items-center gap-4">
        <div className={cn(
          "h-16 w-16 rounded-2xl flex items-center justify-center",
          module.color === 'blue' && "bg-blue-100",
          module.color === 'amber' && "bg-amber-100",
          module.color === 'emerald' && "bg-emerald-100",
          module.color === 'rose' && "bg-rose-100",
          module.color === 'purple' && "bg-purple-100"
        )}>
          <module.icon className={cn(
            "h-8 w-8",
            module.color === 'blue' && "text-blue-600",
            module.color === 'amber' && "text-amber-600",
            module.color === 'emerald' && "text-emerald-600",
            module.color === 'rose' && "text-rose-600",
            module.color === 'purple' && "text-purple-600"
          )} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
          <p className="text-sm text-gray-500">{module.duration}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 space-y-6">
        {moduleId === 'basics' && <BasicsContent />}
        {moduleId === 'symptoms' && <SymptomsContent />}
        {moduleId === 'prevention' && <PreventionContent />}
        {moduleId === 'diet' && <DietContent />}
        {moduleId === 'exercise' && <ExerciseContent />}
      </div>
    </motion.div>
  );
};

const BasicsContent: React.FC = () => (
  <div className="prose prose-sm max-w-none">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Diabetes</h2>
    
    <p className="text-gray-700 leading-relaxed mb-4">
      Diabetes is a chronic metabolic disorder characterized by elevated blood glucose (sugar) levels. 
      When you eat, your body breaks down food into glucose, which enters your bloodstream. Insulin, 
      a hormone produced by the pancreas, helps glucose enter your cells to be used for energy.
    </p>

    <h3 className="text-lg font-bold text-gray-900 mb-3">Types of Diabetes</h3>

    <div className="space-y-4">
      <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
        <h4 className="font-bold text-gray-900 mb-2">Type 1 Diabetes</h4>
        <p className="text-sm text-gray-700">
          An autoimmune condition where the body attacks insulin-producing cells in the pancreas. 
          Usually diagnosed in children and young adults. Requires lifelong insulin therapy.
        </p>
      </div>

      <div className="rounded-xl bg-purple-50 p-4 border border-purple-100">
        <h4 className="font-bold text-gray-900 mb-2">Type 2 Diabetes</h4>
        <p className="text-sm text-gray-700">
          The most common form (90-95% of cases). The body becomes resistant to insulin or doesn't 
          produce enough. Often preventable or manageable through lifestyle changes. Risk increases 
          with age, obesity, and family history.
        </p>
      </div>

      <div className="rounded-xl bg-amber-50 p-4 border border-amber-100">
        <h4 className="font-bold text-gray-900 mb-2">Prediabetes</h4>
        <p className="text-sm text-gray-700">
          Blood sugar levels are higher than normal but not high enough for a Type 2 diagnosis. 
          A critical warning sign—interventions at this stage can prevent or delay progression to diabetes.
        </p>
      </div>
    </div>

    <h3 className="text-lg font-bold text-gray-900 mb-3 mt-6">How Diabetes Affects Your Body</h3>
    
    <ul className="space-y-2">
      <li className="flex items-start gap-3">
        <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
        <span className="text-sm text-gray-700"><strong>Heart & Blood Vessels:</strong> Increases risk of heart disease, stroke, and atherosclerosis</span>
      </li>
      <li className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <span className="text-sm text-gray-700"><strong>Nerves:</strong> Can cause neuropathy (nerve damage), leading to pain, numbness, or tingling</span>
      </li>
      <li className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <span className="text-sm text-gray-700"><strong>Kidneys:</strong> May lead to kidney disease or failure over time</span>
      </li>
      <li className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <span className="text-sm text-gray-700"><strong>Eyes:</strong> Can cause diabetic retinopathy and increase risk of blindness</span>
      </li>
    </ul>

    <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-100 mt-6">
      <p className="text-sm text-gray-700">
        <strong className="text-emerald-900">Good News:</strong> With proper management through medication, 
        diet, exercise, and regular monitoring, most people with diabetes can lead healthy, active lives.
      </p>
    </div>
  </div>
);

const SymptomsContent: React.FC = () => (
  <div className="prose prose-sm max-w-none">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Recognizing the Signs</h2>
    
    <p className="text-gray-700 leading-relaxed mb-4">
      Many people with prediabetes or early Type 2 diabetes have no symptoms. Regular screening is crucial, 
      especially if you have risk factors. When symptoms do appear, they may develop gradually.
    </p>

    <h3 className="text-lg font-bold text-gray-900 mb-3">Common Warning Signs</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl bg-white p-4 border-2 border-red-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <p className="font-bold text-gray-900">Frequent Urination</p>
        </div>
        <p className="text-sm text-gray-600">Especially at night (polyuria)</p>
      </div>

      <div className="rounded-xl bg-white p-4 border-2 border-red-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <p className="font-bold text-gray-900">Excessive Thirst</p>
        </div>
        <p className="text-sm text-gray-600">Constant need to drink fluids (polydipsia)</p>
      </div>

      <div className="rounded-xl bg-white p-4 border-2 border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-amber-500" />
          <p className="font-bold text-gray-900">Increased Hunger</p>
        </div>
        <p className="text-sm text-gray-600">Feeling hungry even after meals</p>
      </div>

      <div className="rounded-xl bg-white p-4 border-2 border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-amber-500" />
          <p className="font-bold text-gray-900">Unexplained Weight Loss</p>
        </div>
        <p className="text-sm text-gray-600">Losing weight without trying</p>
      </div>

      <div className="rounded-xl bg-white p-4 border-2 border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-amber-500" />
          <p className="font-bold text-gray-900">Fatigue</p>
        </div>
        <p className="text-sm text-gray-600">Persistent tiredness and low energy</p>
      </div>

      <div className="rounded-xl bg-white p-4 border-2 border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-amber-500" />
          <p className="font-bold text-gray-900">Blurred Vision</p>
        </div>
        <p className="text-sm text-gray-600">Changes in eyesight</p>
      </div>

      <div className="rounded-xl bg-white p-4 border-2 border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-gray-500" />
          <p className="font-bold text-gray-900">Slow Healing</p>
        </div>
        <p className="text-sm text-gray-600">Cuts and bruises take longer to heal</p>
      </div>

      <div className="rounded-xl bg-white p-4 border-2 border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-gray-500" />
          <p className="font-bold text-gray-900">Tingling/Numbness</p>
        </div>
        <p className="text-sm text-gray-600">In hands or feet (neuropathy)</p>
      </div>
    </div>

    <div className="rounded-xl bg-red-50 p-5 border-2 border-red-200 mt-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-red-900 mb-2">When to Seek Immediate Medical Attention</h4>
          <p className="text-sm text-red-800 mb-3">
            Contact a healthcare provider immediately if you experience:
          </p>
          <ul className="space-y-1 text-sm text-red-800">
            <li>• Rapid onset of multiple symptoms listed above</li>
            <li>• Fruity-smelling breath (sign of ketoacidosis)</li>
            <li>• Severe confusion or difficulty thinking clearly</li>
            <li>• Rapid breathing or shortness of breath</li>
            <li>• Persistent nausea or vomiting</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="rounded-xl bg-blue-50 p-4 border border-blue-100 mt-4">
      <p className="text-sm text-gray-700">
        <strong className="text-blue-900">Screening Recommendation:</strong> Adults aged 35+ should get 
        screened for Type 2 diabetes every 3 years. Earlier and more frequent screening is recommended 
        for those with risk factors like obesity, family history, or sedentary lifestyle.
      </p>
    </div>
  </div>
);

const PreventionContent: React.FC = () => (
  <div className="prose prose-sm max-w-none">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Evidence-Based Prevention Strategies</h2>
    
    <p className="text-gray-700 leading-relaxed mb-4">
      Type 2 diabetes is largely preventable. Research shows that lifestyle interventions can reduce 
      diabetes risk by up to 58% in high-risk individuals. Even modest changes can have significant benefits.
    </p>

    <h3 className="text-lg font-bold text-gray-900 mb-3">Top Prevention Strategies</h3>

    <div className="space-y-4">
      <div className="rounded-xl bg-emerald-50 p-5 border border-emerald-200">
        <div className="flex items-start gap-3 mb-3">
          <Check className="h-6 w-6 text-emerald-600 mt-0.5 flex-shrink-0" />
          <h4 className="text-lg font-bold text-gray-900">Weight Management (5-7% Loss)</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          For overweight individuals, losing just 5-7% of body weight significantly reduces diabetes risk. 
          For a 200 lb person, that's only 10-14 pounds.
        </p>
        <p className="text-xs text-emerald-800 font-medium">Impact: Up to 58% risk reduction</p>
      </div>

      <div className="rounded-xl bg-blue-50 p-5 border border-blue-200">
        <div className="flex items-start gap-3 mb-3">
          <Check className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
          <h4 className="text-lg font-bold text-gray-900">Regular Physical Activity</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Aim for at least 150 minutes per week of moderate-intensity exercise (like brisk walking). 
          Start small: even 10-minute sessions count.
        </p>
        <p className="text-xs text-blue-800 font-medium">Goal: 30 min/day, 5 days/week</p>
      </div>

      <div className="rounded-xl bg-purple-50 p-5 border border-purple-200">
        <div className="flex items-start gap-3 mb-3">
          <Check className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
          <h4 className="text-lg font-bold text-gray-900">Healthy Eating Patterns</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Focus on whole foods, fiber-rich vegetables, lean proteins, and healthy fats. Limit added 
          sugars, refined carbs, and processed foods.
        </p>
        <p className="text-xs text-purple-800 font-medium">Key: Consistent, sustainable changes</p>
      </div>

      <div className="rounded-xl bg-rose-50 p-5 border border-rose-200">
        <div className="flex items-start gap-3 mb-3">
          <Check className="h-6 w-6 text-rose-600 mt-0.5 flex-shrink-0" />
          <h4 className="text-lg font-bold text-gray-900">Quit Smoking</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Smoking increases diabetes risk by 30-40%. Quitting improves insulin sensitivity and 
          overall metabolic health.
        </p>
        <p className="text-xs text-rose-800 font-medium">Benefit: Risk drops within 5 years</p>
      </div>

      <div className="rounded-xl bg-amber-50 p-5 border border-amber-200">
        <div className="flex items-start gap-3 mb-3">
          <Check className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
          <h4 className="text-lg font-bold text-gray-900">Manage Stress & Sleep</h4>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Chronic stress and poor sleep (less than 6 hours) negatively affect blood sugar regulation. 
          Aim for 7-9 hours of quality sleep nightly.
        </p>
        <p className="text-xs text-amber-800 font-medium">Target: 7-9 hours per night</p>
      </div>
    </div>

    <h3 className="text-lg font-bold text-gray-900 mb-3 mt-6">Regular Health Monitoring</h3>
    
    <ul className="space-y-2">
      <li className="flex items-start gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
        <span className="text-sm text-gray-700">Get annual fasting glucose or HbA1c tests if at risk</span>
      </li>
      <li className="flex items-start gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
        <span className="text-sm text-gray-700">Monitor blood pressure regularly (aim for &lt;130/80 mmHg)</span>
      </li>
      <li className="flex items-start gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
        <span className="text-sm text-gray-700">Track waist circumference (target: &lt;40" men, &lt;35" women)</span>
      </li>
      <li className="flex items-start gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
        <span className="text-sm text-gray-700">Check cholesterol levels annually</span>
      </li>
    </ul>
  </div>
);

const DietContent: React.FC = () => (
  <div className="prose prose-sm max-w-none">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Nutrition for Diabetes Prevention</h2>
    
    <p className="text-gray-700 leading-relaxed mb-4">
      No single "diabetes diet" exists, but research supports eating patterns that emphasize whole foods, 
      fiber, lean proteins, and healthy fats while limiting refined carbohydrates and added sugars.
    </p>

    <h3 className="text-lg font-bold text-gray-900 mb-3">Foods to Emphasize</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Check className="h-5 w-5 text-emerald-600" />
          Non-Starchy Vegetables
        </h4>
        <p className="text-sm text-gray-700 mb-2">
          Leafy greens, broccoli, cauliflower, peppers, tomatoes, cucumbers
        </p>
        <p className="text-xs text-emerald-800">Target: Fill half your plate</p>
      </div>

      <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Check className="h-5 w-5 text-emerald-600" />
          Whole Grains
        </h4>
        <p className="text-sm text-gray-700 mb-2">
          Brown rice, quinoa, oats, whole wheat, barley
        </p>
        <p className="text-xs text-emerald-800">Choose over refined grains</p>
      </div>

      <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Check className="h-5 w-5 text-blue-600" />
          Lean Proteins
        </h4>
        <p className="text-sm text-gray-700 mb-2">
          Fish, chicken, turkey, tofu, legumes, eggs
        </p>
        <p className="text-xs text-blue-800">Aim for 25-30g per meal</p>
      </div>

      <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Check className="h-5 w-5 text-blue-600" />
          Healthy Fats
        </h4>
        <p className="text-sm text-gray-700 mb-2">
          Avocados, nuts, seeds, olive oil, fatty fish
        </p>
        <p className="text-xs text-blue-800">Supports satiety & heart health</p>
      </div>
    </div>

    <h3 className="text-lg font-bold text-gray-900 mb-3 mt-6">Foods to Limit</h3>

    <div className="space-y-3">
      <div className="rounded-xl bg-red-50 p-4 border border-red-200">
        <h4 className="font-bold text-gray-900 mb-1">🚫 Added Sugars & Sweetened Drinks</h4>
        <p className="text-sm text-gray-700">Soda, juice, energy drinks, candy, pastries. Limit to &lt;25g/day.</p>
      </div>

      <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
        <h4 className="font-bold text-gray-900 mb-1">⚠️ Refined Carbohydrates</h4>
        <p className="text-sm text-gray-700">White bread, white rice, regular pasta. Choose whole grain versions.</p>
      </div>

      <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
        <h4 className="font-bold text-gray-900 mb-1">⚠️ Processed Meats</h4>
        <p className="text-sm text-gray-700">Bacon, sausage, hot dogs, deli meats. High in sodium and preservatives.</p>
      </div>
    </div>

    <h3 className="text-lg font-bold text-gray-900 mb-3 mt-6">Practical Meal Planning Tips</h3>

    <div className="rounded-xl bg-purple-50 p-5 border border-purple-200">
      <ul className="space-y-2">
        <li className="flex items-start gap-3">
          <div className="h-6 w-6 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-purple-700">1</span>
          </div>
          <span className="text-sm text-gray-700"><strong>Plate Method:</strong> 1/2 non-starchy veggies, 1/4 lean protein, 1/4 whole grains</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="h-6 w-6 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-purple-700">2</span>
          </div>
          <span className="text-sm text-gray-700"><strong>Portion Control:</strong> Use smaller plates, measure servings initially to learn sizes</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="h-6 w-6 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-purple-700">3</span>
          </div>
          <span className="text-sm text-gray-700"><strong>Consistent Timing:</strong> Eat meals at regular times to stabilize blood sugar</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="h-6 w-6 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-purple-700">4</span>
          </div>
          <span className="text-sm text-gray-700"><strong>Hydration:</strong> Drink 8+ glasses of water daily; avoid sugary beverages</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="h-6 w-6 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-purple-700">5</span>
          </div>
          <span className="text-sm text-gray-700"><strong>Mindful Eating:</strong> Eat slowly, listen to hunger cues, avoid distractions</span>
        </li>
      </ul>
    </div>
  </div>
);

const ExerciseContent: React.FC = () => (
  <div className="prose prose-sm max-w-none">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Exercise for Diabetes Prevention</h2>
    
    <p className="text-gray-700 leading-relaxed mb-4">
      Regular physical activity is one of the most powerful tools for preventing diabetes. Exercise 
      improves insulin sensitivity, helps with weight management, and reduces cardiovascular risk.
    </p>

    <h3 className="text-lg font-bold text-gray-900 mb-3">Recommended Activity Levels</h3>

    <div className="rounded-xl bg-blue-50 p-5 border-2 border-blue-200 mb-4">
      <h4 className="text-lg font-bold text-blue-900 mb-3">Weekly Target</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-4">
          <p className="text-2xl font-black text-blue-600 mb-1">150 min</p>
          <p className="text-sm text-gray-700">Moderate-intensity aerobic activity</p>
          <p className="text-xs text-gray-500 mt-2">OR 75 min vigorous activity</p>
        </div>
        <div className="rounded-lg bg-white p-4">
          <p className="text-2xl font-black text-purple-600 mb-1">2-3 days</p>
          <p className="text-sm text-gray-700">Strength training sessions</p>
          <p className="text-xs text-gray-500 mt-2">All major muscle groups</p>
        </div>
      </div>
    </div>

    <h3 className="text-lg font-bold text-gray-900 mb-3">Types of Exercise</h3>

    <div className="space-y-4">
      <div className="rounded-xl bg-emerald-50 p-5 border border-emerald-200">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-600" />
          Aerobic Exercise (Cardio)
        </h4>
        <p className="text-sm text-gray-700 mb-3">
          Activities that increase heart rate and breathing. Best for burning calories and improving 
          cardiovascular health.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-xs text-gray-600">• Brisk walking</div>
          <div className="text-xs text-gray-600">• Swimming</div>
          <div className="text-xs text-gray-600">• Cycling</div>
          <div className="text-xs text-gray-600">• Dancing</div>
          <div className="text-xs text-gray-600">• Jogging</div>
          <div className="text-xs text-gray-600">• Sports (tennis, basketball)</div>
        </div>
      </div>

      <div className="rounded-xl bg-purple-50 p-5 border border-purple-200">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-600" />
          Strength Training (Resistance)
        </h4>
        <p className="text-sm text-gray-700 mb-3">
          Building muscle improves glucose uptake and metabolism. Increases resting metabolic rate.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-xs text-gray-600">• Weight lifting</div>
          <div className="text-xs text-gray-600">• Resistance bands</div>
          <div className="text-xs text-gray-600">• Bodyweight exercises</div>
          <div className="text-xs text-gray-600">• Yoga (some poses)</div>
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 p-5 border border-blue-200">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Heart className="h-5 w-5 text-blue-600" />
          Flexibility & Balance
        </h4>
        <p className="text-sm text-gray-700 mb-3">
          Supports injury prevention and functional fitness, especially important for older adults.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-xs text-gray-600">• Yoga</div>
          <div className="text-xs text-gray-600">• Tai chi</div>
          <div className="text-xs text-gray-600">• Stretching</div>
          <div className="text-xs text-gray-600">• Pilates</div>
        </div>
      </div>
    </div>

    <h3 className="text-lg font-bold text-gray-900 mb-3 mt-6">Getting Started Safely</h3>

    <div className="space-y-3">
      <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
        <h4 className="font-bold text-gray-900 mb-2">⚠️ Consult Your Doctor First</h4>
        <p className="text-sm text-gray-700">
          Especially if you're over 40, have existing health conditions, or have been sedentary. 
          Get clearance for your exercise plan.
        </p>
      </div>

      <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200">
        <h4 className="font-bold text-gray-900 mb-2">✓ Start Slow & Progress Gradually</h4>
        <p className="text-sm text-gray-700">
          Begin with 5-10 minute sessions and gradually increase. Listen to your body. Aim for 
          consistency over intensity.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
        <h4 className="font-bold text-gray-900 mb-2">✓ Find Activities You Enjoy</h4>
        <p className="text-sm text-gray-700">
          You're more likely to stick with exercise you enjoy. Try different activities until you 
          find what works for you.
        </p>
      </div>

      <div className="rounded-xl bg-purple-50 p-4 border border-purple-200">
        <h4 className="font-bold text-gray-900 mb-2">✓ Make It a Habit</h4>
        <p className="text-sm text-gray-700">
          Schedule exercise like an appointment. Morning workouts often have better adherence. 
          Find an exercise buddy for accountability.
        </p>
      </div>
    </div>

    <div className="rounded-xl bg-rose-50 p-5 border-2 border-rose-200 mt-6">
      <h4 className="font-bold text-rose-900 mb-2">Warning Signs to Stop Exercising</h4>
      <p className="text-sm text-rose-800 mb-2">Stop immediately and seek medical attention if you experience:</p>
      <ul className="space-y-1 text-sm text-rose-800">
        <li>• Chest pain or pressure</li>
        <li>• Severe shortness of breath</li>
        <li>• Dizziness or lightheadedness</li>
        <li>• Nausea or vomiting</li>
        <li>• Irregular heartbeat</li>
      </ul>
    </div>
  </div>
);

export default Education;
