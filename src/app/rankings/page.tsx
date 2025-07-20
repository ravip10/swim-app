import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Trophy, 
  TrendingUp, 
  MapPin,
  Award,
  Medal,
  Target
} from "lucide-react";

export default function RankingsPage() {
  return (
    <div className="space-y-6">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select defaultValue="freestyle">
              <SelectTrigger>
                <SelectValue placeholder="Select stroke" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freestyle">Freestyle</SelectItem>
                <SelectItem value="backstroke">Backstroke</SelectItem>
                <SelectItem value="breaststroke">Breaststroke</SelectItem>
                <SelectItem value="butterfly">Butterfly</SelectItem>
                <SelectItem value="im">Individual Medley</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="100">
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

            <Select defaultValue="lcm">
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lcm">Long Course (LCM)</SelectItem>
                <SelectItem value="scm">Short Course (SCM)</SelectItem>
                <SelectItem value="scy">Short Course Yards (SCY)</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="northeast">Northeast</SelectItem>
                <SelectItem value="southeast">Southeast</SelectItem>
                <SelectItem value="midwest">Midwest</SelectItem>
                <SelectItem value="west">West</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rankings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top 100 Rankings</CardTitle>
          <CardDescription>
            100m Freestyle - Long Course - All Regions
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
                <TableHead>State</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  rank: 1,
                  name: "Sarah Johnson",
                  time: "54.23",
                  club: "Aqua Force",
                  region: "Northeast",
                  state: "NY",
                  age: 16,
                  date: "2024-03-15",
                  avatar: "/avatars/sarah.jpg"
                },
                {
                  rank: 2,
                  name: "Michael Chen",
                  time: "54.45",
                  club: "Swim Elite",
                  region: "West",
                  state: "CA",
                  age: 15,
                  date: "2024-03-10",
                  avatar: "/avatars/michael.jpg"
                },
                {
                  rank: 3,
                  name: "Emma Davis",
                  time: "54.67",
                  club: "Wave Riders",
                  region: "Southeast",
                  state: "FL",
                  age: 14,
                  date: "2024-03-12",
                  avatar: "/avatars/emma.jpg"
                },
                {
                  rank: 4,
                  name: "Alex Thompson",
                  time: "54.89",
                  club: "Aqua Force",
                  region: "Northeast",
                  state: "MA",
                  age: 17,
                  date: "2024-03-08",
                  avatar: "/avatars/alex.jpg"
                },
                {
                  rank: 5,
                  name: "Maria Garcia",
                  time: "55.12",
                  club: "Swim Elite",
                  region: "West",
                  state: "TX",
                  age: 16,
                  date: "2024-03-14",
                  avatar: "/avatars/maria.jpg"
                }
              ].map((swimmer) => (
                <TableRow key={swimmer.rank}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {swimmer.rank <= 3 ? (
                        <Medal className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <span className="w-4 h-4"></span>
                      )}
                      <span>{swimmer.rank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={swimmer.avatar} alt={swimmer.name} />
                        <AvatarFallback>
                          {swimmer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{swimmer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{swimmer.time}</TableCell>
                  <TableCell>{swimmer.club}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{swimmer.region}</Badge>
                  </TableCell>
                  <TableCell>{swimmer.state}</TableCell>
                  <TableCell>{swimmer.age}</TableCell>
                  <TableCell>{swimmer.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Regional Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
            <CardDescription>
              Top performers by region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { region: "Northeast", swimmers: 28, avgTime: "55.2" },
                { region: "Southeast", swimmers: 32, avgTime: "55.8" },
                { region: "Midwest", swimmers: 25, avgTime: "56.1" },
                { region: "West", swimmers: 35, avgTime: "54.9" }
              ].map((region) => (
                <div key={region.region} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{region.region}</p>
                    <p className="text-sm text-muted-foreground">
                      {region.swimmers} swimmers
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium">{region.avgTime}</p>
                    <p className="text-sm text-muted-foreground">avg time</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Age Group Leaders</CardTitle>
            <CardDescription>
              Best times by age group
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { ageGroup: "13-14", name: "Emma Davis", time: "54.67" },
                { ageGroup: "15-16", name: "Sarah Johnson", time: "54.23" },
                { ageGroup: "17-18", name: "Alex Thompson", time: "54.89" },
                { ageGroup: "19+", name: "David Kim", time: "53.45" }
              ].map((leader) => (
                <div key={leader.ageGroup} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{leader.ageGroup}</p>
                    <p className="text-sm text-muted-foreground">
                      {leader.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium">{leader.time}</p>
                    <Badge variant="outline">Leader</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Standards Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Standards Progress</CardTitle>
          <CardDescription>
            Swimmers qualifying for different standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { standard: "AAAA", count: 12, color: "bg-purple-500" },
              { standard: "AAA", count: 28, color: "bg-blue-500" },
              { standard: "AA", count: 45, color: "bg-green-500" },
              { standard: "A", count: 67, color: "bg-yellow-500" }
            ].map((standard) => (
              <div key={standard.standard} className="text-center">
                <div className={`${standard.color} text-white rounded-lg p-4 mb-2`}>
                  <Trophy className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{standard.count}</div>
                  <div className="text-sm opacity-90">{standard.standard}</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {standard.count} swimmers qualified
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 