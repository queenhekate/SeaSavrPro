import { useQuery } from "@tanstack/react-query";
import { PollutionReport } from "@shared/schema";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCoordinates } from "@/lib/mapUtils";
import { format } from "date-fns";
import { MapPin, Calendar, AlertTriangle, Waves } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Reports() {
  const { data: reports, isLoading, isError } = useQuery<PollutionReport[]>({
    queryKey: ['/api/reports'],
  });

  function getSeverityColor(severity: string) {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'high':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
      case 'critical':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return '';
    }
  }

  function getTypeBadge(type: string) {
    switch (type) {
      case 'plastic':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Plastic</Badge>;
      case 'oil':
        return <Badge className="bg-black text-white">Oil Spill</Badge>;
      case 'sewage':
        return <Badge className="bg-brown-100 text-brown-800 hover:bg-brown-100">Sewage</Badge>;
      case 'abandoned':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Abandoned Equipment</Badge>;
      case 'other':
        return <Badge>Other</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Loading Reports...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="bg-gray-100 h-32"></CardHeader>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Error Loading Reports</h1>
        <p className="text-red-500 mb-4">Failed to load pollution reports. Please try again later.</p>
        <Link href="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Pollution Reports</h1>
        <Link href="/" className="text-blue-500 hover:underline flex items-center">
          <span>Report New Incident</span>
        </Link>
      </div>
      
      {reports && reports.length === 0 ? (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <h2 className="text-xl font-semibold mb-2">No Reports Yet</h2>
          <p className="text-gray-500 mb-4">Be the first to report a pollution incident!</p>
          <Link href="/">
            <button className="btn bg-blue-500 text-white px-4 py-2 rounded">Report Pollution</button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports?.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{report.pollutionType.charAt(0).toUpperCase() + report.pollutionType.slice(1)} Pollution</CardTitle>
                  <Badge className={getSeverityColor(report.severity)}>
                    {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center mt-2">
                  <MapPin size={16} className="mr-1" />
                  {formatCoordinates(report.latitude, report.longitude)}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="mr-1" />
                  <span>Observed: {report.dateObserved}</span>
                  {report.timeObserved && <span> at {report.timeObserved}</span>}
                </div>
                
                <p className="text-sm mb-4 line-clamp-3">{report.description}</p>
                
                <Separator className="my-3" />
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {getTypeBadge(report.pollutionType)}
                  {report.name && <Badge variant="outline">Reported by: {report.name}</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}