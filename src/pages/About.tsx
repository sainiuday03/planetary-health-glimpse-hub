
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Globe, Users, LineChart, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">About Planetary Health Dashboard</h1>
              <p className="text-xl text-gray-600 mb-8">
                Monitoring and visualizing the vital signs of our planet to promote understanding, 
                action, and hope for a sustainable future.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h2>Our Mission</h2>
              <p>
                The Planetary Health Dashboard is dedicated to providing accessible, accurate, and actionable 
                information about the state of our planet's environmental systems. We believe that meaningful 
                change begins with understanding, and our mission is to make complex environmental data 
                comprehensible to everyone.
              </p>
              
              <h2>What We Do</h2>
              <p>
                We collect, analyze, and visualize data from trusted scientific sources around the world. 
                Our dashboard tracks key environmental indicators including climate metrics, biodiversity 
                status, land use changes, ocean health, and atmospheric conditions. By presenting this data 
                in an intuitive format, we empower individuals, communities, researchers, and policymakers 
                to make informed decisions about our collective future.
              </p>
              
              <h2>Our Team</h2>
              <p>
                Our team consists of environmental scientists, data analysts, software developers, and 
                communication specialists from diverse backgrounds, all united by a passion for 
                environmental stewardship and data transparency. We collaborate with research institutions, 
                governmental agencies, and non-profit organizations worldwide to ensure our data is current, 
                comprehensive, and accurate.
              </p>
              
              <h2>Get Involved</h2>
              <p>
                Whether you're a citizen scientist, educator, researcher, or concerned global citizen, 
                there are many ways to engage with and contribute to the Planetary Health Dashboard. 
                Explore our data, share our insights, participate in our monitoring programs, or support 
                our work through collaboration and partnership.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-earth-blue mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Scientific Integrity</h3>
                <p className="text-gray-600">We are committed to accuracy, transparency, and evidence-based reporting in all our data.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-earth-green mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Inclusive Access</h3>
                <p className="text-gray-600">We strive to make environmental data accessible and understandable to everyone.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-earth-purple mb-4">
                  <LineChart className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">We continuously improve our methods for data collection, analysis, and visualization.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-amber-600 mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Perspective</h3>
                <p className="text-gray-600">We recognize that environmental challenges and solutions are interconnected across the planet.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
