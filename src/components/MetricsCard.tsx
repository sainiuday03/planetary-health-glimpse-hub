
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  color: 'blue' | 'green' | 'purple' | 'teal';
  icon: React.ReactNode;
}

const MetricsCard = ({ title, value, unit, trend, trendValue, color, icon }: MetricsCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return {
          bgLight: 'bg-blue-50',
          text: 'text-earth-blue',
          iconBg: 'bg-blue-100'
        };
      case 'green':
        return {
          bgLight: 'bg-green-50',
          text: 'text-earth-green',
          iconBg: 'bg-green-100'
        };
      case 'purple':
        return {
          bgLight: 'bg-purple-50',
          text: 'text-earth-purple',
          iconBg: 'bg-purple-100'
        };
      case 'teal':
        return {
          bgLight: 'bg-teal-50',
          text: 'text-earth-teal',
          iconBg: 'bg-teal-100'
        };
      default:
        return {
          bgLight: 'bg-blue-50',
          text: 'text-earth-blue',
          iconBg: 'bg-blue-100'
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <Card className={`${colorClasses.bgLight} border-0 card-hover`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <div className="flex items-end gap-1">
              <h3 className={`text-2xl font-bold ${colorClasses.text}`}>{value}</h3>
              <span className="text-xs text-gray-500 mb-1">{unit}</span>
            </div>
          </div>
          <div className={`${colorClasses.iconBg} p-2 rounded-full`}>
            {icon}
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          {trend === 'up' && (
            <TrendingUp className="h-4 w-4 text-earth-green" />
          )}
          {trend === 'down' && (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-xs font-medium ${
            trend === 'up' ? 'text-earth-green' : 
            trend === 'down' ? 'text-red-500' : 'text-gray-500'
          }`}>
            {trendValue}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
