
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simulate loading app resources
    setTimeout(() => {
      setIsAppReady(true);
    }, 300);
  }, []);

  // Show loading state if app is not ready
  if (!isAppReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-earth-blue/10 to-earth-purple/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-earth-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Planetary Health Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
