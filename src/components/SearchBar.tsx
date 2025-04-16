
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';
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

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
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
  };

  const selectCategory = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category);
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
            onChange={(e) => setQuery(e.target.value)}
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
