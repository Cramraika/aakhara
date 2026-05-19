import React from 'react';
import ReactDOM from 'react-dom/client';
// Sentry must be imported before any other app code so init runs first.
import Sentry from './sentry';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Sentry.ErrorBoundary fallback={<p>Something went wrong. The team has been notified.</p>}>
            <App />
        </Sentry.ErrorBoundary>
    </React.StrictMode>
);