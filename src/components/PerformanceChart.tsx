
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface PerformanceChartProps {
  videoLength?: number; // Length in seconds
}

const PerformanceChart = ({ videoLength = 90 }: PerformanceChartProps) => {
  const [chartType, setChartType] = useState<'sprint' | 'injury'>('sprint');
  const [sprintData, setSprintData] = useState<any[]>([]);
  const [injuryRiskData, setInjuryRiskData] = useState<any[]>([]);
  
  // Generate time segments based on video length
  useEffect(() => {
    if (!videoLength) return;
    
    const segments = Math.min(9, Math.max(3, Math.floor(videoLength / 10)));
    const segmentLength = Math.ceil(videoLength / segments);
    
    // Generate sprint data
    const newSprintData = Array(segments).fill(0).map((_, i) => {
      const startSec = i * segmentLength;
      const endSec = Math.min((i + 1) * segmentLength, videoLength);
      
      return {
        name: `${startSec}-${endSec}s`,
        count: Math.max(1, Math.floor(Math.random() * 5)), // 1-4 sprints per segment
        fatigue: Math.min(95, 10 + (i * 10) + Math.floor(Math.random() * 10)) // Progressive fatigue
      };
    });
    
    // Generate injury risk data
    const newInjuryRiskData = Array(segments).fill(0).map((_, i) => {
      const startSec = i * segmentLength;
      const endSec = Math.min((i + 1) * segmentLength, videoLength);
      
      // Risk increases more rapidly in later segments
      const baseRisk = 5 + (i * 10);
      const risk = Math.min(95, baseRisk + Math.floor(Math.random() * 15));
      
      return {
        name: `${startSec}-${endSec}s`,
        risk
      };
    });
    
    setSprintData(newSprintData);
    setInjuryRiskData(newInjuryRiskData);
  }, [videoLength]);

  const barColors = {
    count: '#00A3FF',
    fatigue: '#FF4B4B'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length || !label) {
      return null;
    }
    
    return (
      <div className="neo-panel p-3 text-sm">
        <p className="font-medium">{label}</p>
        {chartType === 'sprint' ? (
          <>
            <p className="text-athlete-blue">{`Sprints: ${payload[0]?.value || 0}`}</p>
            <p className="text-athlete-red">{`Fatigue: ${payload[1]?.value || 0}%`}</p>
          </>
        ) : (
          <p className="text-athlete-orange">{`Injury Risk: ${payload[0]?.value || 0}%`}</p>
        )}
      </div>
    );
  };

  return (
    <div className="glass-panel p-4 rounded-lg w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-white/90">Performance Metrics</h3>
        <div className="flex">
          <button
            onClick={() => setChartType('sprint')}
            className={`px-3 py-1.5 text-sm rounded-l-md ${
              chartType === 'sprint'
                ? 'bg-athlete-blue text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Sprint & Fatigue
          </button>
          <button
            onClick={() => setChartType('injury')}
            className={`px-3 py-1.5 text-sm rounded-r-md ${
              chartType === 'injury'
                ? 'bg-athlete-orange text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Injury Risk
          </button>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'sprint' ? (
            <BarChart
              data={sprintData}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.5)" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="rgba(255,255,255,0.5)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="rgba(255,255,255,0.5)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="left" 
                dataKey="count" 
                fill={barColors.count} 
                radius={[4, 4, 0, 0]}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="fatigue" 
                stroke={barColors.fatigue} 
                strokeWidth={2}
                dot={{ r: 4, fill: barColors.fatigue }}
                activeDot={{ r: 6 }}
              />
            </BarChart>
          ) : (
            <LineChart
              data={injuryRiskData}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.5)" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF7A00" stopOpacity={1} />
                  <stop offset="100%" stopColor="#FF7A00" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <Line 
                type="monotone" 
                dataKey="risk" 
                stroke="#FF7A00" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#FF7A00' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      
      <div className="pt-4 text-sm border-t border-white/10 mt-2">
        {chartType === 'sprint' ? (
          <p className="text-white/70">
            <span className="text-athlete-blue font-medium">Sprint count</span> decreases as 
            <span className="text-athlete-red font-medium"> fatigue</span> rises, indicating potential injury risk.
          </p>
        ) : (
          <p className="text-white/70">
            <span className="text-athlete-orange font-medium">Injury risk</span> increases significantly 
            over time, suggesting careful monitoring is needed.
          </p>
        )}
      </div>
    </div>
  );
};

export default PerformanceChart;
