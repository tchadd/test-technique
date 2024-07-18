import React from "react";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import ProductIndex from "./pages/products/Index";
import ProductNew from "./pages/products/New";
import ProductEdit from "./pages/products/Edit";
import AuthLogin from "./pages/auth/Login";
import { router } from "./router";

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App
