
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Clock, Sparkles, Filter, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from 'sonner';

const searchCategories = [
  "Climate",
  "Ocean",
  "Biodiversity",
  "Pollution",
  "Energy",
  "Health",
  "Agriculture"
];

// Sample search suggestions
const searchSuggestions = [
  "Rising sea levels",
  "Air quality index",
  "Deforestation rates",
  "Renewable energy growth",
  "Species extinction",
  "Carbon emissions"
];

// Sample search results
const mockSearchResults = {
  "Rising sea levels": {
    title: "Rising Sea Levels",
    data: [
      { year: 2018, value: 3.1 },
      { year: 2019, value: 3.4 },
      { year: 2020, value: 3.6 },
      { year: 2021, value: 3.9 },
      { year: 2022, value: 4.2 },
      { year: 2023, value: 4.5 },
      { year: 2024, value: 4.7 }
    ],
    unit: "mm/year",
    trend: "increasing",
    description: "Global mean sea level has risen about 8–9 inches (21–24 centimeters) since 1880."
  },
  "Air quality index": {
    title: "Air Quality Index",
    data: [
      { region: "North America", value: 45 },
      { region: "Europe", value: 58 },
      { region: "Asia", value: 112 },
      { region: "Africa", value: 73 },
      { region: "South America", value: 61 },
      { region: "Australia", value: 32 }
    ],
    unit: "AQI",
    trend: "stable",
    description: "Air Quality Index values below 50 represent good air quality, while values over 100 are considered unhealthy."
  },
  "Deforestation rates": {
    title: "Deforestation Rates",
    data: [
      { region: "Amazon", value: 1.1 },
      { region: "Congo Basin", value: 0.8 },
      { region: "Southeast Asia", value: 1.7 },
      { region: "Central America", value: 0.9 }
    ],
    unit: "% per year",
    trend: "decreasing",
    description: "Deforestation rates have decreased globally but remain high in specific regions."
  },
  "Renewable energy growth": {
    title: "Renewable Energy Growth",
    data: [
      { year: 2019, value: 12.2 },
      { year: 2020, value: 13.5 },
      { year: 2021, value: 15.1 },
      { year: 2022, value: 16.8 },
      { year: 2023, value: 18.5 },
      { year: 2024, value: 20.2 }
    ],
    unit: "% of global energy",
    trend: "increasing",
    description: "Renewable energy sources continue to grow as a percentage of total global energy production."
  },
  "Species extinction": {
    title: "Species Extinction",
    data: [
      { group: "Mammals", value: 26 },
      { group: "Birds", value: 14 },
      { group: "Reptiles", value: 22 },
      { group: "Amphibians", value: 41 },
      { group: "Fish", value: 15 },
      { group: "Insects", value: 23 }
    ],
    unit: "% at risk",
    trend: "increasing",
    description: "Current extinction rates are 100-1000 times higher than natural background rates."
  },
  "Carbon emissions": {
    title: "Carbon Emissions",
    data: [
      { year: 2018, value: 36.8 },
      { year: 2019, value: 37.1 },
      { year: 2020, value: 34.8 },
      { year: 2021, value: 36.4 },
      { year: 2022, value: 36.8 },
      { year: 2023, value: 36.9 }
    ],
    unit: "GT CO2/year",
    trend: "stable",
    description: "Global carbon emissions have plateaued but remain far above sustainable levels."
  }
};

