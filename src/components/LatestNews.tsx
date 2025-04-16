
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "UN Climate Report Shows Accelerating Impacts",
    summary: "Latest IPCC findings indicate climate effects are occurring more rapidly than previously projected.",
    date: "April 14, 2025",
    category: "Climate Science"
  },
  {
    id: 2,
    title: "Ocean Plastic Pollution Reaches New Record Levels",
    summary: "Research shows microplastics have been detected in previously pristine marine environments.",
    date: "April 12, 2025",
    category: "Ocean Health"
  },
  {
    id: 3,
    title: "Biodiversity Conservation Efforts Show Promise in Amazon",
    summary: "New protected areas have led to recovery of several endangered species in the past year.",
    date: "April 10, 2025",
    category: "Biodiversity"
  }
];

const LatestNews = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-white to-blue-50">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Latest Insights</h2>
            <p className="text-gray-500">Updates from planetary health research and initiatives</p>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-earth-blue rounded text-xs font-medium">
                    {item.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.date}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.summary}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button variant="link" className="p-0 text-earth-blue">Read more</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center sm:hidden">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
