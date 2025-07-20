import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Plus, 
  TrendingUp, 
  Award,
  MapPin,
  Users
} from "lucide-react";

export default function SwimmersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Swimmers</h1>
          <p className="text-muted-foreground">
            Manage swimmer profiles and track individual progress
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Swimmer
        </Button>
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
              />
            </div>
            <div className="relative overflow-visible">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent className="z-[999999]">
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                  <SelectItem value="southeast">Southeast</SelectItem>
                  <SelectItem value="midwest">Midwest</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative overflow-visible">
              <Select defaultValue="all">
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
        {[
          {
            id: 1,
            name: "Sarah Johnson",
            club: "Aqua Force",
            region: "Northeast",
            state: "NY",
            age: 16,
            events: 12,
            personalBests: 8,
            improvement: "+12.5%",
            avatar: "/avatars/sarah.jpg"
          },
          {
            id: 2,
            name: "Michael Chen",
            club: "Swim Elite",
            region: "West",
            state: "CA",
            age: 15,
            events: 15,
            personalBests: 11,
            improvement: "+8.3%",
            avatar: "/avatars/michael.jpg"
          },
          {
            id: 3,
            name: "Emma Davis",
            club: "Wave Riders",
            region: "Southeast",
            state: "FL",
            age: 14,
            events: 10,
            personalBests: 6,
            improvement: "+15.2%",
            avatar: "/avatars/emma.jpg"
          },
          {
            id: 4,
            name: "Alex Thompson",
            club: "Aqua Force",
            region: "Northeast",
            state: "MA",
            age: 17,
            events: 18,
            personalBests: 14,
            improvement: "+6.7%",
            avatar: "/avatars/alex.jpg"
          },
          {
            id: 5,
            name: "Maria Garcia",
            club: "Swim Elite",
            region: "West",
            state: "TX",
            age: 16,
            events: 13,
            personalBests: 9,
            improvement: "+11.8%",
            avatar: "/avatars/maria.jpg"
          },
          {
            id: 6,
            name: "David Kim",
            club: "Wave Riders",
            region: "Southeast",
            state: "GA",
            age: 15,
            events: 11,
            personalBests: 7,
            improvement: "+9.4%",
            avatar: "/avatars/david.jpg"
          }
        ].map((swimmer) => (
          <Card key={swimmer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={swimmer.avatar} alt={swimmer.name} />
                  <AvatarFallback>
                    {swimmer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{swimmer.name}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{swimmer.club}</span>
                    <span>•</span>
                    <span>{swimmer.state}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium">{swimmer.age}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Events:</span>
                  <span className="font-medium">{swimmer.events}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Personal Bests:</span>
                  <span className="font-medium">{swimmer.personalBests}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Improvement:</span>
                  <span className="font-medium text-green-600">{swimmer.improvement}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary">{swimmer.region}</Badge>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-4 relative z-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Swimmers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Swimmers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personal Bests</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Improvement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.5%</span> vs last quarter
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 