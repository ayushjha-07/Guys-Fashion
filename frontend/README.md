# FashionStore Frontend

Modern, responsive React application for the FashionStore e-commerce platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   └── product/         # ProductCard, FilterSidebar
├── context/             # React Context (Auth, Cart, Products)
├── pages/               # Page components
├── services/            # API service layer
├── App.js              # Main application component
├── App.css             # Global styles
└── index.js            # Application entry point
```

## 🎨 Features

- **Modern UI**: Clean, professional design with smooth animations
- **Responsive**: Works on all devices (mobile, tablet, desktop)
- **State Management**: React Context API for global state
- **API Integration**: Axios-based service layer
- **Notifications**: Toast notifications for user feedback
- **Routing**: React Router v6 for navigation
- **Performance**: Optimized rendering and lazy loading

## 🔧 Configuration

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## 📦 Dependencies

- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `react-toastify` - Notifications
- `react-icons` - Icon library

## 🎯 Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 968px
- Desktop: > 968px

## 🎨 Styling

- CSS3 with CSS Variables
- Flexbox & Grid layouts
- Smooth animations and transitions
- Mobile-first approach

## 🔐 Authentication

The app uses JWT tokens stored in localStorage for authentication. Tokens are automatically attached to API requests via Axios interceptors.

## 🛒 State Management

### AuthContext
- User authentication state
- Login/logout functionality
- Token management

### CartContext
- Shopping cart state
- Add/remove items
- Quantity updates
- Cart persistence

### ProductContext
- Product listings
- Filters and search
- Featured products
- Categories

## 📄 License

MIT License - see LICENSE file for details
