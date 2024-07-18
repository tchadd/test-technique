import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import ProductIndex from "./pages/products/Index";
import ProductNew from "./pages/products/New";
import ProductEdit from "./pages/products/Edit";
import AuthLogin from "./pages/auth/Login";

export const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/products", element: <ProductIndex/>},
    {path: "/products/new", element: <ProductNew/>},
    {path: "/products/:id/edit", element: <ProductEdit/>},
    {path: "/login", element: <AuthLogin/>},
])