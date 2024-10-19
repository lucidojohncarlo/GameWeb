import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import Tailwind CSS
import App from './App'; // Ensure this path is correct
import { AuthProvider } from './component/AuthContext'; // Import AuthProvider

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);