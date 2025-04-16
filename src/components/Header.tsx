
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-earth-blue" />
            <h1 className="text-xl font-bold">Planetary Health Dashboard</h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link className="text-sm font-medium hover:text-earth-blue transition-colors" to="/">Overview</Link>
          <Link className="text-sm font-medium hover:text-earth-blue transition-colors" to="/#indicators">Indicators</Link>
          <Link className="text-sm font-medium hover:text-earth-blue transition-colors" to="/#regions">Regions</Link>
          <Link className="text-sm font-medium hover:text-earth-blue transition-colors" to="/#resources">Resources</Link>
          <Link className="text-sm font-medium hover:text-earth-blue transition-colors" to="/about">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={() => navigate("/signin")}>
            Sign In
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-earth-blue to-earth-purple hover:opacity-90" onClick={() => navigate("/signup")}>
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-b z-10 animate-fade-in">
          <div className="container py-4">
            <nav className="flex flex-col gap-4">
              <Link 
                className="px-4 py-2 hover:bg-blue-50 rounded-md transition-colors" 
                to="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                Overview
              </Link>
              <Link 
                className="px-4 py-2 hover:bg-blue-50 rounded-md transition-colors" 
                to="/#indicators"
                onClick={() => setMobileMenuOpen(false)}
              >
                Indicators
              </Link>
              <Link 
                className="px-4 py-2 hover:bg-blue-50 rounded-md transition-colors" 
                to="/#regions"
                onClick={() => setMobileMenuOpen(false)}
              >
                Regions
              </Link>
              <Link 
                className="px-4 py-2 hover:bg-blue-50 rounded-md transition-colors" 
                to="/#resources"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                className="px-4 py-2 hover:bg-blue-50 rounded-md transition-colors" 
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="border-t my-2"></div>
              <div className="flex gap-2 px-4">
                <Button variant="outline" className="w-full" onClick={() => {
                  navigate("/signin");
                  setMobileMenuOpen(false);
                }}>
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-to-r from-earth-blue to-earth-purple" onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}>
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
