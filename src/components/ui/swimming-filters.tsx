'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";
import { getLSCsByRegion, getAllLSCs } from '@/lib/lsc-data';

export interface SwimmingFilters {
  timeStandard: string;
  course: string;
  stroke: string;
  distance: string;
  region: string;
  lsc: string;
  ageGroup: string;
  gender: string;
  season: string;
}

interface SwimmingFiltersProps {
  filters: SwimmingFilters;
  onFiltersChange: (filters: SwimmingFilters) => void;
  showTimeStandard?: boolean;
  showCourse?: boolean;
  showStroke?: boolean;
  showDistance?: boolean;
  showRegion?: boolean;
  showLSC?: boolean;
  showAgeGroup?: boolean;
  showGender?: boolean;
}

export function SwimmingFilters({
  filters,
  onFiltersChange,
  showTimeStandard = true,
  showCourse = true,
  showStroke = true,
  showDistance = true,
  showRegion = true,
  showLSC = true,
  showAgeGroup = true,
  showGender = true,
}: SwimmingFiltersProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get available LSCs based on selected region
  const availableLSCs = filters.region === 'all' ? getAllLSCs() : getLSCsByRegion(filters.region);

  const handleFilterChange = (key: keyof SwimmingFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    
    // Reset LSC when region changes
    if (key === 'region') {
      newFilters.lsc = 'all';
    }
    
    onFiltersChange(newFilters);
  };

  const FilterSelect = ({ 
    label, 
    value, 
    onValueChange, 
    children, 
    placeholder 
  }: {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
    </div>
  );

  const FilterContent = () => (
    <>
      {showTimeStandard && (
        <FilterSelect
          label="Time Standard"
          value={filters.timeStandard}
          onValueChange={(value) => handleFilterChange('timeStandard', value)}
          placeholder="Time Standard"
        >
          <SelectItem value="all">All Standards</SelectItem>
          <SelectItem value="AAAA">AAAA</SelectItem>
          <SelectItem value="AAA">AAA</SelectItem>
          <SelectItem value="AA">AA</SelectItem>
          <SelectItem value="A">A</SelectItem>
          <SelectItem value="BB">BB</SelectItem>
          <SelectItem value="B">B</SelectItem>
          <SelectItem value="C">C</SelectItem>
        </FilterSelect>
      )}

      {/* Season Filter */}
      <FilterSelect
        label="Season"
        value={filters.season}
        onValueChange={(value) => handleFilterChange('season', value)}
        placeholder="Season"
      >
        <SelectItem value="2024-2025">2024-2025</SelectItem>
        <SelectItem value="2023-2024">2023-2024</SelectItem>
        <SelectItem value="all">All Seasons</SelectItem>
      </FilterSelect>

      {showCourse && (
        <FilterSelect
          label="Course"
          value={filters.course}
          onValueChange={(value) => handleFilterChange('course', value)}
          placeholder="Course"
        >
          <SelectItem value="SCY">Short Course Yards</SelectItem>
          <SelectItem value="LCM">Long Course Meters</SelectItem>
          <SelectItem value="SCM">Short Course Meters</SelectItem>
        </FilterSelect>
      )}

      {showStroke && (
        <FilterSelect
          label="Stroke"
          value={filters.stroke}
          onValueChange={(value) => handleFilterChange('stroke', value)}
          placeholder="Stroke"
        >
          <SelectItem value="Free">Freestyle</SelectItem>
          <SelectItem value="Back">Back</SelectItem>
          <SelectItem value="Breast">Breast</SelectItem>
          <SelectItem value="Fly">Fly</SelectItem>
          <SelectItem value="IM">IM</SelectItem>
        </FilterSelect>
      )}

      {showDistance && (
        <FilterSelect
          label="Distance"
          value={filters.distance}
          onValueChange={(value) => handleFilterChange('distance', value)}
          placeholder="Distance"
        >
          <SelectItem value="50">50m</SelectItem>
          <SelectItem value="100">100m</SelectItem>
          <SelectItem value="200">200m</SelectItem>
          <SelectItem value="400">400m</SelectItem>
          <SelectItem value="800">800m</SelectItem>
          <SelectItem value="1500">1500m</SelectItem>
        </FilterSelect>
      )}

      {showRegion && (
        <FilterSelect
          label="Region"
          value={filters.region}
          onValueChange={(value) => handleFilterChange('region', value)}
          placeholder="Region"
        >
          <SelectItem value="all">All Regions</SelectItem>
          <SelectItem value="Eastern">Eastern</SelectItem>
          <SelectItem value="Central">Central</SelectItem>
          <SelectItem value="Southern">Southern</SelectItem>
          <SelectItem value="Western">Western</SelectItem>
        </FilterSelect>
      )}

      {showLSC && (
        <FilterSelect
          label="LSC"
          value={filters.lsc}
          onValueChange={(value) => handleFilterChange('lsc', value)}
          placeholder="LSC"
        >
          <SelectItem value="all">All LSCs</SelectItem>
          {availableLSCs.map((lsc, index) => (
            <SelectItem key={`${lsc.code}-${index}`} value={lsc.code}>{lsc.name}</SelectItem>
          ))}
        </FilterSelect>
      )}

      {showAgeGroup && (
        <FilterSelect
          label="Age Group"
          value={filters.ageGroup}
          onValueChange={(value) => handleFilterChange('ageGroup', value)}
          placeholder="Age Group"
        >
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
        </FilterSelect>
      )}

      {showGender && (
        <FilterSelect
          label="Gender"
          value={filters.gender}
          onValueChange={(value) => handleFilterChange('gender', value)}
          placeholder="Gender"
        >
          <SelectItem value="all">All Genders</SelectItem>
          <SelectItem value="M">Male</SelectItem>
          <SelectItem value="F">Female</SelectItem>
        </FilterSelect>
      )}
    </>
  );

  return (
    <div className="space-y-4">
      {/* Desktop Filters - 4 columns on large screens */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-4">
          <FilterContent />
        </div>
      </div>

      {/* Tablet Filters - 2 columns on medium screens */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filters - Collapsible menu */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </span>
              <span className="text-xs text-muted-foreground">
                {Object.values(filters).filter(v => v !== 'all').length} active
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <span>Filters</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6 overflow-y-auto">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
} 