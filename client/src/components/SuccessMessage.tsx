import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface SuccessMessageProps {
  isVisible: boolean;
}

const successMessageVariants = cva(
  "fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform",
  {
    variants: {
      visible: {
        true: "translate-y-0 opacity-100",
        false: "translate-y-10 opacity-0 pointer-events-none",
      },
    },
    defaultVariants: {
      visible: false,
    },
  }
);

export default function SuccessMessage({ isVisible }: SuccessMessageProps) {
  return (
    <div className={cn(
      successMessageVariants({ visible: isVisible }),
      "bg-[hsl(var(--success))] text-white"
    )}>
      <div className="flex items-center">
        <CheckCircle2 className="h-6 w-6 mr-3" />
        <div>
          <h4 className="font-bold">Report Submitted!</h4>
          <p className="text-sm">Thank you for helping protect our oceans.</p>
        </div>
      </div>
    </div>
  );
}
