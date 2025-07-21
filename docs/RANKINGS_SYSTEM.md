# Rankings System Documentation

## Overview

The swimming app now supports a **dual rankings system** that provides both dynamic calculation and persistent caching for optimal performance and data accuracy.

## Architecture

### 1. Database Schema

#### New Tables

**`rankings_cache`** - Persistent storage for pre-calculated rankings
```sql
CREATE TABLE rankings_cache (
  id UUID PRIMARY KEY,
  swimmer_id UUID REFERENCES swimmers(id),
  event_id UUID REFERENCES events(id),
  time_id UUID REFERENCES times(id),
  rank INTEGER NOT NULL,
  total_swimmers INTEGER NOT NULL,
  
  -- Filter Context (what makes this ranking unique)
  stroke TEXT NOT NULL,
  distance INTEGER NOT NULL,
  course TEXT NOT NULL, -- SCY, LCM, SCM
  gender TEXT NOT NULL, -- M, F
  age_group TEXT NOT NULL, -- 8-under, 11-12, 13-14, etc.
  region TEXT, -- Eastern, Southern, etc.
  lsc TEXT, -- Local Swimming Committee
  season TEXT NOT NULL, -- 2024, 2025, etc.
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**`rankings_jobs`** - Job queue for scraping and processing
```sql
CREATE TABLE rankings_jobs (
  id UUID PRIMARY KEY,
  status TEXT NOT NULL, -- pending, running, completed, failed
  filters JSONB NOT NULL, -- the filters used for scraping
  total_records INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  error_message TEXT
);
```

#### Enhanced Tables

**`events`** - Added `course` field
```sql
ALTER TABLE events ADD COLUMN course TEXT NOT NULL DEFAULT 'SCY';
```

### 2. API Endpoints

#### `/api/rankings` (Dynamic)
- **Method**: GET
- **Purpose**: Calculate rankings on-the-fly from joined tables
- **Performance**: Slower but always up-to-date
- **Use Case**: Real-time queries, small datasets

#### `/api/rankings-cache` (Persistent)
- **Method**: GET
- **Purpose**: Query pre-calculated rankings from cache
- **Performance**: Fast, optimized queries
- **Use Case**: Production queries, large datasets

#### `/api/rankings-jobs` (Management)
- **Method**: GET - List scraping jobs
- **Method**: POST - Create new scraping job
- **Purpose**: Manage SwimCloud data collection

### 3. Frontend Features

#### Rankings Page (`/rankings`)
- **Toggle Switch**: Choose between dynamic and cached rankings
- **Real-time Filtering**: Apply filters and see immediate results
- **Performance Indicators**: Shows total swimmers count for cached data
- **Refresh Button**: Manually refresh current query

#### Admin Page (`/admin/rankings`)
- **Job Management**: Create and monitor scraping jobs
- **Status Tracking**: Real-time job status with icons
- **Error Handling**: View failed jobs and error messages
- **Filter Preview**: See what filters each job is processing

## Usage Examples

### 1. View Rankings (User Experience)

**Dynamic Mode (Default)**
```
1. Navigate to /rankings
2. Apply filters (stroke, distance, age group, etc.)
3. Results calculate in real-time from database
4. Always shows latest data
```

**Cached Mode**
```
1. Navigate to /rankings
2. Toggle "Data Source" switch to "Database"
3. Apply filters
4. Results load instantly from pre-calculated cache
5. Shows total swimmers count
```

### 2. Admin Management

**Create Scraping Job**
```
1. Navigate to /admin/rankings
2. Click "New Job"
3. System creates job with default filters
4. Job status shows "pending"
5. Background process handles scraping
```

**Monitor Jobs**
```
1. View job status: pending → running → completed/failed
2. Check total records processed
3. Review error messages for failed jobs
4. Track completion times
```

## Data Flow

### Dynamic Rankings Flow
```
User Request → API → Join Tables → Calculate Ranks → Return Results
```

### Cached Rankings Flow
```
User Request → API → Query Cache → Return Results
```

### Scraping Flow
```
Admin Creates Job → Background Process → Scrape SwimCloud → Store in Cache → Update Job Status
```

## Performance Comparison

| Aspect | Dynamic | Cached |
|--------|---------|--------|
| **Speed** | Slower (2-5s) | Fast (<500ms) |
| **Data Freshness** | Real-time | Stale (depends on scraping schedule) |
| **Resource Usage** | High (CPU/DB) | Low |
| **Scalability** | Limited | High |
| **Complexity** | Simple queries | Complex caching logic |

## Filter Combinations

The system supports these filter combinations for rankings:

### Required Filters
- **Stroke**: Free, Back, Breast, Fly, IM
- **Distance**: 50, 100, 200, 500, 1000, 1650
- **Course**: SCY, LCM, SCM
- **Gender**: M, F
- **Age Group**: 8-under, 10u, 11-12, 13-14, 15-16, 17-18, 19+, 18u
- **Season**: 2024, 2025, etc.

### Optional Filters
- **Region**: Eastern, Southern, Central, Western
- **LSC**: Local Swimming Committee codes

## Future Enhancements

### 1. Semantic Search (pgvector)
- **Purpose**: Natural language queries
- **Implementation**: Add vector embeddings to rankings
- **Use Cases**: "Find similar swimmers", "Top performers in region"

### 2. Advanced Scraping
- **Puppeteer Integration**: Automated SwimCloud scraping
- **Rate Limiting**: Respect website policies
- **Data Validation**: Ensure scraped data quality

### 3. Real-time Updates
- **Webhooks**: SwimCloud data change notifications
- **Incremental Updates**: Only update changed rankings
- **Background Jobs**: Scheduled scraping tasks

## Migration Guide

### 1. Database Setup
```bash
# Run migration script
npx tsx scripts/migrate-rankings.ts

