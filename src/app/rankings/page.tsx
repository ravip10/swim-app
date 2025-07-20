'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Medal,
} from "lucide-react";
import { SwimmingFilters, type SwimmingFilters as SwimmingFiltersType } from '@/components/ui/swimming-filters';

interface Ranking {
  rank: number;
  swimmer_id: string;
  name: string;
  club: string;
  region: string;
  lsc: string;
  age: number;
  gender: string;
  time_seconds: string;
  time_formatted: string;
  event_name: string;
  meet_name: string;
  meet_date: string;
  is_personal_best: boolean;
}

export default function RankingsPage() {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SwimmingFiltersType>({
    timeStandard: 'all',
    course: 'SCY',
    stroke: 'Free',
    distance: '100',
    region: 'all',
    lsc: 'all',
    ageGroup: 'all',
    gender: 'all'
  });

  const fetchRankings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        timeStandard: filters.timeStandard,
        course: filters.course,
        stroke: filters.stroke,
        distance: filters.distance,
        region: filters.region,
        lsc: filters.lsc,
        ageGroup: filters.ageGroup,
        gender: filters.gender,
        limit: '100'
      });
      
      const response = await fetch(`/api/rankings?${params}`);
      const data = await response.json();
      setRankings(data);
    } catch (error) {
      console.error('Error fetching rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, [filters]);

  // Reset LSC when region changes
  useEffect(() => {
    if (filters.region === 'all') {
      setFilters(prev => ({ ...prev, lsc: 'all' }));
    }
  }, [filters.region]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getRegionAbbr = (region: string) => {
    const regionMap: { [key: string]: string } = {
      'Eastern': 'E',
      'Southern': 'S', 
      'Central': 'C',
      'Western': 'W',
    };
    return regionMap[region] || region.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading rankings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Rankings</h1>
        <p className="text-muted-foreground">
          View swimmer rankings by stroke, region, state, and course
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <SwimmingFilters
            filters={filters}
            onFiltersChange={setFilters}
          />
        </CardContent>
      </Card>

      {/* Rankings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Rankings</CardTitle>
          <CardDescription>
            {filters.distance} {filters.stroke} {filters.course} - {filters.region === 'all' ? 'All Regions' : filters.region} - {rankings.length} results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Swimmer</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>LSC</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map((ranking) => (
                <TableRow key={`${ranking.swimmer_id}-${ranking.time_seconds}`}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {ranking.rank <= 3 ? (
                        <Medal className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <span className="w-4 h-4"></span>
                      )}
                      <span>{ranking.rank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {getInitials(ranking.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{ranking.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{ranking.time_formatted}</TableCell>
                  <TableCell>{ranking.club}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{getRegionAbbr(ranking.region)}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ranking.lsc}</Badge>
                  </TableCell>
                  <TableCell>{ranking.age}</TableCell>
                  <TableCell>{formatDate(ranking.meet_date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {rankings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No rankings found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 