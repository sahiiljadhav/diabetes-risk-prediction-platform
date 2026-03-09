import React, { useState, useEffect } from 'react';
import { Globe, AlertCircle, Activity, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
  isAnimating?: boolean;
}

const AnimatedStatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, subtitle, color, isAnimating }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
    red: 'from-red-500 to-red-600 shadow-red-500/25',
    purple: 'from-purple-500 to-purple-600 shadow-purple-500/25',
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Gradient background overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses} rounded-full blur-2xl`}></div>
        </div>

        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses} shadow-lg mb-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
          {title}
        </h3>

        {/* Value */}
        <div className={`text-3xl md:text-4xl font-bold text-gray-900 mb-2 ${isAnimating ? 'tabular-nums' : ''}`}>
          {value}
        </div>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 leading-relaxed">
          {subtitle}
        </p>

        {/* Animated indicator for live counter */}
        {isAnimating && (
          <div className="absolute top-4 right-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const GlobalStatsSection: React.FC = () => {
  const navigate = useNavigate();
  
  // Live death counter
  const DEATHS_PER_YEAR = 3_438_500;
  const SECONDS_IN_YEAR = 31_536_000;
  const DEATHS_PER_SECOND = DEATHS_PER_YEAR / SECONDS_IN_YEAR;
  
  // Initialize with current estimated deaths this year
  const getInitialDeaths = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const secondsElapsed = Math.floor((now.getTime() - startOfYear.getTime()) / 1000);
    return Math.floor(secondsElapsed * DEATHS_PER_SECOND);
  };

  const [deathCount, setDeathCount] = useState(getInitialDeaths());

  useEffect(() => {
    const interval = setInterval(() => {
      setDeathCount(prev => prev + DEATHS_PER_SECOND);
    }, 1000);

    return () => clearInterval(interval);
  }, [DEATHS_PER_SECOND]);

  const formatNumber = (num: number) => {
    return Math.floor(num).toLocaleString('en-US');
  };

  const handleCheckRisk = () => {
    navigate('/prediction');
  };

  return (
    <section className="relative mb-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60"></div>
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative px-6 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm mb-4">
            <Activity className="h-4 w-4 text-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">Live Global Health Data</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Global Diabetes Impact
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Diabetes is one of the world's fastest-growing health challenges. 
            <span className="font-semibold text-gray-900"> Early detection saves lives.</span>
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          <AnimatedStatCard
            icon={Globe}
            title="Living with Diabetes"
            value="589 Million"
            subtitle="Adults worldwide currently diagnosed with diabetes"
            color="blue"
          />
          
          <AnimatedStatCard
            icon={AlertCircle}
            title="Deaths per Year"
            value="3.4 Million"
            subtitle="Lives lost annually due to diabetes-related causes"
            color="red"
          />
          
          <AnimatedStatCard
            icon={TrendingUp}
            title="Deaths This Year"
            value={formatNumber(deathCount)}
            subtitle="Real-time counter based on global averages"
            color="purple"
            isAnimating={true}
          />
        </div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={handleCheckRisk}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="text-lg">Check Your Diabetes Risk Now</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <p className="mt-4 text-sm text-gray-500">
            Free AI-powered risk assessment • Takes less than 2 minutes
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-400 max-w-3xl mx-auto">
            <span className="font-semibold">Data Sources:</span> International Diabetes Federation (IDF) Diabetes Atlas 10th Edition. 
            Death counter is based on annual averages and is for educational purposes only.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalStatsSection;
