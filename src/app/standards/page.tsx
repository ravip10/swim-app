import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Target, 
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

export default function StandardsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Standards</h1>
        <p className="text-muted-foreground">
          Track qualifying times and standards progression
        </p>
      </div>

      {/* Filters */}
      <Card className="relative z-0">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            <Select defaultValue="15-16">
              <SelectTrigger>
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10u">10 & Under</SelectItem>
                <SelectItem value="11-12">11-12</SelectItem>
                <SelectItem value="13-14">13-14</SelectItem>
                <SelectItem value="15-16">15-16</SelectItem>
                <SelectItem value="17-18">17-18</SelectItem>
                <SelectItem value="19+">19+</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="female">
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="2024">
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Standards Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AAAA Standards</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AAA Standards</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">28</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AA Standards</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">45</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Standards</CardTitle>
            <Target className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">67</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Standards Table */}
      <Card>
        <CardHeader>
          <CardTitle>Qualifying Times</CardTitle>
          <CardDescription>
            15-16 Female - Long Course - 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>AAAA</TableHead>
                <TableHead>AAA</TableHead>
                <TableHead>AA</TableHead>
                <TableHead>A</TableHead>
                <TableHead>Qualified</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  event: "50m Freestyle",
                  aaaa: "25.89",
                  aaa: "26.89",
                  aa: "27.89",
                  a: "28.89",
                  qualified: 8,
                  progress: 75
                },
                {
                  event: "100m Freestyle",
                  aaaa: "54.23",
                  aaa: "56.23",
                  aa: "58.23",
                  a: "1:00.23",
                  qualified: 12,
                  progress: 85
                },
                {
                  event: "200m Freestyle",
                  aaaa: "1:58.45",
                  aaa: "2:02.45",
                  aa: "2:06.45",
                  a: "2:10.45",
                  qualified: 6,
                  progress: 60
                },
                {
                  event: "100m Backstroke",
                  aaaa: "1:02.34",
                  aaa: "1:05.34",
                  aa: "1:08.34",
                  a: "1:11.34",
                  qualified: 9,
                  progress: 70
                },
                {
                  event: "100m Breaststroke",
                  aaaa: "1:08.56",
                  aaa: "1:12.56",
                  aa: "1:16.56",
                  a: "1:20.56",
                  qualified: 5,
                  progress: 45
                }
              ].map((standard, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{standard.event}</TableCell>
                  <TableCell className="font-mono text-purple-600">{standard.aaaa}</TableCell>
                  <TableCell className="font-mono text-blue-600">{standard.aaa}</TableCell>
                  <TableCell className="font-mono text-green-600">{standard.aa}</TableCell>
                  <TableCell className="font-mono text-yellow-600">{standard.a}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{standard.qualified}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${standard.progress}%` }}
                      ></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Standards Progress */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Standards Progression</CardTitle>
            <CardDescription>
              Swimmers advancing through standards levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", from: "AA", to: "AAA", event: "100m Freestyle", time: "55.23" },
                { name: "Michael Chen", from: "A", to: "AA", event: "200m Butterfly", time: "2:01.45" },
                { name: "Emma Davis", from: "AAA", to: "AAAA", event: "50m Freestyle", time: "25.67" },
                { name: "Alex Thompson", from: "AA", to: "AAA", event: "100m Backstroke", time: "1:03.12" }
              ].map((progression, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{progression.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {progression.event} • {progression.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{progression.from}</Badge>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <Badge variant="secondary">{progression.to}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Standards Distribution</CardTitle>
            <CardDescription>
              Breakdown by standard level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { standard: "AAAA", count: 12, percentage: 8, color: "bg-purple-500" },
                { standard: "AAA", count: 28, percentage: 19, color: "bg-blue-500" },
                { standard: "AA", count: 45, percentage: 30, color: "bg-green-500" },
                { standard: "A", count: 67, percentage: 43, color: "bg-yellow-500" }
              ].map((level) => (
                <div key={level.standard} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{level.standard}</span>
                    <span className="text-sm text-muted-foreground">
                      {level.count} swimmers ({level.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${level.color} h-2 rounded-full`}
                      style={{ width: `${level.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Standards Management</CardTitle>
          <CardDescription>
            Update and manage qualifying standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button className="w-full" variant="outline">
              <Target className="mr-2 h-4 w-4" />
              Update Standards
            </Button>
            <Button className="w-full" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Track Progress
            </Button>
            <Button className="w-full" variant="outline">
              <Award className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
            <Button className="w-full" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              View Qualifiers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 