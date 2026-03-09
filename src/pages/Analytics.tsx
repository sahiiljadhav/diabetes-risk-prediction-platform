import React, { useEffect, useMemo, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  ZAxis,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell
} from 'recharts';
import ChartCard from '../components/ChartCard';
import { Brain, Database, ShieldCheck, Zap } from 'lucide-react';
import { getRealtimeAnalytics, RealtimeAnalyticsResponse } from '../services/api';

const POLL_INTERVAL_MS = 3000;

const EMPTY_ANALYTICS: RealtimeAnalyticsResponse = {
  sampleCount: 0,
  liveSampleCount: 0,
  lastUpdated: Date.now(),
  correlationData: [],
  featureImportance: [],
  modelPerformance: [],
};

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<RealtimeAnalyticsResponse>(EMPTY_ANALYTICS);
  const [isLoading, setIsLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let isMounted = true;

    const loadAnalytics = async () => {
      try {
        const response = await getRealtimeAnalytics();
        if (isMounted) {
          setAnalytics(response);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsLoading(false);
        }
        console.error('Failed to load realtime analytics:', error);
      }
    };

    loadAnalytics();
    const polling = setInterval(loadAnalytics, POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(polling);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const updatedSecondsAgo = useMemo(() => {
    return Math.max(0, Math.floor((now - analytics.lastUpdated) / 1000));
  }, [now, analytics.lastUpdated]);

  const avgRiskMetric =
    analytics.modelPerformance.find((metric) => metric.subject === 'Avg Risk')?.A ?? 0;
  const throughputMetric =
    analytics.modelPerformance.find((metric) => metric.subject === 'Throughput')?.A ?? 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-500">Live insights streamed from recent prediction activity.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
            <Zap className="h-3 w-3" /> {isLoading ? 'Connecting...' : `Updated ${updatedSecondsAgo}s ago`}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            <Database className="h-3 w-3" /> {analytics.sampleCount} Live Samples
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ChartCard 
            title="BMI vs Glucose Correlation" 
            subtitle="Bubble size reflects risk score from incoming predictions"
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="bmi" name="BMI" unit="" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} label={{ value: 'BMI', position: 'bottom', offset: 0 }} />
                <YAxis type="number" dataKey="glucose" name="Glucose" unit="mg/dL" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} label={{ value: 'Glucose', angle: -90, position: 'left' }} />
                <ZAxis type="number" dataKey="risk" range={[100, 1000]} name="Risk" unit="%" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Scatter name="Patients" data={analytics.correlationData} fill="#3b82f6" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="lg:col-span-4">
          <ChartCard 
            title="Real-Time Risk Mix" 
            subtitle="Distribution and throughput in the recent activity window"
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analytics.modelPerformance}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="DiaRisk AI"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.5}
                />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ChartCard 
            title="Feature Importance" 
            subtitle="Live feature impact estimated from recent prediction correlations"
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={analytics.featureImportance} margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="feature" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="importance" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24}>
                  {analytics.featureImportance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={1 - index * 0.1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="lg:col-span-5">
          <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                <Brain className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-gray-900">Explainable AI (XAI)</h3>
                <p className="text-sm font-medium text-gray-500">Decision logic transparency</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                This panel updates continuously from your real prediction traffic. As patients are evaluated, the engine recalculates feature-impact signals and risk distribution in near real time.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-100 p-5 bg-gray-50/50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Live Window</p>
                  <p className="text-2xl font-black text-gray-900">{analytics.liveSampleCount}</p>
                  <p className="text-[10px] font-bold text-gray-500">Predictions (24h)</p>
                </div>
                <div className="rounded-2xl border border-gray-100 p-5 bg-gray-50/50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Throughput</p>
                  <p className="text-2xl font-black text-gray-900">{throughputMetric}%</p>
                  <p className="text-[10px] font-bold text-gray-500">Last 5-minute load</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 p-5 bg-gray-50/50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Average Risk</p>
                <p className="text-2xl font-black text-gray-900">{avgRiskMetric}%</p>
                <p className="text-[10px] font-bold text-gray-500">Rolling 24-hour score</p>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-gray-500 font-semibold bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Recomputed every {POLL_INTERVAL_MS / 1000} seconds from live API data.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
