import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Calculator, 
  Scale, 
  Flame, 
  Activity, 
  Candy,
  TrendingUp,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '../utils/helpers';

type CalculatorType = 'bmi' | 'calorie' | 'daily-risk' | 'sugar';

const Calculators: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('bmi');
  const [bmiResult, setBmiResult] = useState<any>(null);
  const [calorieResult, setCalorieResult] = useState<any>(null);
  const [dailyRiskResult, setDailyRiskResult] = useState<any>(null);
  const [sugarResult, setSugarResult] = useState<any>(null);

  const calculators = [
    { id: 'bmi' as CalculatorType, name: 'BMI Calculator', icon: Scale, color: 'blue' },
    { id: 'calorie' as CalculatorType, name: 'Calorie Calculator', icon: Flame, color: 'orange' },
    { id: 'daily-risk' as CalculatorType, name: 'Daily Risk', icon: Activity, color: 'purple' },
    { id: 'sugar' as CalculatorType, name: 'Sugar Tracker', icon: Candy, color: 'pink' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Health Calculators</h1>
        <p className="text-gray-500">Track your health metrics and monitor daily habits.</p>
      </div>

      {/* Calculator Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {calculators.map((calc) => (
          <button
            key={calc.id}
            onClick={() => setActiveCalculator(calc.id)}
            className={cn(
              "rounded-2xl p-4 border-2 transition-all duration-300 text-left",
              activeCalculator === calc.id
                ? "border-blue-500 bg-blue-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            <calc.icon className={cn(
              "h-8 w-8 mb-2",
              activeCalculator === calc.id ? "text-blue-600" : "text-gray-400"
            )} />
            <p className={cn(
              "font-bold text-sm",
              activeCalculator === calc.id ? "text-blue-900" : "text-gray-700"
            )}>
              {calc.name}
            </p>
          </button>
        ))}
      </div>

      {/* Calculator Content */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        {activeCalculator === 'bmi' && <BMICalculator result={bmiResult} setResult={setBmiResult} />}
        {activeCalculator === 'calorie' && <CalorieCalculator result={calorieResult} setResult={setCalorieResult} />}
        {activeCalculator === 'daily-risk' && <DailyRiskCalculator result={dailyRiskResult} setResult={setDailyRiskResult} />}
        {activeCalculator === 'sugar' && <SugarTracker result={sugarResult} setResult={setSugarResult} />}
      </div>
    </div>
  );
};

// BMI Calculator Component
const BMICalculator: React.FC<{ result: any; setResult: (r: any) => void }> = ({ result, setResult }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    const heightM = data.height / 100;
    const bmi = data.weight / (heightM * heightM);
    
    let category = '';
    let categoryColor = '';
    let advice = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      categoryColor = 'text-blue-600';
      advice = 'Consider increasing caloric intake with nutrient-dense foods. Consult a healthcare provider.';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      categoryColor = 'text-emerald-600';
      advice = 'Great! Maintain your current healthy lifestyle with balanced diet and regular exercise.';
    } else if (bmi < 30) {
      category = 'Overweight';
      categoryColor = 'text-amber-600';
      advice = 'Consider increasing physical activity and monitoring portion sizes. Even 5-7% weight loss can reduce diabetes risk.';
    } else {
      category = 'Obese';
      categoryColor = 'text-red-600';
      advice = 'Weight management is critical for diabetes prevention. Consult healthcare provider for a safe weight loss plan.';
    }

    setResult({ bmi: bmi.toFixed(1), category, categoryColor, advice, weight: data.weight, height: data.height });
    toast.success('BMI calculated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <Scale className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">BMI Calculator</h2>
          <p className="text-sm text-gray-500">Calculate your Body Mass Index</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              step="0.1"
              {...register('height', { required: true, min: 50, max: 300 })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500"
              placeholder="e.g., 170"
            />
            {errors.height && <p className="text-xs text-red-500 mt-1">Valid height required (50-300 cm)</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              {...register('weight', { required: true, min: 20, max: 300 })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500"
              placeholder="e.g., 70"
            />
            {errors.weight && <p className="text-xs text-red-500 mt-1">Valid weight required (20-300 kg)</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          Calculate BMI <ChevronRight className="h-4 w-4" />
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 border border-blue-100"
        >
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">Your BMI</p>
            <p className="text-5xl font-black text-gray-900">{result.bmi}</p>
            <p className={cn("text-lg font-bold mt-2", result.categoryColor)}>{result.category}</p>
          </div>
          <div className="rounded-xl bg-white p-4 border border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">{result.advice}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Calorie Calculator Component
const CalorieCalculator: React.FC<{ result: any; setResult: (r: any) => void }> = ({ result, setResult }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    const { age, weight, height, gender, activity } = data;
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const tdee = Math.round(bmr * activityMultipliers[activity]);
    const maintain = tdee;
    const mildLoss = Math.round(tdee - 250);
    const weightLoss = Math.round(tdee - 500);
    const extremeLoss = Math.round(tdee - 1000);
    const mildGain = Math.round(tdee + 250);
    const weightGain = Math.round(tdee + 500);

    setResult({ bmr: Math.round(bmr), tdee, maintain, mildLoss, weightLoss, extremeLoss, mildGain, weightGain });
    toast.success('Calorie needs calculated');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
          <Flame className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Calorie Calculator</h2>
          <p className="text-sm text-gray-500">Estimate your daily calorie needs</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
            <input
              type="number"
              {...register('age', { required: true, min: 15, max: 120 })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
            <select
              {...register('gender', { required: true })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              {...register('height', { required: true, min: 50, max: 300 })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              {...register('weight', { required: true, min: 20, max: 300 })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Activity Level</label>
          <select
            {...register('activity', { required: true })}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-500"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="active">Active (exercise 6-7 days/week)</option>
            <option value="veryActive">Very Active (intense exercise daily)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
        >
          Calculate Calories <ChevronRight className="h-4 w-4" />
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 p-6 border border-orange-100">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">BMR</p>
                <p className="text-2xl font-black text-gray-900">{result.bmr}</p>
                <p className="text-xs text-gray-500">cal/day</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">TDEE</p>
                <p className="text-2xl font-black text-gray-900">{result.tdee}</p>
                <p className="text-xs text-gray-500">cal/day</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl bg-red-50 p-4 border border-red-100">
              <p className="text-xs font-bold text-red-900 mb-2">Weight Loss</p>
              <p className="text-lg font-black text-red-700">{result.weightLoss}</p>
              <p className="text-xs text-red-600">-0.5 kg/week</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-100">
              <p className="text-xs font-bold text-emerald-900 mb-2">Maintain</p>
              <p className="text-lg font-black text-emerald-700">{result.maintain}</p>
              <p className="text-xs text-emerald-600">Stay current</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
              <p className="text-xs font-bold text-blue-900 mb-2">Weight Gain</p>
              <p className="text-lg font-black text-blue-700">{result.weightGain}</p>
              <p className="text-xs text-blue-600">+0.5 kg/week</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Daily Risk Calculator Component
const DailyRiskCalculator: React.FC<{ result: any; setResult: (r: any) => void }> = ({ result, setResult }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      sleep: 7,
      exercise: 30,
      water: 8,
      sugar: 50,
      stress: 3,
    }
  });

  const onSubmit = (data: any) => {
    let score = 100;
    const factors = [];

    // Sleep (7-9 hours optimal)
    if (data.sleep < 6) {
      score -= 15;
      factors.push({ factor: 'Sleep', impact: '↓ Low', color: 'text-red-600' });
    } else if (data.sleep >= 7 && data.sleep <= 9) {
      factors.push({ factor: 'Sleep', impact: '✓ Good', color: 'text-emerald-600' });
    } else {
      score -= 10;
      factors.push({ factor: 'Sleep', impact: '↑ High', color: 'text-amber-600' });
    }

    // Exercise (30+ min optimal)
    if (data.exercise < 15) {
      score -= 20;
      factors.push({ factor: 'Exercise', impact: '↓ Low', color: 'text-red-600' });
    } else if (data.exercise >= 30) {
      factors.push({ factor: 'Exercise', impact: '✓ Good', color: 'text-emerald-600' });
    } else {
      score -= 10;
      factors.push({ factor: 'Exercise', impact: '~ Moderate', color: 'text-amber-600' });
    }

    // Water (8+ glasses optimal)
    if (data.water < 6) {
      score -= 10;
      factors.push({ factor: 'Hydration', impact: '↓ Low', color: 'text-red-600' });
    } else {
      factors.push({ factor: 'Hydration', impact: '✓ Good', color: 'text-emerald-600' });
    }

    // Sugar (< 25g optimal)
    if (data.sugar > 50) {
      score -= 25;
      factors.push({ factor: 'Sugar', impact: '↑ High', color: 'text-red-600' });
    } else if (data.sugar <= 25) {
      factors.push({ factor: 'Sugar', impact: '✓ Low', color: 'text-emerald-600' });
    } else {
      score -= 15;
      factors.push({ factor: 'Sugar', impact: '~ Moderate', color: 'text-amber-600' });
    }

    // Stress (1-3 optimal)
    if (data.stress >= 4) {
      score -= 15;
      factors.push({ factor: 'Stress', impact: '↑ High', color: 'text-red-600' });
    } else {
      factors.push({ factor: 'Stress', impact: '✓ Low', color: 'text-emerald-600' });
    }

    score = Math.max(0, Math.min(100, score));
    let risk = '';
    let riskColor = '';

    if (score >= 80) {
      risk = 'Low Risk';
      riskColor = 'text-emerald-600';
    } else if (score >= 60) {
      risk = 'Medium Risk';
      riskColor = 'text-amber-600';
    } else {
      risk = 'High Risk';
      riskColor = 'text-red-600';
    }

    setResult({ score, risk, riskColor, factors });
    toast.success('Daily risk calculated');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
          <Activity className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Daily Risk Calculator</h2>
          <p className="text-sm text-gray-500">Track your daily health habits</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Sleep (hours)</label>
            <input
              type="range"
              min="0"
              max="14"
              step="0.5"
              {...register('sleep')}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Optimal: 7-9 hours</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Exercise (minutes)</label>
            <input
              type="range"
              min="0"
              max="120"
              step="5"
              {...register('exercise')}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 30+ minutes</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Water (glasses)</label>
            <input
              type="range"
              min="0"
              max="15"
              {...register('water')}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Target: 8+ glasses</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Sugar Intake (grams)</label>
            <input
              type="range"
              min="0"
              max="150"
              step="5"
              {...register('sugar')}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Limit: &lt;25g per day</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Stress Level (1-5)</label>
            <input
              type="range"
              min="1"
              max="5"
              {...register('stress')}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Low stress is better</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          Calculate Risk <ChevronRight className="h-4 w-4" />
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 border border-purple-100 text-center">
            <p className="text-sm text-gray-600 mb-2">Daily Health Score</p>
            <p className="text-5xl font-black text-gray-900">{result.score}</p>
            <p className={cn("text-lg font-bold mt-2", result.riskColor)}>{result.risk}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {result.factors.map((f: any, i: number) => (
              <div key={i} className="rounded-xl bg-white p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">{f.factor}</p>
                <p className={cn("text-sm font-bold", f.color)}>{f.impact}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Sugar Tracker Component
const SugarTracker: React.FC<{ result: any; setResult: (r: any) => void }> = ({ result, setResult }) => {
  const [meals, setMeals] = useState<any[]>([]);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    const newMeal = {
      name: data.foodName,
      sugar: parseFloat(data.sugar),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);

    const totalSugar = updatedMeals.reduce((sum, m) => sum + m.sugar, 0);
    let status = '';
    let statusColor = '';

    if (totalSugar <= 25) {
      status = 'Excellent';
      statusColor = 'text-emerald-600';
    } else if (totalSugar <= 50) {
      status = 'Good';
      statusColor = 'text-blue-600';
    } else if (totalSugar <= 75) {
      status = 'High';
      statusColor = 'text-amber-600';
    } else {
      status = 'Very High';
      statusColor = 'text-red-600';
    }

    setResult({ total: totalSugar.toFixed(1), status, statusColor });
    reset();
    toast.success('Meal added to tracker');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-pink-100 flex items-center justify-center">
          <Candy className="h-6 w-6 text-pink-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Sugar Intake Tracker</h2>
          <p className="text-sm text-gray-500">Monitor your daily sugar consumption</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Food/Drink</label>
            <input
              type="text"
              {...register('foodName', { required: true })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-pink-50 focus:border-pink-500"
              placeholder="e.g., Soda, Cookies"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Sugar (g)</label>
            <input
              type="number"
              step="0.1"
              {...register('sugar', { required: true, min: 0 })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-pink-50 focus:border-pink-500"
              placeholder="0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-pink-600 px-6 py-3 text-sm font-bold text-white hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
        >
          Add to Tracker <ChevronRight className="h-4 w-4" />
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 p-6 border border-pink-100 text-center">
            <p className="text-sm text-gray-600 mb-2">Total Sugar Today</p>
            <p className="text-5xl font-black text-gray-900">{result.total}g</p>
            <p className={cn("text-lg font-bold mt-2", result.statusColor)}>{result.status}</p>
            <div className="mt-4 h-2 bg-white rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-500",
                  result.statusColor === 'text-emerald-600' ? 'bg-emerald-500' :
                  result.statusColor === 'text-blue-600' ? 'bg-blue-500' :
                  result.statusColor === 'text-amber-600' ? 'bg-amber-500' : 'bg-red-500'
                )}
                style={{ width: `${Math.min(100, (parseFloat(result.total) / 100) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Recommended limit: 25g/day</p>
          </div>

          {meals.length > 0 && (
            <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <p className="text-sm font-bold text-gray-900">Today's Intake</p>
              </div>
              <div className="divide-y divide-gray-100">
                {meals.map((meal, i) => (
                  <div key={i} className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{meal.name}</p>
                      <p className="text-xs text-gray-500">{meal.time}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{meal.sugar}g</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <p className="font-bold mb-1">Tip:</p>
            High sugar intake is linked to increased diabetes risk. Limit added sugars and focus on whole foods.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
