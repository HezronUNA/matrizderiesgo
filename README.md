# Cybersecurity Risk Management Dashboard

A comprehensive, production-ready cybersecurity risk assessment and management system built with Next.js, TypeScript, and modern web technologies.

## 🚀 Features

### Risk Registration Section
- **Risk Code Input**: Unique identifier system (R001, R002, etc.)
- **Risk Identification**: Comprehensive risk naming and description
- **Probability Assessment**: 5-level scale (Very Low to Very High) with weighted scoring
- **Impact Analysis**: Detailed impact description and weighted scoring
- **Form Validation**: Complete input validation and error handling

### Risk Analysis Dashboard
- **Risk Selection**: Dropdown-based risk selection for detailed analysis
- **Statistical Display**: Probability, impact, and calculated risk scores
- **Risk Classification**: Automatic categorization (Low, Medium, High, Critical)
- **Detailed Metrics**: Comprehensive risk statistics and timeline information

### Dashboard Features
- **Risk Matrix Visualization**: Interactive 5x5 probability vs impact matrix
- **Color-Coded Risk Levels**: Blue/cyan gradient theme with risk-specific colors
- **Filtering System**: "Worst Risks" filter for high and critical risks only
- **Statistics Overview**: Total risks by level with visual indicators
- **Modern UI**: Responsive design with cards, charts, and intuitive navigation

### Alert System
- **Critical Risk (21-25)**: "IMMEDIATE ACTION REQUIRED" - Red-blue gradient
- **High Risk (16-20)**: "High Priority - Action Needed" - Orange-blue
- **Medium Risk (6-15)**: "Monitor Closely" - Yellow-blue
- **Low Risk (1-5)**: "Acceptable Risk" - Green-blue

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom blue/cyan theme
- **UI Components**: Custom component library with Radix UI patterns
- **Icons**: Lucide React
- **State Management**: React hooks with local state
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## 📁 Project Structure

```
MatrizDeRiesgo/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx       # Button component with variants
│   │   ├── card.tsx         # Card layout components
│   │   ├── input.tsx        # Form input component
│   │   ├── select.tsx       # Dropdown select component
│   │   ├── textarea.tsx     # Multi-line text input
│   │   └── label.tsx        # Form label component
│   ├── navigation.tsx       # Main navigation component
│   ├── risk-form.tsx        # Risk registration form
│   ├── risk-analysis.tsx    # Risk analysis dashboard
│   ├── risk-matrix.tsx      # Risk matrix visualization
│   └── risk-summary.tsx     # Risk summary and statistics
├── lib/
│   ├── constants.ts         # Risk levels and configuration
│   └── utils.ts             # Utility functions
├── types/
│   └── risk.ts              # TypeScript interfaces
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MatrizDeRiesgo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Usage

### 1. Dashboard Overview
- Start with the main dashboard to view risk statistics
- Monitor critical and high-risk items
- Use filtering to focus on specific risk levels

### 2. Risk Registration
- Navigate to "Risk Registration" tab
- Fill out the comprehensive risk assessment form
- All fields are required and validated
- Risk codes are automatically generated

### 3. Risk Analysis
- Select specific risks from the dropdown
- View detailed probability and impact analysis
- Monitor risk scores and classifications
- Review action alerts and recommendations

### 4. Risk Matrix
- Visual representation of probability vs impact
- Color-coded risk levels for quick identification
- Interactive cells with detailed information
- Statistical breakdown by risk category

## 🎨 Design System

### Color Scheme
- **Primary**: Blue-400 (#60a5fa) to Blue-600 (#2563eb)
- **Secondary**: Cyan-500 (#06b6d4) to Cyan-600 (#0891b2)
- **Accent**: Sky-500 (#0ea5e9) for highlights
- **Risk Levels**: Gradient combinations for visual impact

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, high contrast for readability
- **Body Text**: Optimized for scanning and comprehension

### Layout
- **Grid System**: Responsive grid with Tailwind CSS
- **Cards**: Consistent card-based layout
- **Spacing**: Consistent spacing using Tailwind scale
- **Responsive**: Mobile-first design approach

## 🔒 Security Features

- **Input Validation**: Comprehensive form validation
- **Type Safety**: Full TypeScript implementation
- **Data Sanitization**: Proper handling of user inputs
- **Secure Patterns**: Modern React security practices

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive design at all screen sizes
- **Touch Friendly**: Optimized for touch interfaces
- **Accessibility**: WCAG compliant design patterns

## 🧪 Code Quality

- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Code quality and consistency
- **Component Architecture**: Reusable, maintainable components
- **Performance**: Optimized rendering and state management

## 🚀 Future Enhancements

- **Data Persistence**: Database integration
- **User Authentication**: Multi-user support
- **Risk Tracking**: Historical risk evolution
- **Reporting**: Export and reporting capabilities
- **Integration**: API integrations with security tools
- **Real-time Updates**: WebSocket notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Review the documentation

---

**Built with ❤️ for cybersecurity education and risk management**
