import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FormProvider } from './FormProvider';
import "bootstrap/dist/css/bootstrap.min.css";
// Remove the Router import from here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FormProvider>
    <App /> {/* App is wrapped in Router internally */}
  </FormProvider>
);

reportWebVitals();
