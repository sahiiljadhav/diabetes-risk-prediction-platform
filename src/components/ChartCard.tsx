import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils/helpers';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm", className)}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex-1 min-h-[300px] w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default ChartCard;
