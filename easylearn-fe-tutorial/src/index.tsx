// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ServiceProvider } from './ServiceProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ServiceProvider>
            <App />
        </ServiceProvider>
    </React.StrictMode>
);
