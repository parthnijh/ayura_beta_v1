# Ayura Circularity Platform - Frontend

A comprehensive React.js frontend for the Ayura Circularity Platform, designed to track and monitor aluminium industry sustainability through data-driven circularity metrics.

## 🚀 Features

### Multi-User Dashboard System
- **Government Dashboard**: National oversight, compliance monitoring, and approval management
- **Company Dashboard**: Performance tracking, peer comparison, and actionable recommendations
- **Citizen Dashboard**: Gamified public access with leaderboards and environmental impact metrics

### Data Management
- **Stage-wise Data Input**: Comprehensive forms for mining, refining, smelting, fabrication, and recycling stages
- **Real-time Validation**: Form validation with estimated circularity score calculation
- **Progress Tracking**: Visual progress indicators for multi-stage data submission

### Advanced Visualizations
- **Interactive Charts**: Bar charts, line charts, pie charts, and radar charts using Recharts
- **Performance Metrics**: Circularity scores, carbon intensity, energy efficiency, and water usage
- **Trend Analysis**: Monthly trends, state-wise comparisons, and peer benchmarking

### Modern UI/UX
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Modern Styling**: Clean, professional design with smooth animations and transitions

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing and navigation
- **Recharts**: Interactive data visualization library
- **Lucide React**: Modern icon library
- **CSS3**: Custom styling with modern features (Grid, Flexbox, CSS Variables)
- **Axios**: HTTP client for API communication (ready for backend integration)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Main navigation component
│   └── Navbar.css         # Navigation styles
├── context/
│   └── AuthContext.js     # Authentication context provider
├── pages/
│   ├── Home.js            # Landing page
│   ├── Home.css           # Landing page styles
│   ├── Login.js           # User authentication
│   ├── Login.css          # Login page styles
│   ├── GovernmentDashboard.js  # Government user dashboard
│   ├── CompanyDashboard.js     # Company user dashboard
│   ├── CitizenDashboard.js     # Citizen user dashboard
│   ├── DataInput.js       # Company data input forms
│   ├── DataInput.css      # Data input styles
│   └── Dashboard.css      # Shared dashboard styles
├── App.js                 # Main application component
├── App.css               # Global styles and utilities
└── index.js              # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ayura-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 👥 User Roles & Access

### Government Officials
- **Access**: Ministry of Mines, CPCB, MoSPI, State Pollution Boards
- **Features**: 
  - National and state-level dashboards
  - Company compliance monitoring
  - Approval/rejection workflows
  - Performance trend analysis

### Company Representatives
- **Access**: Vedanta, Hindalco, NALCO, and other aluminium companies
- **Features**:
  - Stage-wise performance tracking
  - Peer comparison and benchmarking
  - Data input and submission
  - Actionable recommendations

### Citizens
- **Access**: Public portal
- **Features**:
  - Gamified leaderboards
  - Environmental impact metrics
  - Educational content
  - Achievement system

## 📊 Key Metrics Tracked

### Environmental Metrics
- **Carbon Intensity**: kg CO₂ per tonne of production
- **Energy Efficiency**: kWh per tonne with renewable energy percentage
- **Water Usage**: Litres per tonne with recycling rates
- **Waste Recovery**: Percentage of waste/by-products recovered

### Circularity Indicators
- **Recycled Input**: Percentage of recycled materials in production
- **Transport Efficiency**: Logistics emissions optimization
- **Resource Utilization**: Overall resource efficiency scores

## 🎨 Design System

### Color Palette
- **Primary Blue**: #1e3a8a (Deep blue for headers and primary actions)
- **Secondary Blue**: #3b82f6 (Interactive elements and links)
- **Success Green**: #10b981 (Positive metrics and achievements)
- **Warning Orange**: #f59e0b (Alerts and attention items)
- **Error Red**: #ef4444 (Errors and critical issues)

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Headings**: Bold weights with proper hierarchy
- **Body Text**: Regular weight with optimal line height

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with validation states
- **Charts**: Consistent color schemes and responsive design

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

### API Integration
The frontend is designed to work with a Flask backend. Update the API endpoints in the components when the backend is ready:

- Authentication endpoints
- Data submission endpoints
- Dashboard data endpoints
- File upload endpoints

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 320px to 767px

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Clear focus indicators and logical tab order

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify**: Connect your GitHub repository for automatic deployments
- **Vercel**: Deploy with zero configuration
- **AWS S3**: Upload the build folder to an S3 bucket
- **Docker**: Use the included Dockerfile for containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation wiki

## 🔮 Future Enhancements

- **Real-time Updates**: WebSocket integration for live data updates
- **Advanced Analytics**: Machine learning insights and predictions
- **Mobile App**: React Native version for mobile devices
- **Internationalization**: Multi-language support
- **Dark Mode**: Theme switching capability
- **Offline Support**: Progressive Web App features

---

Built with ❤️ for sustainable aluminium industry practices.