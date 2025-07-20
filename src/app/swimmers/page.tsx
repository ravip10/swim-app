'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Trophy, Target } from 'lucide-react';

interface Swimmer {
  id: string;
  name: string;
  email: string;
  club: string;
  region: string;
  age: number;
  gender: string;
  event_count: string;
  personal_bests: string;
  total_times: string;
}

export default function SwimmersPage() {
  const [swimmers, setSwimmers] = useState<Swimmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');

  useEffect(() => {
    fetchSwimmers();
  }, []);

  const fetchSwimmers = async () => {
    try {
      const response = await fetch('/api/swimmers');
      const data = await response.json();
      setSwimmers(data);
    } catch (error) {
      console.error('Error fetching swimmers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRegionAbbr = (region: string) => {
    const regionMap: { [key: string]: string } = {
      'Northeast': 'NE',
      'Southeast': 'SE', 
      'Midwest': 'MW',
      'West': 'W',
    };
    return regionMap[region] || region.substring(0, 2).toUpperCase();
  };

  const filteredSwimmers = swimmers.filter(swimmer => {
    const matchesSearch = swimmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         swimmer.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         swimmer.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = regionFilter === 'all' || swimmer.region === regionFilter;
    
    const matchesAge = ageFilter === 'all' || 
      (ageFilter === '10u' && swimmer.age <= 10) ||
      (ageFilter === '11-12' && swimmer.age >= 11 && swimmer.age <= 12) ||
      (ageFilter === '13-14' && swimmer.age >= 13 && swimmer.age <= 14) ||
      (ageFilter === '15-16' && swimmer.age >= 15 && swimmer.age <= 16) ||
      (ageFilter === '17-18' && swimmer.age >= 17 && swimmer.age <= 18) ||
      (ageFilter === '19+' && swimmer.age >= 19);

    return matchesSearch && matchesRegion && matchesAge;
  });

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading swimmers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Swimmers</h1>
        <p className="text-muted-foreground mt-2">
          Manage swimmer profiles and track individual progress
        </p>
      </div>

      {/* Search and Filters */}
      <div className="relative overflow-visible">
        <div className="relative z-10 p-6 border rounded-lg bg-card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search swimmers by name, club, or region..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative overflow-visible">
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent className="z-[999999]">
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Northeast">Northeast</SelectItem>
                  <SelectItem value="Southeast">Southeast</SelectItem>
                  <SelectItem value="Midwest">Midwest</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative overflow-visible">
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by age" />
                </SelectTrigger>
                <SelectContent className="z-[999999]">
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="10u">10 & Under</SelectItem>
                  <SelectItem value="11-12">11-12</SelectItem>
                  <SelectItem value="13-14">13-14</SelectItem>
                  <SelectItem value="15-16">15-16</SelectItem>
                  <SelectItem value="17-18">17-18</SelectItem>
                  <SelectItem value="19+">19+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Swimmers Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative z-0">
        {filteredSwimmers.map((swimmer) => (
          <Card key={swimmer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {getInitials(swimmer.name)}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{swimmer.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {swimmer.club} • {getRegionAbbr(swimmer.region)}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>Age: {swimmer.age}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span>Events: {swimmer.event_count}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>Personal Bests: {swimmer.personal_bests}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span>Total Times: {swimmer.total_times}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  {swimmer.gender === 'M' ? 'Male' : 'Female'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {swimmer.region}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSwimmers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No swimmers found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 