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
import { getLSCsByRegion, getAllLSCs } from '@/lib/lsc-data';

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
  const [filters, setFilters] = useState({
    stroke: 'Free',
    distance: '100',
    region: 'all',
    lsc: 'all',
    ageGroup: 'all',
    gender: 'all'
  });

  // Get available LSCs based on selected region
  const availableLSCs = filters.region === 'all' ? getAllLSCs() : getLSCsByRegion(filters.region);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
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
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Select value={filters.stroke} onValueChange={(value) => setFilters(prev => ({ ...prev, stroke: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select stroke" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Free">Freestyle</SelectItem>
                <SelectItem value="Back">Backstroke</SelectItem>
                <SelectItem value="Breast">Breaststroke</SelectItem>
                <SelectItem value="Fly">Butterfly</SelectItem>
                <SelectItem value="IM">Individual Medley</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.distance} onValueChange={(value) => setFilters(prev => ({ ...prev, distance: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50m</SelectItem>
                <SelectItem value="100">100m</SelectItem>
                <SelectItem value="200">200m</SelectItem>
                <SelectItem value="400">400m</SelectItem>
                <SelectItem value="800">800m</SelectItem>
                <SelectItem value="1500">1500m</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.region} onValueChange={(value) => setFilters(prev => ({ ...prev, region: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Eastern">Eastern</SelectItem>
                <SelectItem value="Southern">Southern</SelectItem>
                <SelectItem value="Central">Central</SelectItem>
                <SelectItem value="Western">Western</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.lsc} onValueChange={(value) => setFilters(prev => ({ ...prev, lsc: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select LSC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All LSCs</SelectItem>
                {availableLSCs.map(lsc => (
                  <SelectItem key={lsc.code} value={lsc.code}>{lsc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.ageGroup} onValueChange={(value) => setFilters(prev => ({ ...prev, ageGroup: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="10u">10 & Under</SelectItem>
                <SelectItem value="11-12">11-12</SelectItem>
                <SelectItem value="13-14">13-14</SelectItem>
                <SelectItem value="15-16">15-16</SelectItem>
                <SelectItem value="17-18">17-18</SelectItem>
                <SelectItem value="19+">19 & Over</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="11">11</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="13">13</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="17">17</SelectItem>
                <SelectItem value="18">18</SelectItem>
                <SelectItem value="18u">18 & Under</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.gender} onValueChange={(value) => setFilters(prev => ({ ...prev, gender: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="M">Male</SelectItem>
                <SelectItem value="F">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rankings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Rankings</CardTitle>
          <CardDescription>
            {filters.distance}m {filters.stroke} - {filters.region === 'all' ? 'All Regions' : filters.region} - {rankings.length} results
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