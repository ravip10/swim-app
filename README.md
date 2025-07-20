# SwimTracker - Comprehensive Swimming Analytics Platform

A modern web application for tracking swimmer progress, meet results, rankings, and standards progression. Built to solve the problem of silo-ed swimming data and improve swimmer motivation through comprehensive analytics.

## 🏊‍♀️ Features

### Core Functionality
- **Swimmer Profiles**: Complete swimmer management with progress tracking
- **Meet Results**: Import and track meet results from SwimCloud and USA Swimming
- **Rankings**: View rankings by stroke, region, state, course, and nationals
- **Standards Progression**: Track qualifying times and standards advancement
- **Performance Analytics**: Compare athletes and analyze trends
- **Search & Compare**: Advanced search with swimmer comparison tools

### Key Benefits
- **Unified Data**: Consolidates data from multiple sources (SwimCloud, USA Swimming)
- **Progress Tracking**: Visual progress indicators and improvement metrics
- **Motivation**: Clear progression paths and achievement tracking
- **Analytics**: Comprehensive performance analysis and trends
- **Standards**: Automatic standards qualification tracking

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **UI**: shadcn/ui with modern minimal theme
- **Database**: Neon (PostgreSQL)
- **Styling**: Tailwind CSS
- **Data Scraping**: Axios, Cheerio, Puppeteer
- **Charts**: Recharts for data visualization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Neon database account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swimming-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL=your_neon_database_url
   ```

4. **Set up the database**
   ```bash
   # Run the schema file to create tables
   psql $DATABASE_URL -f src/lib/schema.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses a comprehensive database schema with the following main tables:

- **swimmers**: Swimmer profiles and basic information
- **meets**: Meet information and scheduling
- **events**: Swimming events and distances
- **results**: Individual swim results and times
- **rankings**: Rankings by various criteria
- **standards**: Qualifying times and standards
- **progress**: Progress tracking and improvements

## 🔄 Data Import

### SwimCloud Integration
The app includes scrapers for SwimCloud data:
- Swimmer profiles and results
- Meet results and rankings
- Performance data extraction

### USA Swimming Integration
Official USA Swimming data integration:
- Meet results from official database
- Rankings and standards
- Swimmer profiles

## 🎨 UI Components

Built with shadcn/ui components:
- Modern, accessible design
- Responsive layout
- Dark/light mode support
- Consistent design system

## 📈 Key Pages

### Dashboard
- Overview of key metrics
- Recent activity feed
- Quick actions
- Performance trends

### Swimmers
- Swimmer profiles and search
- Progress tracking
- Performance analytics
- Standards qualification

### Rankings
- Filterable rankings by stroke/region/state
- Course-specific rankings
- Age group breakdowns
- Standards progress

### Meets
- Meet scheduling and results
- Performance analysis
- Record tracking
- Meet statistics

### Standards
- Qualifying times tracking
- Standards progression
- Age group standards
- Progress visualization

### Search & Compare
- Advanced search functionality
- Swimmer comparison tools
- Performance analysis
- Trend tracking

## 🔮 Future Features

- **LLM Integration**: AI-powered insights and recommendations
- **Voice Search**: Voice-enabled search and notes
- **Mobile App**: Native mobile application
- **Advanced Analytics**: Machine learning for performance prediction
- **Social Features**: Swimmer communities and sharing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository.

---

**Built with ❤️ for the swimming community**
