import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Trophy, 
  Calendar,
  MapPin,
  Users,
  Award,
  TrendingUp
} from "lucide-react";

export default function MeetsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meets</h1>
          <p className="text-muted-foreground">
            Track meet results, schedules, and performance analytics
          </p>
        </div>
        <Button>
          <Trophy className="mr-2 h-4 w-4" />
          Add Meet
        </Button>
      </div>

      {/* Upcoming Meets */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meets</CardTitle>
          <CardDescription>
            Scheduled meets in the next 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meet Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Swimmers</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: "Spring Championship",
                  date: "2024-04-15",
                  location: "Aquatic Center, NY",
                  course: "LCM",
                  level: "Regional",
                  swimmers: 156
                },
                {
                  name: "Junior Nationals",
                  date: "2024-04-22",
                  location: "Olympic Pool, CA",
                  course: "LCM",
                  level: "National",
                  swimmers: 342
                },
                {
                  name: "State Championships",
                  date: "2024-04-28",
                  location: "University Pool, TX",
                  course: "SCY",
                  level: "State",
                  swimmers: 89
                }
              ].map((meet, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{meet.name}</TableCell>
                  <TableCell>{meet.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{meet.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{meet.course}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{meet.level}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{meet.swimmers}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Results */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Meet Results</CardTitle>
            <CardDescription>
              Latest meet performances and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  meet: "Winter Invitational",
                  date: "2024-03-10",
                  swimmers: 124,
                  records: 8,
                  personalBests: 45
                },
                {
                  meet: "Regional Championships",
                  date: "2024-03-15",
                  swimmers: 89,
                  records: 3,
                  personalBests: 23
                },
                {
                  meet: "State Finals",
                  date: "2024-03-20",
                  swimmers: 156,
                  records: 12,
                  personalBests: 67
                }
              ].map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{result.meet}</p>
                    <p className="text-sm text-muted-foreground">
                      {result.date} • {result.swimmers} swimmers
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{result.records} records</Badge>
                      <Badge variant="secondary">{result.personalBests} PBs</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meet Statistics</CardTitle>
            <CardDescription>
              Performance metrics across all meets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Meets</span>
                <span className="text-2xl font-bold">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Swimmers</span>
                <span className="text-2xl font-bold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Records Set</span>
                <span className="text-2xl font-bold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Personal Bests</span>
                <span className="text-2xl font-bold">892</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meet Performance Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Meet Performance Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of meet results and trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-4">
              <h4 className="font-medium">Top Performing Meets</h4>
              {[
                { name: "National Championships", improvement: "+15.2%", swimmers: 234 },
                { name: "Regional Finals", improvement: "+12.8%", swimmers: 156 },
                { name: "State Championships", improvement: "+10.5%", swimmers: 189 }
              ].map((meet, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="font-medium text-sm">{meet.name}</p>
                    <p className="text-xs text-muted-foreground">{meet.swimmers} swimmers</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">{meet.improvement}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Course Performance</h4>
              {[
                { course: "Long Course (LCM)", avgTime: "2:15.4", improvement: "+3.2%" },
                { course: "Short Course (SCM)", avgTime: "2:12.8", improvement: "+2.8%" },
                { course: "Short Course Yards", avgTime: "1:58.3", improvement: "+4.1%" }
              ].map((course, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="font-medium text-sm">{course.course}</p>
                    <p className="text-xs text-muted-foreground">{course.avgTime}</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">{course.improvement}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Meet Levels</h4>
              {[
                { level: "Local", meets: 12, avgSwimmers: 45 },
                { level: "Regional", meets: 8, avgSwimmers: 89 },
                { level: "State", meets: 4, avgSwimmers: 156 },
                { level: "National", meets: 2, avgSwimmers: 234 }
              ].map((level, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="font-medium text-sm">{level.level}</p>
                    <p className="text-xs text-muted-foreground">{level.meets} meets</p>
                  </div>
                  <span className="text-sm font-medium">{level.avgSwimmers} avg</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common meet management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button className="w-full" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meet
            </Button>
            <Button className="w-full" variant="outline">
              <Trophy className="mr-2 h-4 w-4" />
              Import Results
            </Button>
            <Button className="w-full" variant="outline">
              <Award className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
            <Button className="w-full" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 