import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { pollutionReportSchema, PollutionReport } from '@shared/schema';
import { format } from 'date-fns';

interface PollutionReportFormProps {
  selectedCoordinates: { lat: number; lng: number } | null;
  onFormChange: (data: Partial<PollutionReport>) => void;
  onFormSubmit: (data: Partial<PollutionReport>) => void;
}

export default function PollutionReportForm({ 
  selectedCoordinates,
  onFormChange,
  onFormSubmit
}: PollutionReportFormProps) {
  
  const form = useForm<PollutionReport>({
    resolver: zodResolver(pollutionReportSchema),
    defaultValues: {
      latitude: selectedCoordinates?.lat || 0,
      longitude: selectedCoordinates?.lng || 0,
      pollutionType: "",
      severity: "",
      description: "",
      dateObserved: format(new Date(), 'yyyy-MM-dd'),
      timeObserved: "",
      name: "",
      email: ""
    }
  });

  // Update form when coordinates change
  useEffect(() => {
    if (selectedCoordinates) {
      form.setValue('latitude', selectedCoordinates.lat);
      form.setValue('longitude', selectedCoordinates.lng);
      
      // Notify parent component of change
      onFormChange({
        latitude: selectedCoordinates.lat,
        longitude: selectedCoordinates.lng
      });
    }
  }, [selectedCoordinates, form, onFormChange]);

  // Track form changes and update parent component
  useEffect(() => {
    const subscription = form.watch((value) => {
      onFormChange(value as Partial<PollutionReport>);
    });
    
    return () => subscription.unsubscribe();
  }, [form, onFormChange]);

  function handleSubmit(data: PollutionReport) {
    onFormSubmit(data);
  }

  // Handle manual coordinate input
  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'latitude' | 'longitude') => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      form.setValue(field, value);
      
      // Only notify parent when both coordinates are valid
      const lat = field === 'latitude' ? value : form.getValues('latitude');
      const lng = field === 'longitude' ? value : form.getValues('longitude');
      
      if (lat && lng) {
        onFormChange({ latitude: lat, longitude: lng });
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Pollution Report Details</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. 34.052235" 
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e);
                        handleCoordinateChange(e, 'latitude');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. -118.243683" 
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e);
                        handleCoordinateChange(e, 'longitude');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pollutionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pollution Type*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pollution type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="plastic">Plastic Debris</SelectItem>
                      <SelectItem value="oil">Oil or Chemical Spill</SelectItem>
                      <SelectItem value="sewage">Sewage or Runoff</SelectItem>
                      <SelectItem value="abandoned">Abandoned Fishing Gear</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="severity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Severity*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low - Small amount, minimal impact</SelectItem>
                      <SelectItem value="moderate">Moderate - Noticeable impact</SelectItem>
                      <SelectItem value="high">High - Significant impact</SelectItem>
                      <SelectItem value="critical">Critical - Immediate action needed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the pollution incident in detail" 
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dateObserved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Observed*</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="timeObserved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Observed</FormLabel>
                  <FormControl>
                    <Input 
                      type="time" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="col-span-1 md:col-span-2">
              <FormLabel className="block text-sm font-medium text-neutral-700 mb-1">Upload Photos (optional)</FormLabel>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <i className="fas fa-camera text-neutral-400 text-xl"></i>
                  <div className="flex text-sm text-neutral-600">
                    <label htmlFor="photos" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                      <span>Upload a file</span>
                      <input id="photos" name="photos" type="file" className="sr-only" multiple accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Optional"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="For updates (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-neutral-500">* Required fields</div>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <i className="fas fa-paper-plane mr-2"></i>
              Submit Report
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
