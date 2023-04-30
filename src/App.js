import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<HomePage />} />  
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
