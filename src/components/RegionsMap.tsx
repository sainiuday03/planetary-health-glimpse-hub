
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ArrowUpRight, ChevronDown, ChevronUp, Download, Bar, Thermometer, Wind, Droplets } from 'lucide-react';

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
  detailedData?: {
    temperatureTrend: { year: number; value: number }[];
    precipitationTrend: { year: number; value: number }[];
    airQualityTrend: { year: number; value: number }[];
    biodiversityLoss: { species: string; percentLost: number }[];
    environmentalChallenges: string[];
    conservationEfforts: string[];
  };
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
    color: 'bg-blue-500',
    detailedData: {
      temperatureTrend: [
        { year: 2018, value: 0.7 },
        { year: 2019, value: 0.8 },
        { year: 2020, value: 0.8 },
        { year: 2021, value: 0.9 },
        { year: 2022, value: 0.9 },
        { year: 2023, value: 0.9 }
      ],
      precipitationTrend: [
        { year: 2018, value: 3.2 },
        { year: 2019, value: 3.4 },
        { year: 2020, value: 3.7 },
        { year: 2021, value: 3.9 },
        { year: 2022, value: 4.0 },
        { year: 2023, value: 4.2 }
      ],
      airQualityTrend: [
        { year: 2018, value: 58 },
        { year: 2019, value: 59 },
        { year: 2020, value: 56 },
        { year: 2021, value: 60 },
        { year: 2022, value: 61 },
        { year: 2023, value: 62 }
      ],
      biodiversityLoss: [
        { species: 'Mammals', percentLost: 16 },
        { species: 'Birds', percentLost: 12 },
        { species: 'Reptiles', percentLost: 24 },
        { species: 'Amphibians', percentLost: 39 }
      ],
      environmentalChallenges: [
        'Wildfires in western regions',
        'Water scarcity in southwestern areas',
        'Coastal erosion along eastern seaboard',
        'Invasive species in Great Lakes region'
      ],
      conservationEfforts: [
        'National park expansion',
        'Renewable energy transition',
        'Urban green infrastructure',
        'Wildlife corridor development'
      ]
    }
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
    color: 'bg-green-500',
    detailedData: {
      temperatureTrend: [
        { year: 2018, value: 0.6 },
        { year: 2019, value: 0.7 },
        { year: 2020, value: 0.7 },
        { year: 2021, value: 0.8 },
        { year: 2022, value: 0.8 },
        { year: 2023, value: 0.8 }
      ],
      precipitationTrend: [
        { year: 2018, value: 0.8 },
        { year: 2019, value: 1.0 },
        { year: 2020, value: 1.1 },
        { year: 2021, value: 1.2 },
        { year: 2022, value: 1.4 },
        { year: 2023, value: 1.5 }
      ],
      airQualityTrend: [
        { year: 2018, value: 47 },
        { year: 2019, value: 48 },
        { year: 2020, value: 46 },
        { year: 2021, value: 45 },
        { year: 2022, value: 46 },
        { year: 2023, value: 45 }
      ],
      biodiversityLoss: [
        { species: 'Mammals', percentLost: 33 },
        { species: 'Birds', percentLost: 25 },
        { species: 'Reptiles', percentLost: 46 },
        { species: 'Amphibians', percentLost: 65 }
      ],
      environmentalChallenges: [
        'Amazon deforestation',
        'Mining pollution',
        'Agricultural expansion',
        'Water pollution in major river systems'
      ],
      conservationEfforts: [
        'Indigenous land rights protection',
        'Reforestation initiatives',
        'Sustainable agriculture practices',
        'Eco-tourism development'
      ]
    }
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
    color: 'bg-yellow-500',
    detailedData: {
      temperatureTrend: [
        { year: 2018, value: 1.2 },
        { year: 2019, value: 1.3 },
        { year: 2020, value: 1.3 },
        { year: 2021, value: 1.4 },
        { year: 2022, value: 1.4 },
        { year: 2023, value: 1.4 }
      ],
      precipitationTrend: [
        { year: 2018, value: 5.6 },
        { year: 2019, value: 5.9 },
        { year: 2020, value: 6.3 },
        { year: 2021, value: 6.8 },
        { year: 2022, value: 7.0 },
        { year: 2023, value: 7.2 }
      ],
      airQualityTrend: [
        { year: 2018, value: 68 },
        { year: 2019, value: 72 },
        { year: 2020, value: 65 },
        { year: 2021, value: 69 },
        { year: 2022, value: 71 },
        { year: 2023, value: 70 }
      ],
      biodiversityLoss: [
        { species: 'Mammals', percentLost: 14 },
        { species: 'Birds', percentLost: 11 },
        { species: 'Reptiles', percentLost: 22 },
        { species: 'Amphibians', percentLost: 28 }
      ],
      environmentalChallenges: [
        'Urban air pollution',
        'Agricultural runoff',
        'Loss of wetlands',
        'Plastic pollution in marine environments'
      ],
      conservationEfforts: [
        'Green Deal implementation',
        'Renewable energy expansion',
        'Urban sustainability initiatives',
        'Circular economy policies'
      ]
    }
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
    color: 'bg-amber-500',
    detailedData: {
      temperatureTrend: [
        { year: 2018, value: 0.5 },
        { year: 2019, value: 0.6 },
        { year: 2020, value: 0.6 },
        { year: 2021, value: 0.7 },
        { year: 2022, value: 0.7 },
        { year: 2023, value: 0.7 }
      ],
      precipitationTrend: [
        { year: 2018, value: -1.8 },
        { year: 2019, value: -1.9 },
        { year: 2020, value: -2.0 },
        { year: 2021, value: -2.1 },
        { year: 2022, value: -2.2 },
        { year: 2023, value: -2.3 }
      ],
      airQualityTrend: [
        { year: 2018, value: 62 },
        { year: 2019, value: 63 },
        { year: 2020, value: 64 },
        { year: 2021, value: 64 },
        { year: 2022, value: 66 },
        { year: 2023, value: 65 }
      ],
      biodiversityLoss: [
        { species: 'Mammals', percentLost: 38 },
        { species: 'Birds', percentLost: 27 },
        { species: 'Reptiles', percentLost: 42 },
        { species: 'Amphibians', percentLost: 53 }
      ],
      environmentalChallenges: [
        'Desertification',
        'Water scarcity',
        'Deforestation',
        'Land degradation from mining'
      ],
      conservationEfforts: [
        'Great Green Wall initiative',
        'Wildlife conservation areas',
        'Community-based resource management',
        'Sustainable agriculture programs'
      ]
    }
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
    color: 'bg-red-500',
    detailedData: {
      temperatureTrend: [
        { year: 2018, value: 1.0 },
        { year: 2019, value: 1.1 },
        { year: 2020, value: 1.1 },
        { year: 2021, value: 1.2 },
        { year: 2022, value: 1.2 },
        { year: 2023, value: 1.2 }
      ],
      precipitationTrend: [
        { year: 2018, value: 2.5 },
        { year: 2019, value: 2.7 },
        { year: 2020, value: 2.8 },
        { year: 2021, value: 3.0 },
        { year: 2022, value: 3.0 },
        { year: 2023, value: 3.1 }
      ],
      airQualityTrend: [
        { year: 2018, value: 108 },
        { year: 2019, value: 115 },
        { year: 2020, value: 103 },
        { year: 2021, value: 110 },
        { year: 2022, value: 113 },
        { year: 2023, value: 112 }
      ],
      biodiversityLoss: [
        { species: 'Mammals', percentLost: 26 },
        { species: 'Birds', percentLost: 19 },
        { species: 'Reptiles', percentLost: 32 },
        { species: 'Amphibians', percentLost: 48 }
      ],
      environmentalChallenges: [
        'Air pollution in major cities',
        'Water pollution in river systems',
        'Deforestation in Southeast Asia',
        'Plastic pollution in coastal regions'
      ],
      conservationEfforts: [
        'Clean air initiatives',
        'Reforestation programs',
        'Renewable energy expansion',
        'River cleanup projects'
      ]
    }
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
    color: 'bg-purple-500',
    detailedData: {
      temperatureTrend: [
        { year: 2018, value: 0.6 },
        { year: 2019, value: 0.7 },
        { year: 2020, value: 0.7 },
        { year: 2021, value: 0.8 },
        { year: 2022, value: 0.8 },
        { year: 2023, value: 0.8 }
      ],
      precipitationTrend: [
        { year: 2018, value: -3.6 },
        { year: 2019, value: -3.8 },
        { year: 2020, value: -4.0 },
        { year: 2021, value: -4.2 },
        { year: 2022, value: -4.4 },
        { year: 2023, value: -4.5 }
      ],
      airQualityTrend: [
        { year: 2018, value: 37 },
        { year: 2019, value: 38 },
        { year: 2020, value: 36 },
        { year: 2021, value: 35 },
        { year: 2022, value: 34 },
        { year: 2023, value: 35 }
      ],
      biodiversityLoss: [
        { species: 'Mammals', percentLost: 21 },
        { species: 'Birds', percentLost: 18 },
        { species: 'Reptiles', percentLost: 26 },
        { species: 'Amphibians', percentLost: 37 }
      ],
      environmentalChallenges: [
        'Coral reef bleaching',
        'Sea level rise threatening island nations',
        'Bushfires in Australia',
        'Invasive species'
      ],
      conservationEfforts: [
        'Marine protected areas',
        'Indigenous land management',
        'Coastal resilience programs',
        'Renewable energy transition'
      ]
    }
  }
];

const RegionsMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<string | null>(null);
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

  const toggleDetails = (section: string) => {
    setDetailsOpen(detailsOpen === section ? null : section);
  };

  const handleDownloadData = (regionName: string) => {
    toast({
      title: `Downloading ${regionName} Data`,
      description: "The data report is being prepared for download",
      duration: 3000
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 my-8">
      <h3 className="text-xl font-bold mb-6">Regional Environmental Data</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map Visualization */}
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
                
                {/* View Details Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full mt-4 bg-earth-blue hover:bg-earth-blue/90"
                    >
                      View Full Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center">
                        <div className={`w-4 h-4 rounded-full ${selectedRegion.color}`}></div>
                        <span className="ml-2">{selectedRegion.name} Environmental Data</span>
                      </DialogTitle>
                      <DialogDescription>
                        Comprehensive environmental metrics and trends
                      </DialogDescription>
                    </DialogHeader>
                    
                    {selectedRegion.detailedData && (
                      <div className="space-y-6">
                        {/* Temperature Section */}
                        <div className="border rounded-lg overflow-hidden">
                          <div 
                            className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleDetails('temperature')}
                          >
                            <div className="flex items-center">
                              <Thermometer className="text-red-500 mr-2 h-5 w-5" />
                              <h3 className="font-medium">Temperature Trends</h3>
                            </div>
                            {detailsOpen === 'temperature' ? 
                              <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            }
                          </div>
                          
                          {detailsOpen === 'temperature' && (
                            <div className="p-4 animate-fade-in">
                              <p className="mb-3">Historical temperature changes relative to pre-industrial levels:</p>
                              <div className="overflow-x-auto">
                                <table className="min-w-full">
                                  <thead>
                                    <tr className="bg-gray-50">
                                      <th className="px-4 py-2 text-left">Year</th>
                                      <th className="px-4 py-2 text-left">Temperature Change (°C)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedRegion.detailedData.temperatureTrend.map((item, i) => (
                                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-2">{item.year}</td>
                                        <td className="px-4 py-2 text-red-600">+{item.value}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Precipitation Section */}
                        <div className="border rounded-lg overflow-hidden">
                          <div 
                            className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleDetails('precipitation')}
                          >
                            <div className="flex items-center">
                              <Droplets className="text-blue-500 mr-2 h-5 w-5" />
                              <h3 className="font-medium">Precipitation Patterns</h3>
                            </div>
                            {detailsOpen === 'precipitation' ? 
                              <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            }
                          </div>
                          
                          {detailsOpen === 'precipitation' && (
                            <div className="p-4 animate-fade-in">
                              <p className="mb-3">Annual precipitation change (%) compared to 1970-2000 baseline:</p>
                              <div className="overflow-x-auto">
                                <table className="min-w-full">
                                  <thead>
                                    <tr className="bg-gray-50">
                                      <th className="px-4 py-2 text-left">Year</th>
                                      <th className="px-4 py-2 text-left">Precipitation Change (%)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedRegion.detailedData.precipitationTrend.map((item, i) => (
                                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-2">{item.year}</td>
                                        <td className={`px-4 py-2 ${item.value >= 0 ? 'text-blue-600' : 'text-amber-600'}`}>
                                          {item.value >= 0 ? '+' : ''}{item.value}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Air Quality Section */}
                        <div className="border rounded-lg overflow-hidden">
                          <div 
                            className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleDetails('air')}
                          >
                            <div className="flex items-center">
                              <Wind className="text-purple-500 mr-2 h-5 w-5" />
                              <h3 className="font-medium">Air Quality Index</h3>
                            </div>
                            {detailsOpen === 'air' ? 
                              <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            }
                          </div>
                          
                          {detailsOpen === 'air' && (
                            <div className="p-4 animate-fade-in">
                              <p className="mb-3">Average annual Air Quality Index (AQI):</p>
                              <div className="overflow-x-auto">
                                <table className="min-w-full">
                                  <thead>
                                    <tr className="bg-gray-50">
                                      <th className="px-4 py-2 text-left">Year</th>
                                      <th className="px-4 py-2 text-left">AQI Value</th>
                                      <th className="px-4 py-2 text-left">Category</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedRegion.detailedData.airQualityTrend.map((item, i) => (
                                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-2">{item.year}</td>
                                        <td className="px-4 py-2">{item.value}</td>
                                        <td className="px-4 py-2">
                                          <span className={`px-2 py-1 rounded-full text-xs ${
                                            item.value <= 50 ? 'bg-green-100 text-green-800' :
                                            item.value <= 100 ? 'bg-yellow-100 text-yellow-800' :
                                            item.value <= 150 ? 'bg-orange-100 text-orange-800' :
                                            'bg-red-100 text-red-800'
                                          }`}>
                                            {item.value <= 50 ? 'Good' :
                                             item.value <= 100 ? 'Moderate' :
                                             item.value <= 150 ? 'Unhealthy for Sensitive Groups' :
                                             'Unhealthy'}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Biodiversity Section */}
                        <div className="border rounded-lg overflow-hidden">
                          <div 
                            className="bg-gray-50 p-3 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleDetails('biodiversity')}
                          >
                            <div className="flex items-center">
                              <Bar className="text-green-500 mr-2 h-5 w-5" />
                              <h3 className="font-medium">Biodiversity Status</h3>
                            </div>
                            {detailsOpen === 'biodiversity' ? 
                              <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            }
                          </div>
                          
                          {detailsOpen === 'biodiversity' && (
                            <div className="p-4 animate-fade-in">
                              <p className="mb-3">Species population decline since 1970:</p>
                              <div className="overflow-x-auto">
                                <table className="min-w-full">
                                  <thead>
                                    <tr className="bg-gray-50">
                                      <th className="px-4 py-2 text-left">Species Group</th>
                                      <th className="px-4 py-2 text-left">Population Loss (%)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedRegion.detailedData.biodiversityLoss.map((item, i) => (
                                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-2">{item.species}</td>
                                        <td className="px-4 py-2 text-red-600">-{item.percentLost}%</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              
                              <div className="mt-4 space-y-3">
                                <div>
                                  <h4 className="font-medium">Key Environmental Challenges</h4>
                                  <ul className="list-disc pl-5 mt-2">
                                    {selectedRegion.detailedData.environmentalChallenges.map((challenge, i) => (
                                      <li key={i} className="text-sm">{challenge}</li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium">Conservation Efforts</h4>
                                  <ul className="list-disc pl-5 mt-2">
                                    {selectedRegion.detailedData.conservationEfforts.map((effort, i) => (
                                      <li key={i} className="text-sm">{effort}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-6">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleDownloadData(selectedRegion.name)}
                      >
                        <Download className="h-4 w-4" /> Download Data
                      </Button>
                      <DialogClose asChild>
                        <Button size="sm">Close</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
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
