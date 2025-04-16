
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Clock, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { toast } = useToast();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const saveSearch = (searchQuery: string) => {
    const updatedSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setShowSuggestions(false);
    
    // Save this search to recent searches
    saveSearch(query);
    
    // Simulated search functionality
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Search Results",
        description: `Found results for "${query}"${activeCategory ? ` in ${activeCategory}` : ''}`,
        duration: 3000
      });
    }, 800);
  };

  const clearSearch = () => {
    setQuery("");
    setActiveCategory(null);
    setShowSuggestions(false);
  };

  const selectCategory = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  const handleSearchInputFocus = () => {
    if (query.length === 0 && (recentSearches.length > 0 || searchSuggestions.length > 0)) {
      setShowSuggestions(true);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
    toast({
      title: "Recent Searches Cleared",
      description: "Your search history has been cleared.",
      duration: 2000
    });
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-sm border">
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
              if (e.target.value.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onFocus={handleSearchInputFocus}
            onBlur={() => {
              // Delay hiding suggestions to allow for clicking
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            className="pl-10 pr-10"
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
    </div>
  );
};

export default SearchBar;
