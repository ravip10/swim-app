'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Medal,
  RefreshCw,
  Database,
  Zap,
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
  total_swimmers?: number;
  stroke?: string;
  distance?: number;
  course?: string;
  age_group?: string;
  season?: string;
  time_id: string; // Added time_id to the interface
  event_age_group: string; // Added event_age_group for unique key
  absolute_rank?: number; // Added absolute_rank
  age_group_rank?: number; // Added age_group_rank
}

export default function RankingsPage() {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [useCache, setUseCache] = useState(true);
  const [filters, setFilters] = useState<SwimmingFiltersType>({
    timeStandard: 'all',
    course: 'SCY',
    stroke: 'Free',
    distance: '100',
    region: 'all',
    lsc: 'all',
    ageGroup: 'all',
    gender: 'all',
    season: '2024-2025',
  });

  const fetchRankings = async () => {
    try {
      setLoading(true);
      // Robust filter value mapping
      const mapCourse = (course: string) => {
        if (course === 'Long Course Meters') return 'LCM';
        if (course === 'Short Course Yards') return 'SCY';
        if (course === 'Short Course Meters') return 'SCM';
        return course;
      };
      const mapDistance = (distance: string) => {
        if (distance.endsWith('m')) return distance.replace('m', '');
        return distance;
      };
      const mapSeason = (season: string) => {
        if (season === '2024-2025') return '2024 Summer';
        if (season === '2023-2024') return '2023 Summer';
        return season;
      };
      // Dynamic age group mapping (already present)
      let ageGroup = filters.ageGroup;
      if (["7", "8"].includes(ageGroup)) ageGroup = "8 and under";
      if (["9", "10"].includes(ageGroup)) ageGroup = "10 and under";
      if (["10u", "10 & Under"].includes(ageGroup)) ageGroup = "10 and under";
      if (["11", "12"].includes(ageGroup)) ageGroup = "11-12";
      if (["13", "14"].includes(ageGroup)) ageGroup = "13-14";
      if (["15", "16"].includes(ageGroup)) ageGroup = "15-16";
      if (["17", "18"].includes(ageGroup)) ageGroup = "17-18";
      if (ageGroup === "18u") ageGroup = "18 and under";

      const params = new URLSearchParams({
        timeStandard: filters.timeStandard,
        course: mapCourse(filters.course),
        stroke: filters.stroke,
        distance: mapDistance(filters.distance),
        region: filters.region,
        lsc: filters.lsc,
        ageGroup: ageGroup,
        gender: filters.gender,
        season: mapSeason(filters.season),
        limit: '100'
      });
      
      // Choose API endpoint based on cache setting
      const endpoint = useCache ? '/api/rankings-cache' : '/api/rankings';
      const response = await fetch(`${endpoint}?${params}`);
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
  }, [filters, useCache]);

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

  const handleRefresh = () => {
    fetchRankings();
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

      {/* Cache Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="cache-toggle" className="text-sm font-medium">
                Data Source
              </Label>
              <p className="text-xs text-muted-foreground">
                {useCache ? 'Using cached rankings from database' : 'Calculating rankings dynamically'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <Switch
                id="cache-toggle"
                checked={useCache}
                onCheckedChange={setUseCache}
              />
              <Database className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top Rankings</CardTitle>
              <CardDescription>
                {filters.distance} {filters.stroke} {filters.course} - {filters.region === 'all' ? 'All Regions' : filters.region} - {rankings.length} results
                {useCache && rankings[0]?.total_swimmers && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    (Total swimmers: {rankings[0].total_swimmers})
                  </span>
                )}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Abs. Rank</TableHead>
                <TableHead className="w-[80px]">Age Rank</TableHead>
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
                <TableRow key={`${ranking.time_id}-${ranking.event_age_group}`}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {ranking.absolute_rank && ranking.absolute_rank <= 3 ? (
                        <Medal className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <span className="w-4 h-4"></span>
                      )}
                      <span>{ranking.absolute_rank ?? '-'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <span>{ranking.age_group_rank ?? '-'}</span>
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
          {useCache && (
            <p className="text-xs text-muted-foreground mt-2">
              Try switching to dynamic calculation or check if cached data exists for these filters.
            </p>
          )}
        </div>
      )}
    </div>
  );
} 