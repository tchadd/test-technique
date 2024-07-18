import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Connection from "./pages/Connection";

import Home from "./pages/Home";
// import Add from "./pages/Add";
// import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/connection' element={<Connection/>}/>
        <Route path='/register' element={<Register/>}/>

        {/* <Route path="/edit/:id" element={<Edit />} /> */}
        {/* <Route path="/add" element={<Add />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
