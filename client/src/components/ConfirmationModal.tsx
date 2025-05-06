import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { PollutionReport } from '@shared/schema';
import { Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
  reportData: Partial<PollutionReport>;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  reportData,
  isOpen,
  isLoading,
  onClose,
  onConfirm
}: ConfirmationModalProps) {
  
  // Helper to format pollution type for display
  const formatPollutionType = (type: string | undefined) => {
    if (!type) return "";
    const types: Record<string, string> = {
      "plastic": "Plastic Debris",
      "oil": "Oil or Chemical Spill",
      "sewage": "Sewage or Runoff",
      "abandoned": "Abandoned Fishing Gear",
      "other": "Other"
    };
    return types[type] || type;
  };
  
  // Helper to format severity for display
  const formatSeverity = (severity: string | undefined) => {
    if (!severity) return "";
    const levels: Record<string, string> = {
      "low": "Low - Small amount, minimal impact",
      "moderate": "Moderate - Noticeable impact",
      "high": "High - Significant impact",
      "critical": "Critical - Immediate action needed"
    };
    return levels[severity] || severity;
  };
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to submit this pollution report with the following details?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="bg-neutral-50 p-3 rounded-md mb-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-neutral-500">Location:</div>
            <div className="font-medium">
              {reportData.latitude?.toFixed(6)}, {reportData.longitude?.toFixed(6)}
            </div>
            
            <div className="text-neutral-500">Pollution Type:</div>
            <div className="font-medium">
              {formatPollutionType(reportData.pollutionType)}
            </div>
            
            <div className="text-neutral-500">Severity:</div>
            <div className="font-medium">
              {formatSeverity(reportData.severity)}
            </div>
            
            <div className="col-span-2 text-neutral-500 mt-2">Description:</div>
            <div className="col-span-2 font-medium">
              {reportData.description}
            </div>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button
            onClick={onConfirm}
            className="bg-primary text-white hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Confirm Submission"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
