import React from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, Droplet, Globe, Users, Shield, MapPin, LifeBuoy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          <Link href="/" className="flex items-center text-blue-500 hover:text-blue-700 mr-4">
            <ChevronLeft size={20} />
            <span className="ml-1">Back to Home</span>
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">About SeaSavr</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A community-driven platform to monitor and report marine pollution incidents
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">Our Mission</h2>
            <p className="text-neutral-600 mb-4">
              SeaSavr is dedicated to protecting our oceans through community engagement, data collection, and pollution awareness. 
              By harnessing the power of citizen science, we empower individuals to take an active role in marine conservation.
            </p>
            <p className="text-neutral-600 mb-4">
              Our platform enables users to report pollution incidents they observe along coastlines, providing valuable data to 
              environmental organizations, researchers, and cleanup initiatives. Together, we can create a cleaner, healthier marine ecosystem.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-neutral-800">Key Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4">
                <Droplet className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-neutral-800">8 Million</h3>
                <p className="text-sm text-neutral-600">Tons of plastic entering oceans annually</p>
              </div>
              <div className="text-center p-4">
                <Globe className="w-10 h-10 text-teal-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-neutral-800">80%</h3>
                <p className="text-sm text-neutral-600">Of marine pollution comes from land-based activities</p>
              </div>
              <div className="text-center p-4">
                <Users className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-neutral-800">5,000+</h3>
                <p className="text-sm text-neutral-600">Active community members worldwide</p>
              </div>
              <div className="text-center p-4">
                <Shield className="w-10 h-10 text-teal-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-neutral-800">100+</h3>
                <p className="text-sm text-neutral-600">Environmental organizations using our data</p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-10" />
        
        <h2 className="text-2xl font-bold mb-6 text-center">How SeaSavr Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <MapPin className="w-12 h-12 text-blue-500 mb-2" />
              <CardTitle>Report Pollution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                When you spot pollution along coastlines or waterways, report it through our easy-to-use form. 
                Mark the exact location, describe the type and severity, and provide any additional details.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Globe className="w-12 h-12 text-teal-500 mb-2" />
              <CardTitle>Data Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                All reports are compiled into a comprehensive database and visualized on interactive maps, 
                helping identify pollution hotspots and trends over time.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <LifeBuoy className="w-12 h-12 text-blue-500 mb-2" />
              <CardTitle>Enable Action</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Environmental organizations use our aggregated data to organize cleanups, 
                develop targeted conservation strategies, and advocate for policy changes.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg p-8 text-center mb-10">
          <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Be part of the solution by reporting pollution incidents, participating in cleanup events, 
            and spreading awareness about marine conservation. Every report makes a difference!
          </p>
          <Link href="/">
            <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-md hover:bg-blue-50 transition-colors">
              Start Reporting
            </button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}