export const API_URL = process.env.REACT_APP_API_URL || 
  (window.location.port === '3001' ? 'http://localhost:3002' : '');
export const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 
  (window.location.port === '3001' ? 'http://localhost:3000' : '');
export const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || 
  (window.location.port === '3001' ? 'http://localhost:3001/dashboard' : '/dashboard');
