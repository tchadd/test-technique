import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductIndex from "./pages/products/Index";
import ProductNew from "./pages/products/New";
import ProductEdit from "./pages/products/Edit";
import AuthLogin from "./pages/auth/Login";
// import Add from "./pages/Add";
// import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<ProductIndex/>} />
        <Route path="/products/new" element={<ProductNew/>} />
        <Route path="/products/:id/edit" element={<ProductEdit/>} />
        <Route path="/login" element={<AuthLogin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
