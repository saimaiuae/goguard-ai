
import React from 'react';

interface RiskFactorProps {
  label: string;
  value: number;
  description: string;
  warning?: boolean;
}

const RiskFactor = ({ label, value, description, warning }: RiskFactorProps) => {
  let barColor = 'bg-athlete-blue';
  
  if (value < 50) {
    barColor = 'bg-athlete-red';
  } else if (value < 70) {
    barColor = 'bg-athlete-orange';
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="font-medium text-sm">{label}</div>
        <div className={`text-sm ${warning ? 'text-athlete-red' : 'text-white/70'}`}>{value}%</div>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-1">
        <div 
          className={`h-full ${barColor} rounded-full`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <div className="text-xs text-white/60">{description}</div>
    </div>
  );
};

export default RiskFactor;
