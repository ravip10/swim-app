'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Play,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  RefreshCw,
} from "lucide-react";

interface RankingJob {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  filters: any;
  total_records?: number;
  created_at: string;
  completed_at?: string;
  error_message?: string;
}

export default function RankingsAdminPage() {
  const [jobs, setJobs] = useState<RankingJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/rankings-jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const createNewJob = async () => {
    try {
      const filters = {
        stroke: 'Free',
        distance: '100',
        course: 'SCY',
        gender: 'F',
        ageGroup: '13-14',
        season: '2024'
      };

      const response = await fetch('/api/rankings-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters }),
      });

      if (response.ok) {
        fetchJobs(); // Refresh the list
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'running':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      pending: 'secondary',
      running: 'default',
      completed: 'default',
      failed: 'destructive',
    };

    return (
      <Badge variant={variants[status] || 'outline'}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading jobs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Rankings Admin</h1>
        <p className="text-muted-foreground">
          Manage ranking scraping jobs and monitor data collection
        </p>
      </div>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Scraping Jobs</h3>
              <p className="text-sm text-muted-foreground">
                Create and monitor ranking data collection jobs
              </p>
            </div>
            <Button onClick={createNewJob}>
              <Plus className="h-4 w-4 mr-2" />
              New Job
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
          <CardDescription>
            {jobs.length} total jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Filters</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Error</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(job.status)}
                      {getStatusBadge(job.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{job.filters.stroke} {job.filters.distance}</div>
                      <div className="text-muted-foreground">
                        {job.filters.gender} • {job.filters.ageGroup} • {job.filters.course}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {job.total_records ? job.total_records : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(job.created_at)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {job.completed_at ? (
                      <div className="text-sm">
                        {formatDate(job.completed_at)}
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {job.error_message ? (
                      <div className="text-sm text-red-500 max-w-xs truncate">
                        {job.error_message}
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No jobs found.</p>
          <Button onClick={createNewJob} className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Create First Job
          </Button>
        </div>
      )}
    </div>
  );
} 