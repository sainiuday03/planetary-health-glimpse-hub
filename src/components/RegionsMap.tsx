
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface Region {
  id: string;
  name: string;
  data: {
    temperature: string;
    airQuality: string;
    biodiversity: string;
    precipitation: string;
  };
  color: string;
}

const regions: Region[] = [
  {
    id: 'north-america',
    name: 'North America',
    data: {
      temperature: '+0.9°C above pre-industrial',
      airQuality: 'Moderate (AQI: 62)',
      biodiversity: '-24% species population since 1970',
      precipitation: '+4.2% increase'
    },
    color: 'bg-blue-500'
  },
  {
    id: 'south-america',
    name: 'South America',
    data: {
      temperature: '+0.8°C above pre-industrial',
      airQuality: 'Good (AQI: 45)',
      biodiversity: '-88% species population since 1970',
      precipitation: '+1.5% increase'
    },
    color: 'bg-green-500'
  },
  {
    id: 'europe',
    name: 'Europe',
    data: {
      temperature: '+1.4°C above pre-industrial',
      airQuality: 'Moderate (AQI: 70)',
      biodiversity: '-24% species population since 1970',
      precipitation: '+7.2% increase'
    },
    color: 'bg-yellow-500'
  },
  {
    id: 'africa',
    name: 'Africa',
    data: {
      temperature: '+0.7°C above pre-industrial',
      airQuality: 'Moderate (AQI: 65)',
      biodiversity: '-65% species population since 1970',
      precipitation: '-2.3% decrease'
    },
    color: 'bg-amber-500'
  },
  {
    id: 'asia',
    name: 'Asia',
    data: {
      temperature: '+1.2°C above pre-industrial',
      airQuality: 'Unhealthy (AQI: 112)',
      biodiversity: '-45% species population since 1970',
      precipitation: '+3.1% increase'
    },
    color: 'bg-red-500'
  },
  {
    id: 'oceania',
    name: 'Oceania',
    data: {
      temperature: '+0.8°C above pre-industrial',
      airQuality: 'Good (AQI: 35)',
      biodiversity: '-33% species population since 1970',
      precipitation: '-4.5% decrease'
    },
    color: 'bg-purple-500'
  }
];

const RegionsMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
    toast({
      title: `${region.name} Selected`,
      description: "Viewing regional environmental data",
      duration: 3000
    });
  };

  const handleViewDetails = () => {
    if (selectedRegion) {
      // In a real app, this would navigate to a detailed region page
      toast({
        title: `Exploring ${selectedRegion.name}`,
        description: "Full regional data would load in a real application",
        duration: 3000
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 my-8">
      <h3 className="text-xl font-bold mb-6">Regional Environmental Data</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map Visualization (simplified for this example) */}
        <div className="col-span-2 bg-blue-50 rounded-lg p-6 min-h-[300px] flex flex-wrap gap-3 justify-center items-center">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`${region.color} p-4 rounded-lg text-white cursor-pointer transition-all hover:scale-105 ${
                selectedRegion?.id === region.id ? 'ring-4 ring-offset-2 ring-blue-300' : ''
              }`}
              onClick={() => handleRegionClick(region)}
            >
              <span className="font-medium">{region.name}</span>
            </div>
          ))}
        </div>
        
        {/* Region Details */}
        <div className="col-span-1">
          {selectedRegion ? (
            <Card>
              <CardContent className="p-4">
                <h4 className="text-lg font-semibold mb-3">{selectedRegion.name}</h4>
                <ul className="space-y-3">
                  <li className="flex flex-col">
                    <span className="text-sm text-gray-500">Temperature:</span>
                    <span className="text-earth-blue font-medium">{selectedRegion.data.temperature}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-gray-500">Air Quality:</span>
                    <span className="text-earth-blue font-medium">{selectedRegion.data.airQuality}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-gray-500">Biodiversity:</span>
                    <span className="text-earth-blue font-medium">{selectedRegion.data.biodiversity}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-gray-500">Precipitation:</span>
                    <span className="text-earth-blue font-medium">{selectedRegion.data.precipitation}</span>
                  </li>
                </ul>
                <Button 
                  className="w-full mt-4 bg-earth-blue hover:bg-earth-blue/90"
                  onClick={handleViewDetails}
                >
                  View Full Details
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 h-full flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 mb-2">Select a region from the map to view environmental data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionsMap;
