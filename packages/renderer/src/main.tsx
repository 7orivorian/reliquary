import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './pages/App';
import {StrictMode} from 'react';
import './index.scss';

const router = createBrowserRouter([
    {
        path: '/*',
        element: <App />,
        errorElement: <h2>Error</h2>,
    },
]);

const root = createRoot(document.body);
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);