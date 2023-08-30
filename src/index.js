import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

import App from './App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <StrictMode>
    <App />
  </StrictMode>
  
);
