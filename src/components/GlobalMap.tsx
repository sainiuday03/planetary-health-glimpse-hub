
import React from 'react';
import { Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GlobalMap = () => {
  const navigate = useNavigate();
  
  const handleMapClick = () => {
    navigate('/about');
  };
  
  return (
    <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl py-20 md:py-28 w-full">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-earth-blue opacity-10 blur-3xl animate-pulse-slow"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div 
          className="h-40 w-40 md:h-60 md:w-60 bg-gradient-to-br from-earth-blue via-earth-teal to-earth-green rounded-full flex items-center justify-center shadow-xl animate-float cursor-pointer transition-transform hover:scale-105"
          onClick={handleMapClick}
        >
          <Globe className="h-20 w-20 md:h-32 md:w-32 text-white" strokeWidth={1} />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-200/50 w-[220px] h-[220px] md:w-[320px] md:h-[320px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/30 w-[300px] h-[300px] md:w-[400px] md:h-[400px]"></div>
      </div>
      
      <div className="absolute bottom-5 right-5 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-gray-500 shadow-sm">
        Live global data visualization
      </div>
    </div>
  );
};

export default GlobalMap;
