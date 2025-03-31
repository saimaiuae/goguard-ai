
import React from 'react';

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step = ({ number, title, description }: StepProps) => {
  return (
    <div className="flex gap-4">
      <div 
        className="w-8 h-8 rounded-full flex-center bg-athlete-blue flex-shrink-0"
      >
        {number}
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Step;
