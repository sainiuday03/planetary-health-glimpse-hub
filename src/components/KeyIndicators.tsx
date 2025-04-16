
import React from 'react';
import { Thermometer, Droplets, Wind, CloudRain } from 'lucide-react';
import MetricsCard from './MetricsCard';

const KeyIndicators = () => {
  return (
    <section className="py-10">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-2">Key Indicators</h2>
        <p className="text-gray-500 mb-6">Monitoring critical planetary health metrics in real-time</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard
            title="Global Temperature"
            value="1.1"
            unit="°C above pre-industrial"
            trend="up"
            trendValue="0.2°C from last decade"
            color="blue"
            icon={<Thermometer className="h-5 w-5 text-earth-blue" />}
          />
          
          <MetricsCard
            title="Ocean Acidification"
            value="8.07"
            unit="pH"
            trend="down"
            trendValue="-0.1 pH since 1990"
            color="teal"
            icon={<Droplets className="h-5 w-5 text-earth-teal" />}
          />
          
          <MetricsCard
            title="Air Quality Index"
            value="65"
            unit="AQI"
            trend="neutral"
            trendValue="No significant change"
            color="green"
            icon={<Wind className="h-5 w-5 text-earth-green" />}
          />
          
          <MetricsCard
            title="Precipitation Change"
            value="4.5"
            unit="% increase"
            trend="up"
            trendValue="Regional variations significant"
            color="purple"
            icon={<CloudRain className="h-5 w-5 text-earth-purple" />}
          />
        </div>
      </div>
    </section>
  );
};

export default KeyIndicators;