# Populate sample data
npx tsx scripts/populate-rankings-cache.ts
```

### 2. Environment Variables
```env
DATABASE_URL=your_neon_database_url
```

### 3. Dependencies
```bash
npm install @radix-ui/react-switch @radix-ui/react-label
```

## Troubleshooting

### Common Issues

**1. No cached rankings showing**
- Check if rankings_cache table has data
- Verify filter combinations match cached data
- Try switching to dynamic mode

**2. Scraping jobs failing**
- Check job error messages in admin panel
- Verify SwimCloud accessibility
- Review rate limiting settings

**3. Performance issues**
- Add database indexes
- Optimize filter queries
- Consider pagination for large datasets

### Debug Commands

```bash
# Check rankings cache data
npx tsx scripts/query-rankings.ts

# Test API endpoints
curl "http://localhost:3000/api/rankings-cache?stroke=Free&distance=100"

# Monitor job status
curl "http://localhost:3000/api/rankings-jobs"
```

## Best Practices

### 1. Data Management
- **Regular Scraping**: Schedule jobs to keep cache fresh
- **Data Validation**: Verify scraped data accuracy
- **Backup Strategy**: Regular database backups

### 2. Performance
- **Index Optimization**: Monitor query performance
- **Cache Warming**: Pre-populate popular filter combinations
- **Load Balancing**: Distribute scraping jobs

### 3. User Experience
- **Loading States**: Show progress indicators
- **Error Handling**: Graceful fallbacks
- **Filter Persistence**: Remember user preferences

## API Reference

### Rankings Cache API

**GET /api/rankings-cache**
```typescript
interface QueryParams {
  stroke?: string;        // Default: 'Free'
  distance?: string;      // Default: '100'
  course?: string;        // Default: 'SCY'
  gender?: string;        // Default: 'all'
  ageGroup?: string;      // Default: 'all'
  region?: string;        // Default: 'all'
  lsc?: string;          // Default: 'all'
  season?: string;        // Default: '2024'
  limit?: string;         // Default: '100'
}
```

**Response**
```typescript
interface RankingCache {
  rank: number;
  total_swimmers: number;
  swimmer_id: string;
  name: string;
  club: string;
  region: string;
  lsc: string;
  age: number;
  gender: string;
  time_seconds: string;
  time_formatted: string;
  event_name: string;
  meet_name: string;
  meet_date: string;
  is_personal_best: boolean;
  stroke: string;
  distance: number;
  course: string;
  age_group: string;
  season: string;
}
```

### Rankings Jobs API

**GET /api/rankings-jobs**
```typescript
interface Job {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  filters: SwimCloudFilters;
  total_records?: number;
  created_at: string;
  completed_at?: string;
  error_message?: string;
}
```

**POST /api/rankings-jobs**
```typescript
interface CreateJobRequest {
  filters: SwimCloudFilters;
}
``` 