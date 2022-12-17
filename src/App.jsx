import React from "react";
// import { pokemon as items } from "./pokemon";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./page/Homepage";
import Location from "./page/Location";
import LocationDetails from "./page/LocationDetails";
import Login from "./page/Login";
import Fight from "./page/Fight";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/location"
          element={<ProtectedRoute component={Location} />}
        />
        <Route
          path="/location/:id"
          element={<ProtectedRoute component={LocationDetails} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/fight" element={<ProtectedRoute component={Fight} />} />
      </Routes>
    </BrowserRouter>
  );
}
