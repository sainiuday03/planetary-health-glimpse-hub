
import React from 'react';
import Header from '@/components/Header';
import GlobalMap from '@/components/GlobalMap';
import KeyIndicators from '@/components/KeyIndicators';
import LatestNews from '@/components/LatestNews';
import RegionsMap from '@/components/RegionsMap';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
                  Monitoring Our <span className="gradient-text">Planet's Health</span> in Real-Time
                </h1>
                <p className="text-gray-600 mb-6 md:mb-8 max-w-xl md:text-lg">
                  Track critical environmental indicators, explore regional data, and understand the complex interconnections that shape our planet's wellbeing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button className="bg-earth-blue hover:bg-blue-600 text-white">
                    Explore Dashboard
                  </Button>
                  <Button variant="outline" className="group">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 mt-8 md:mt-0 w-full max-w-xl">
                <GlobalMap />
              </div>
            </div>
          </div>
        </section>
        
        {/* Search Section */}
        <section className="py-6 bg-blue-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Search Environmental Data</h2>
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </section>
        
        {/* Key Indicators Section */}
        <section id="indicators">
          <KeyIndicators />
        </section>
        
        {/* Regional Data Section */}
        <section id="regions" className="py-10">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-2">Regional Impact</h2>
            <p className="text-gray-500 mb-6">Explore environmental data across different geographic regions</p>
            
            <RegionsMap />
          </div>
        </section>
        
        {/* Latest Insights Section */}
        <section id="resources">
          <LatestNews />
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-earth-blue to-earth-purple text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Global Effort</h2>
            <p className="max-w-2xl mx-auto text-white/90 mb-8">
              Help monitor and protect our planet by contributing data, sharing insights, and collaborating with researchers and policymakers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-earth-blue hover:bg-white/90">
                Become a Contributor
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                Partner with Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
