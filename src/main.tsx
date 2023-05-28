import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { WordsProvider } from './context/words';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WordsProvider>
      <App />
    </WordsProvider>
  </React.StrictMode>
);
