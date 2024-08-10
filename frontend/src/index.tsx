import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app.tsx';


// Load theme mode (dark or light)
const theme: string | null = localStorage.getItem('themeMode');
if (theme != null && theme == 'dark' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.add('dark')
else
    document.documentElement.classList.remove('dark')


// Start React manipulation
const rootDOM: HTMLElement | null = document.getElementById('root');
if (rootDOM == null)
    throw new Error('Can\'t find root element!');

const root = createRoot(rootDOM);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

