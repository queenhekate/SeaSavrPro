import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapSection from '@/components/MapSection';
import PollutionReportForm from '@/components/PollutionReportForm';
import InformationBox from '@/components/InformationBox';
import ConfirmationModal from '@/components/ConfirmationModal';
import SuccessMessage from '@/components/SuccessMessage';
import { useState } from 'react';
import { PollutionReport } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

export default function Home() {
  const [selectedCoordinates, setSelectedCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [reportData, setReportData] = useState<Partial<PollutionReport>>({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleLocationSelect = (lat: number, lng: number) => {
    const coordinates = { lat, lng };
    setSelectedCoordinates(coordinates);
    setReportData(prev => ({ 
      ...prev, 
      latitude: lat, 
      longitude: lng 
    }));
  };

  const handleFormChange = (data: Partial<PollutionReport>) => {
    setReportData(prev => ({ ...prev, ...data }));
  };

  const handleFormSubmit = (data: Partial<PollutionReport>) => {
    setReportData(prev => ({ ...prev, ...data }));
    setShowConfirmationModal(true);
  };

  const submitReport = async () => {
    try {
      setIsSubmitting(true);
      await apiRequest('POST', '/api/reports', reportData);
      setShowConfirmationModal(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      // Reset form
      setReportData({});
      setSelectedCoordinates(null);
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error",
        description: "Failed to submit pollution report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-neutral-800">Report Marine Pollution</h2>
            <p className="text-neutral-600">Help protect our oceans by reporting pollution incidents</p>
          </div>
          <Link href="/reports" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
            View All Reports
          </Link>
        </div>
        
        <MapSection 
          onLocationSelect={handleLocationSelect}
          selectedCoordinates={selectedCoordinates}
        />
        
        <PollutionReportForm 
          selectedCoordinates={selectedCoordinates}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
        />
        
        <InformationBox />
      </main>
      
      <Footer />
      
      <ConfirmationModal 
        reportData={reportData}
        isOpen={showConfirmationModal}
        isLoading={isSubmitting}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={submitReport}
      />
      
      <SuccessMessage 
        isVisible={showSuccessMessage}
      />
    </div>
  );
}
