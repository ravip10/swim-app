import { SwimCloudScraper } from './scrapers/swimcloud';
import { USASwimmingScraper } from './scrapers/usaswimming';
import sql from './db';

export class DataImporter {
  private swimcloudScraper: SwimCloudScraper;
  private usaswimmingScraper: USASwimmingScraper;

  constructor() {
    this.swimcloudScraper = new SwimCloudScraper();
    this.usaswimmingScraper = new USASwimmingScraper();
  }

  async importSwimmerFromSwimCloud(swimmerId: string) {
    try {
      // Get swimmer profile
      const profile = await this.swimcloudScraper.getSwimmerProfile(swimmerId);
      if (!profile) {
        throw new Error('Swimmer not found');
      }

      // Insert or update swimmer
      const swimmer = await sql.query(`
        INSERT INTO swimmers (name, club, region, state, swimcloud_id)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (swimcloud_id) DO UPDATE SET
          name = EXCLUDED.name,
          club = EXCLUDED.club,
          region = EXCLUDED.region,
          state = EXCLUDED.state
        RETURNING *
      `, [profile.name, profile.club, profile.region, profile.state, profile.id]);

      // Get swimmer results
      const results = await this.swimcloudScraper.getSwimmerResults(swimmerId);
      
      // Import results
      for (const result of results) {
        await this.importResult(result, swimmer[0].id);
      }

      return {
        success: true,
        swimmer: swimmer[0],
        resultsImported: results.length
      };
    } catch (error) {
      console.error('Error importing swimmer from SwimCloud:', error);
      throw error;
    }
  }

  async importMeetResults(meetId: string, source: 'swimcloud' | 'usaswimming') {
    try {
      let results;
      
      if (source === 'swimcloud') {
        // Import from SwimCloud
        results = await this.swimcloudScraper.getSwimmerResults(meetId);
      } else {
        // Import from USA Swimming
        results = await this.usaswimmingScraper.getMeetResults(meetId);
      }

      let importedCount = 0;
      
      for (const result of results) {
        try {
          await this.importResult(result);
          importedCount++;
        } catch (error) {
          console.error('Error importing result:', error);
        }
      }

      return {
        success: true,
        resultsImported: importedCount,
        totalResults: results.length
      };
    } catch (error) {
      console.error('Error importing meet results:', error);
      throw error;
    }
  }

  private async importResult(result: any, swimmerId?: number) {
    // First, ensure the event exists
    const event = await sql.query(`
      INSERT INTO events (name, distance, stroke, course_type)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (name, course_type) DO UPDATE SET
        distance = EXCLUDED.distance,
        stroke = EXCLUDED.stroke
      RETURNING *
    `, [result.event, this.parseDistance(result.event), this.parseStroke(result.event), result.course]);

    // Insert the result
    await sql.query(`
      INSERT INTO results (swimmer_id, event_id, time_ms, time_string, place, is_personal_best)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      swimmerId,
      event[0].id,
      result.timeMs,
      result.time,
      result.place,
      result.isPersonalBest || false
    ]);
  }

  private parseDistance(eventName: string): number {
    // Extract distance from event name (e.g., "100m Freestyle" -> 100)
    const match = eventName.match(/(\d+)m/);
    return match ? parseInt(match[1]) : 0;
  }

  private parseStroke(eventName: string): string {
    // Extract stroke from event name
    if (eventName.includes('Freestyle')) return 'Freestyle';
    if (eventName.includes('Backstroke')) return 'Backstroke';
    if (eventName.includes('Breaststroke')) return 'Breaststroke';
    if (eventName.includes('Butterfly')) return 'Butterfly';
    if (eventName.includes('IM')) return 'IM';
    return 'Freestyle'; // Default
  }

  async updateRankings() {
    try {
      // Clear existing rankings
      await sql.query('DELETE FROM rankings');

      // Generate new rankings for each event/course/age group combination
      const events = await sql.query('SELECT * FROM events');
      
      for (const event of events) {
        await this.generateRankingsForEvent(event.id);
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating rankings:', error);
      throw error;
    }
  }

  private async generateRankingsForEvent(eventId: number) {
    // Get all results for this event, ordered by time
    const results = await sql.query(`
      SELECT 
        r.swimmer_id,
        r.time_ms,
        r.time_string,
        s.region,
        s.state,
        EXTRACT(YEAR FROM AGE(s.birth_date)) as age
      FROM results r
      JOIN swimmers s ON r.swimmer_id = s.id
      WHERE r.event_id = $1
      ORDER BY r.time_ms ASC
    `, [eventId]);

    // Generate rankings
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const rank = i + 1;
      const percentile = ((results.length - rank) / results.length) * 100;

      await sql.query(`
        INSERT INTO rankings (
          swimmer_id, event_id, time_ms, time_string, rank, 
          total_swimmers, percentile, region, state, age_group
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        result.swimmer_id,
        eventId,
        result.time_ms,
        result.time_string,
        rank,
        results.length,
        percentile,
        result.region,
        result.state,
        this.getAgeGroup(result.age)
      ]);
    }
  }

  private getAgeGroup(age: number): string {
    if (age <= 10) return '10u';
    if (age <= 12) return '11-12';
    if (age <= 14) return '13-14';
    if (age <= 16) return '15-16';
    if (age <= 18) return '17-18';
    return '19+';
  }
} 