// Generic text for queries not in our mock results
const genericResult = {
  title: "Search Results",
  description: "Environmental data related to your search",
  data: [
    { year: 2020, value: 42 },
    { year: 2021, value: 45 },
    { year: 2022, value: 48 },
    { year: 2023, value: 52 },
    { year: 2024, value: 55 }
  ],
  unit: "index value",
  trend: "varying"
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast: hookToast } = useToast();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    try {
      const savedSearches = localStorage.getItem('recentSearches');
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error("Error loading recent searches:", error);
      // Clear corrupted data
      localStorage.removeItem('recentSearches');
    }
  }, []);

  useEffect(() => {
    // Close suggestions when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const saveSearch = (searchQuery: string) => {
    try {
      const updatedSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error("Error saving search:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setErrorMessage("Please enter a search term");
      return;
    }
    
    setIsSearching(true);
    setShowSuggestions(false);
    setErrorMessage(null);
    
    // Save this search to recent searches
    saveSearch(query);
    
    // Simulated search functionality
    setTimeout(() => {
      setIsSearching(false);
      
      // Check if there's a matching result in our mock data
      const exactMatch = Object.keys(mockSearchResults).find(
        key => key.toLowerCase() === query.toLowerCase()
      );
      
      const closeMatch = Object.keys(mockSearchResults).find(
        key => key.toLowerCase().includes(query.toLowerCase())
      );
      
      if (exactMatch) {
        setSearchResult({
          query,
          category: activeCategory,
          ...mockSearchResults[exactMatch]
        });
      } else if (closeMatch) {
        setSearchResult({
          query,
          category: activeCategory,
          ...mockSearchResults[closeMatch]
        });
      } else {
        // Use generic result structure for non-matching queries
        setSearchResult({
          query,
          category: activeCategory,
          ...genericResult
        });
      }
      
      hookToast({
        title: "Search Complete",
        description: `Found results for "${query}"${activeCategory ? ` in ${activeCategory}` : ''}`,
        duration: 3000
      });
    }, 1200);
  };

  const clearSearch = () => {
    setQuery("");
    setActiveCategory(null);
    setShowSuggestions(false);
    setSearchResult(null);
    setErrorMessage(null);
  };

  const selectCategory = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category);
    setErrorMessage(null);
  };

  const handleSearchInputFocus = () => {
    if (query.length === 0 && (recentSearches.length > 0 || searchSuggestions.length > 0)) {
      setShowSuggestions(true);
    }
    setErrorMessage(null);
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setErrorMessage(null);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
    toast("Recent searches cleared");
  };

  return (
    <div ref={searchContainerRef} className="w-full bg-white rounded-lg p-4 shadow-sm border">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search indicators, regions, or resources..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setErrorMessage(null);
              if (e.target.value.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onFocus={handleSearchInputFocus}
            className={`pl-10 pr-10 ${errorMessage ? 'border-red-500' : ''}`}
          />
          {query && (
            <button 
              type="button" 
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={clearSearch}
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
          
          {errorMessage && (
            <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
          )}
          
          {/* Suggestions dropdown */}
          {showSuggestions && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg animate-fade-in">
              {recentSearches.length > 0 && (
                <div className="p-2">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Clock size={14} /> Recent Searches
                    </p>
                    <button 
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-400 hover:text-red-500"
                      type="button"
                    >
                      Clear
                    </button>
                  </div>
                  <ul className="divide-y">
                    {recentSearches.map((search, index) => (
                      <li 
                        key={`recent-${index}`} 
                        className="py-1 px-2 hover:bg-blue-50 rounded cursor-pointer"
                        onClick={() => selectSuggestion(search)}
                      >
                        {search}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {searchSuggestions.length > 0 && (
                <div className="p-2 border-t">
                  <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                    <Sparkles size={14} /> Suggested Searches
                  </p>
                  <ul className="divide-y">
                    {searchSuggestions
                      .filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
                      .slice(0, 5)
                      .map((suggestion, index) => (
                        <li 
                          key={`suggestion-${index}`} 
                          className="py-1 px-2 hover:bg-blue-50 rounded cursor-pointer"
                          onClick={() => selectSuggestion(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {searchCategories.map((category) => (
            <Button
              key={category}
              type="button"
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className={activeCategory === category ? "bg-earth-blue hover:bg-earth-blue/90" : ""}
              onClick={() => selectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <Button 
          type="submit" 
          className="bg-earth-blue hover:bg-earth-blue/90"
          disabled={!query || isSearching}
        >
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </form>

      {/* Search Results Section */}
      {searchResult && (
        <div className="mt-6 animate-fade-in">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{searchResult.title}</CardTitle>
                  {searchResult.category && (
                    <span className="inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      <Filter className="h-3 w-3 mr-1" /> 
                      {searchResult.category}
                    </span>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 mb-4">
                {searchResult.description}
              </div>
              
              <div className="bg-gray-50 rounded-md p-4">
                <h4 className="text-sm font-medium mb-2">Data Summary</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-2">{searchResult.data[0].year ? "Year" : 
                             searchResult.data[0].region ? "Region" : 
                             searchResult.data[0].group ? "Group" : "Category"}</th>
                        <th className="px-4 py-2">Value ({searchResult.unit})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResult.data.map((item: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{item.year || item.region || item.group}</td>
                          <td className="px-4 py-2">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex items-start gap-2 text-sm">
                  <Info size={16} className="text-gray-500 mt-0.5" />
                  <p className="text-gray-500">
                    Overall trend: <span className={`font-medium ${
                      searchResult.trend === "increasing" ? "text-red-600" :
                      searchResult.trend === "decreasing" ? "text-green-600" :
                      "text-yellow-600"
                    }`}>
                      {searchResult.trend}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button size="sm" variant="outline">
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
