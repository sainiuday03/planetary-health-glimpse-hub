
import React, { useState, useEffect } from 'react';
import { Globe, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';

// Sample global data points
const globalDataPoints = [
  { id: 1, name: 'North America', position: { top: '30%', left: '20%' }, value: '26.3°C' },
  { id: 2, name: 'South America', position: { top: '60%', left: '25%' }, value: '27.8°C' },
  { id: 3, name: 'Europe', position: { top: '25%', left: '45%' }, value: '22.1°C' },
  { id: 4, name: 'Africa', position: { top: '45%', left: '48%' }, value: '29.4°C' },
  { id: 5, name: 'Asia', position: { top: '30%', left: '65%' }, value: '24.5°C' },
  { id: 6, name: 'Australia', position: { top: '65%', left: '75%' }, value: '23.7°C' }
];

const GlobalMap = () => {
  const navigate = useNavigate();
  const [rotating, setRotating] = useState(true);
  const [activeDataPoint, setActiveDataPoint] = useState(null);
  const [dataValues, setDataValues] = useState({});
  
  useEffect(() => {
    // Simulate changing global data
    const interval = setInterval(() => {
      const newValues = {};
      globalDataPoints.forEach(point => {
        const baseTemp = parseFloat(point.value);
        const fluctuation = (Math.random() * 0.8 - 0.4).toFixed(1); // Random variation between -0.4 and +0.4
        newValues[point.id] = `${(baseTemp + parseFloat(fluctuation)).toFixed(1)}°C`;
      });
      setDataValues(newValues);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleMapClick = () => {
    setRotating(!rotating);
    toast.info(rotating ? "Globe rotation paused" : "Globe rotation resumed");
  };

  const handleDataPointClick = (pointId) => {
    setActiveDataPoint(pointId === activeDataPoint ? null : pointId);
    const point = globalDataPoints.find(p => p.id === pointId);
    if (point) {
      toast.info(`Selected region: ${point.name}`);
    }
  };
  
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl py-20 md:py-28 w-full">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-earth-blue opacity-10 blur-3xl animate-pulse-slow"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div 
          className={`h-40 w-40 md:h-60 md:w-60 bg-gradient-to-br from-earth-blue via-earth-teal to-earth-green rounded-full flex items-center justify-center shadow-xl cursor-pointer transition-transform hover:scale-105 ${rotating ? 'animate-float' : ''}`}
          onClick={handleMapClick}
        >
          <Globe className="h-20 w-20 md:h-32 md:w-32 text-white" strokeWidth={1} />
        </div>
        
        {/* Data points */}
        {globalDataPoints.map((point) => (
          <div
            key={point.id}
            className={`absolute w-3 h-3 rounded-full bg-red-500 cursor-pointer
              ${activeDataPoint === point.id ? 'ring-2 ring-white scale-150' : 'hover:scale-125'}
              animate-pulse`}
            style={{ top: point.position.top, left: point.position.left }}
            onClick={() => handleDataPointClick(point.id)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="block w-full h-full"></span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{point.name}</p>
                  <p className="text-sm">Temperature: {dataValues[point.id] || point.value}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {activeDataPoint === point.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white p-2 rounded shadow-md text-xs whitespace-nowrap">
                <p className="font-bold">{point.name}</p>
                <p>Temp: {dataValues[point.id] || point.value}</p>
              </div>
            )}
          </div>
        ))}
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-200/50 w-[220px] h-[220px] md:w-[320px] md:h-[320px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/30 w-[300px] h-[300px] md:w-[400px] md:h-[400px]"></div>
      </div>
      
      <div className="absolute bottom-5 right-5 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-gray-500 shadow-sm flex items-center gap-1">
        <Info className="h-3 w-3" /> Live global data visualization
      </div>
      
      <button
        onClick={handleDashboardClick}
        className="absolute bottom-5 left-5 bg-earth-blue text-white px-3 py-2 rounded-lg text-xs shadow-sm hover:bg-earth-blue/90 transition-colors"
      >
        View Full Dashboard
      </button>
    </div>
  );
};

export default GlobalMap;
