import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app.tsx';


const rootDOM = document.getElementById('root');
if (!rootDOM)
    throw new Error('Can\'t find root element!');

const root = createRoot(rootDOM);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

