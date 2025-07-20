import axios from 'axios';

export interface USASwimmingResult {
  swimmerId: string;
  swimmerName: string;
  event: string;
  time: string;
  timeMs: number;
  meet: string;
  date: string;
  place: number;
  points: number;
  course: 'LCM' | 'SCM' | 'SCY';
  ageGroup: string;
  gender: string;
}

export interface USASwimmingRanking {
  rank: number;
  swimmerName: string;
  time: string;
  timeMs: number;
  club: string;
  region: string;
  state: string;
  ageGroup: string;
  gender: string;
}

export class USASwimmingScraper {
  private baseUrl = 'https://data.usaswimming.org/datahub/usas/timeseventrank';

  async getMeetResults(meetId: string): Promise<USASwimmingResult[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/meet/${meetId}/results`);
      
      if (!response.data || !Array.isArray(response.data)) {
        return [];
      }

      return response.data.map((result: any) => ({
        swimmerId: result.swimmer_id,
        swimmerName: result.swimmer_name,
        event: result.event,
        time: result.time,
        timeMs: this.parseTimeToMs(result.time),
        meet: result.meet_name,
        date: result.meet_date,
        place: result.place,
        points: result.points || 0,
        course: result.course_type,
        ageGroup: result.age_group,
        gender: result.gender
      }));
    } catch (error) {
      console.error('Error fetching meet results:', error);
      return [];
    }
  }

  async getRankings(event: string, course: string, gender: string, ageGroup: string, year: number): Promise<USASwimmingRanking[]> {
    try {
      const params = {
        event,
        course,
        gender,
        age_group: ageGroup,
        year
      };

      const response = await axios.get(`${this.baseUrl}/rankings`, { params });
      
      if (!response.data || !Array.isArray(response.data)) {
        return [];
      }

      return response.data.map((ranking: any) => ({
        rank: ranking.rank,
        swimmerName: ranking.swimmer_name,
        time: ranking.time,
        timeMs: this.parseTimeToMs(ranking.time),
        club: ranking.club,
        region: ranking.region,
        state: ranking.state,
        ageGroup: ranking.age_group,
        gender: ranking.gender
      }));
    } catch (error) {
      console.error('Error fetching rankings:', error);
      return [];
    }
  }

  async getSwimmerProfile(swimmerId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/swimmer/${swimmerId}`);
      
      if (!response.data) {
        return null;
      }

      return {
        id: swimmerId,
        name: response.data.name,
        birthDate: response.data.birth_date,
        gender: response.data.gender,
        club: response.data.club,
        region: response.data.region,
        state: response.data.state
      };
    } catch (error) {
      console.error('Error fetching swimmer profile:', error);
      return null;
    }
  }

  async getStandards(year: number, course: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/standards`, {
        params: { year, course }
      });
      
      if (!response.data || !Array.isArray(response.data)) {
        return [];
      }

      return response.data.map((standard: any) => ({
        event: standard.event,
        standardType: standard.standard_type,
        time: standard.time,
        timeMs: this.parseTimeToMs(standard.time),
        gender: standard.gender,
        ageGroup: standard.age_group,
        year: standard.year
      }));
    } catch (error) {
      console.error('Error fetching standards:', error);
      return [];
    }
  }

  private parseTimeToMs(timeString: string): number {
    // Parse time string like "1:45.23" to milliseconds
    const parts = timeString.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0]);
      const seconds = parseFloat(parts[1]);
      return Math.round((minutes * 60 + seconds) * 1000);
    } else if (parts.length === 1) {
      const seconds = parseFloat(parts[0]);
      return Math.round(seconds * 1000);
    }
    return 0;
  }
} 