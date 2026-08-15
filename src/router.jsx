import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import App from "./App"

export const router = createBrowserRouter([
    {path: '/', element: <App/>},
    {path: '/login', element: <Login/>},
    {path: '/dashboard', element: <Dashboard/>}
]);