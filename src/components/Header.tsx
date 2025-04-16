
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
