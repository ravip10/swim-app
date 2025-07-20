import axios from 'axios';
import * as cheerio from 'cheerio';

export interface SwimCloudSwimmer {
  id: string;
  name: string;
  club?: string;
  region?: string;
  state?: string;
  birthDate?: string;
  gender?: string;
}

export interface SwimCloudResult {
  event: string;
  time: string;
  timeMs: number;
  meet: string;
  date: string;
  place?: number;
  course: 'LCM' | 'SCM' | 'SCY';
}

export class SwimCloudScraper {
  private baseUrl = 'https://www.swimcloud.com';

  async getSwimmerProfile(swimmerId: string): Promise<SwimCloudSwimmer | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/swimmer/${swimmerId}/`);
      const $ = cheerio.load(response.data);
      
      const name = $('.swimmer-name').text().trim();
      const club = $('.swimmer-club').text().trim();
      const region = $('.swimmer-region').text().trim();
      const state = $('.swimmer-state').text().trim();
      
      return {
        id: swimmerId,
        name,
        club,
        region,
        state
      };
    } catch (error) {
      console.error('Error fetching swimmer profile:', error);
      return null;
    }
  }

  async getSwimmerResults(swimmerId: string): Promise<SwimCloudResult[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/swimmer/${swimmerId}/times/`);
      const $ = cheerio.load(response.data);
      
      const results: SwimCloudResult[] = [];
      
      $('.time-row').each((_, element) => {
        const $row = $(element);
        const event = $row.find('.event').text().trim();
        const time = $row.find('.time').text().trim();
        const meet = $row.find('.meet').text().trim();
        const date = $row.find('.date').text().trim();
        const place = parseInt($row.find('.place').text().trim()) || undefined;
        const course = $row.find('.course').text().trim() as 'LCM' | 'SCM' | 'SCY';
        
        results.push({
          event,
          time,
          timeMs: this.parseTimeToMs(time),
          meet,
          date,
          place,
          course
        });
      });
      
      return results;
    } catch (error) {
      console.error('Error fetching swimmer results:', error);
      return [];
    }
  }

  async getRankings(event: string, course: string, gender: string, ageGroup?: string): Promise<any[]> {
    try {
      const url = `${this.baseUrl}/times/${course}/${event}/${gender}/`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      const rankings: any[] = [];
      
      $('.ranking-row').each((_, element) => {
        const $row = $(element);
        const rank = parseInt($row.find('.rank').text().trim());
        const name = $row.find('.name').text().trim();
        const time = $row.find('.time').text().trim();
        const club = $row.find('.club').text().trim();
        
        rankings.push({
          rank,
          name,
          time,
          timeMs: this.parseTimeToMs(time),
          club
        });
      });
      
      return rankings;
    } catch (error) {
      console.error('Error fetching rankings:', error);
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