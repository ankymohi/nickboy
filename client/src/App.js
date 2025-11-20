import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Success from "./pages/Success";
import PromoCheckout from "./pages/PromoCheckout";   // ✅ NEW

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/login" element={<Login />} />

        {/* Normal checkout */}
        <Route path="/CheckoutPage" element={<CheckoutPage />} />

        {/* Promo checkout — NEW */}
        <Route path="/promo-checkout" element={<PromoCheckout />} />  {/* ✅ */}

       <Route path="/payment-success" element={<Success />} />
<Route path="/payment-failure" element={<div>Pagamento falhou</div>} />
<Route path="/payment-pending" element={<div>Pagamento pendente</div>} />


        {/* Protected Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
