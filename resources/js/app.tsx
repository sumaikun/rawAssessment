import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import MainView from './views/MainView';

const rootElement = document.getElementById('app');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
        <div className="bg-image">
            <MainView />
        </div>
    </React.StrictMode>,
  );
}
