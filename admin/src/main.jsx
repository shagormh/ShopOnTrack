import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Foundation/Root.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Orders from './pages/Orders/Orders.jsx';
import List from './pages/List/List.jsx';
import Add from './pages/Add/Add.jsx';
import AdminContext from './Context/AdminContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Add />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/add",
        element: <Add />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AdminContext>
    <Toaster
      position="top-right"
      reverseOrder={false}
      />
  <RouterProvider router={router} />
      
      </AdminContext>
    </>,
)
