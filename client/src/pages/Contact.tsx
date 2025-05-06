import React from 'react';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronLeft, Send, Mail, Phone, MapPin, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }).max(500),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // Form submission handler
  function onSubmit(data: ContactFormValues) {
    console.log('Contact form submitted:', data);
    // In a real application, you would send this data to your backend
    
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond to your message shortly.",
    });
    
    // Reset form after submission
    form.reset();
  }

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
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with the SeaSavr team about partnerships, data access, or general inquiries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">Send Us a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What is this regarding?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Type your message here..."
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Please provide as much detail as possible.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">Contact Information</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="flex items-start p-6">
                  <Mail className="h-6 w-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-neutral-600">info@seasavr.org</p>
                    <p className="text-neutral-600">support@seasavr.org</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-start p-6">
                  <Phone className="h-6 w-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-neutral-600">+1 (555) 123-4567</p>
                    <p className="text-neutral-600 text-sm">Monday-Friday, 9am-5pm PST</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-start p-6">
                  <MapPin className="h-6 w-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Headquarters</h3>
                    <p className="text-neutral-600">123 Ocean Avenue</p>
                    <p className="text-neutral-600">San Francisco, CA 94111</p>
                    <p className="text-neutral-600">United States</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-start p-6">
                  <Globe className="h-6 w-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Social Media</h3>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-blue-500 hover:text-blue-700">Twitter</a>
                      <a href="#" className="text-blue-500 hover:text-blue-700">Facebook</a>
                      <a href="#" className="text-blue-500 hover:text-blue-700">Instagram</a>
                      <a href="#" className="text-blue-500 hover:text-blue-700">LinkedIn</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Working Hours</h3>
              <p className="text-neutral-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-neutral-600">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-neutral-600">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}