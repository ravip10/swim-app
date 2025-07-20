import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  TrendingUp, 
  Trophy, 
  Users,
  ArrowLeftRight,
  BarChart3
} from "lucide-react";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Search & Compare</h1>
        <p className="text-muted-foreground">
          Find swimmers, compare performances, and analyze trends
        </p>
      </div>

      {/* Search Interface */}
      <Card className="relative z-0">
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>
            Search by name, club, region, or performance criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search swimmers by name, club, or region..."
                  className="pl-10"
                />
              </div>
              <Button className="sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                  <SelectItem value="southeast">Southeast</SelectItem>
                  <SelectItem value="midwest">Midwest</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter by age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="10u">10 & Under</SelectItem>
                  <SelectItem value="11-12">11-12</SelectItem>
                  <SelectItem value="13-14">13-14</SelectItem>
                  <SelectItem value="15-16">15-16</SelectItem>
                  <SelectItem value="17-18">17-18</SelectItem>
                  <SelectItem value="19+">19+</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter by event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="freestyle">Freestyle</SelectItem>
                  <SelectItem value="backstroke">Backstroke</SelectItem>
                  <SelectItem value="breaststroke">Breaststroke</SelectItem>
                  <SelectItem value="butterfly">Butterfly</SelectItem>
                  <SelectItem value="im">Individual Medley</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter by standard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Standards</SelectItem>
                  <SelectItem value="aaaa">AAAA</SelectItem>
                  <SelectItem value="aaa">AAA</SelectItem>
                  <SelectItem value="aa">AA</SelectItem>
                  <SelectItem value="a">A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            Found 24 swimmers matching your criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: 1,
                name: "Sarah Johnson",
                club: "Aqua Force",
                region: "Northeast",
                age: 16,
                events: 12,
                personalBests: 8,
                improvement: "+12.5%",
                avatar: "/avatars/sarah.jpg",
                standards: ["AAAA", "AAA"]
              },
              {
                id: 2,
                name: "Michael Chen",
                club: "Swim Elite",
                region: "West",
                age: 15,
                events: 15,
                personalBests: 11,
                improvement: "+8.3%",
                avatar: "/avatars/michael.jpg",
                standards: ["AAA", "AA"]
              },
              {
                id: 3,
                name: "Emma Davis",
                club: "Wave Riders",
                region: "Southeast",
                age: 14,
                events: 10,
                personalBests: 6,
                improvement: "+15.2%",
                avatar: "/avatars/emma.jpg",
                standards: ["AA", "A"]
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
                        <span>{swimmer.club}</span>
                        <span>•</span>
                        <span>{swimmer.region}</span>
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
                      <div className="flex space-x-1">
                        {swimmer.standards.map((standard) => (
                          <Badge key={standard} variant="outline" className="text-xs">
                            {standard}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Compare</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Tools */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>
              Compare swimmers side by side
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Select defaultValue="">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select swimmer 1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="emma">Emma Davis</SelectItem>
                  </SelectContent>
                </Select>
                <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select swimmer 2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="emma">Emma Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">
                <BarChart3 className="mr-2 h-4 w-4" />
                Compare Performance
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trend Analysis</CardTitle>
            <CardDescription>
              Analyze performance trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select swimmer for analysis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="michael">Michael Chen</SelectItem>
                  <SelectItem value="emma">Emma Davis</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100free">100m Freestyle</SelectItem>
                  <SelectItem value="200free">200m Freestyle</SelectItem>
                  <SelectItem value="100back">100m Backstroke</SelectItem>
                  <SelectItem value="100breast">100m Breaststroke</SelectItem>
                  <SelectItem value="100fly">100m Butterfly</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">
                <TrendingUp className="mr-2 h-4 w-4" />
                Analyze Trends
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Results</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              Across all swimmers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personal Bests</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Improvement</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <p className="text-xs text-muted-foreground">
              Team average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Standards Met</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              This season
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 