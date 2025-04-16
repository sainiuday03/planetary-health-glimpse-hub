
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Check if user is logged in on mount and route change
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setIsLoggedIn(true);
        setUserName(user.name || user.email.split('@')[0]);
      } catch (e) {
        console.error("Failed to parse user data:", e);
        localStorage.removeItem('user');
      }
    }
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast.success("Successfully logged out");
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
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
          <Link 
            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-earth-blue' : 'hover:text-earth-blue'}`} 
            to="/"
          >
            Overview
          </Link>
          <Link 
            className={`text-sm font-medium transition-colors ${isActive('/#indicators') ? 'text-earth-blue' : 'hover:text-earth-blue'}`} 
            to="/#indicators"
          >
            Indicators
          </Link>
          <Link 
            className={`text-sm font-medium transition-colors ${isActive('/#regions') ? 'text-earth-blue' : 'hover:text-earth-blue'}`} 
            to="/#regions"
          >
            Regions
          </Link>
          <Link 
            className={`text-sm font-medium transition-colors ${isActive('/#resources') ? 'text-earth-blue' : 'hover:text-earth-blue'}`} 
            to="/#resources"
          >
            Resources
          </Link>
          <Link 
            className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-earth-blue' : 'hover:text-earth-blue'}`} 
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link 
            className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-earth-blue' : 'hover:text-earth-blue'}`} 
            to="/about"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User size={18} />
                  <span className="hidden sm:inline">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-earth-blue to-earth-purple hover:opacity-90" onClick={() => navigate("/signup")}>
                Get Started
              </Button>
            </>
          )}
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
                className={`px-4 py-2 rounded-md transition-colors ${isActive('/') ? 'bg-blue-50 text-earth-blue' : 'hover:bg-blue-50'}`}
                to="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                Overview
              </Link>
              <Link 
                className={`px-4 py-2 rounded-md transition-colors ${isActive('/#indicators') ? 'bg-blue-50 text-earth-blue' : 'hover:bg-blue-50'}`}
                to="/#indicators"
                onClick={() => setMobileMenuOpen(false)}
              >
                Indicators
              </Link>
              <Link 
                className={`px-4 py-2 rounded-md transition-colors ${isActive('/#regions') ? 'bg-blue-50 text-earth-blue' : 'hover:bg-blue-50'}`}
                to="/#regions"
                onClick={() => setMobileMenuOpen(false)}
              >
                Regions
              </Link>
              <Link 
                className={`px-4 py-2 rounded-md transition-colors ${isActive('/#resources') ? 'bg-blue-50 text-earth-blue' : 'hover:bg-blue-50'}`}
                to="/#resources"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                className={`px-4 py-2 rounded-md transition-colors ${isActive('/dashboard') ? 'bg-blue-50 text-earth-blue' : 'hover:bg-blue-50'}`}
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                className={`px-4 py-2 rounded-md transition-colors ${isActive('/about') ? 'bg-blue-50 text-earth-blue' : 'hover:bg-blue-50'}`}
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              {isLoggedIn ? (
                <>
                  <div className="border-t my-2"></div>
                  <div className="px-4 py-2">
                    Signed in as <span className="font-medium">{userName}</span>
                  </div>
                  <Link
                    className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    to="/"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log out
                  </Link>
                </>
              ) : (
                <>
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
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
