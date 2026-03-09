import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../utils/helpers';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color: 'blue' | 'emerald' | 'amber' | 'rose';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">{value}</h3>
        </div>
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border", colorClasses[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span className={cn(
            "text-xs font-bold px-2 py-0.5 rounded-full",
            trend.isUp ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
          )}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </span>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
