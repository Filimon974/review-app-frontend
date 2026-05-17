import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlaceDetails from "./pages/PlaceDetails";
import SavedPlaces from "./pages/SavedPlaces";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import CreateReview from "./pages/CreateReview";
import ReviewDetails from "./pages/ReviewDetails";
import AdminPlaces from "./pages/admin/AdminPlaces";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EditPlace from "./pages/admin/EditPlace";
import AdminRoute from "./components/AdminRoute";
import AdminTags from "./pages/admin/AdminTags";
import Search from "./pages/Search";
import EditReview from "./pages/EditReview";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>} />

        <Route path="/place/:id" element={<PlaceDetails />} />

        <Route path="/saved" element={
          <ProtectedRoute>
            <SavedPlaces />
          </ProtectedRoute>} />

        <Route path="/create-review" element={
          <ProtectedRoute>
            <CreateReview />
          </ProtectedRoute>} />

        <Route path="/reviews/:id" element={<ReviewDetails />} />

        <Route path="/admin/places" element={
          <AdminRoute>
            <AdminPlaces />
          </AdminRoute>} />

        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>} />

          <Route path="/admin/tags" element={
            <AdminRoute>
              <AdminTags />
            </AdminRoute>} />

        <Route path="/admin/places/edit/:id" element={<EditPlace />} />
        <Route path="/search" element={<Search />} />
        <Route path="/reviews/edit/:id" element={<EditReview />} />
      </Routes>

    </BrowserRouter>

  );

}

export default App;