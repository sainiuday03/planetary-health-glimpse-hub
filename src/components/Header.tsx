
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-earth-blue" />
          <h1 className="text-xl font-bold">Planetary Health Dashboard</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-sm font-medium hover:text-earth-blue transition-colors" href="#">Overview</a>
          <a className="text-sm font-medium hover:text-earth-blue transition-colors" href="#">Indicators</a>
          <a className="text-sm font-medium hover:text-earth-blue transition-colors" href="#">Regions</a>
          <a className="text-sm font-medium hover:text-earth-blue transition-colors" href="#">Resources</a>
          <a className="text-sm font-medium hover:text-earth-blue transition-colors" href="#">About</a>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            Sign In
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-earth-blue to-earth-purple hover:opacity-90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
