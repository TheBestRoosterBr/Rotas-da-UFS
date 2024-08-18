import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/home';
import { RoutePage } from './pages/route';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/route',
        element: <RoutePage />
    }
]);

export function App() {
    return <RouterProvider router={router} />;
}

