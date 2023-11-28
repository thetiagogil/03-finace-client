import "./App.css";
import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auths/SignupPage";
import LoginPage from "./pages/auths/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import YearsPage from "./pages/overview/years/YearsPage";
import MonthsPage from "./pages/overview/months/MonthsPage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div>
      {!["/login", "/signup"].includes(location.pathname) && (
        <div>
          <Navbar />
          <Sidebar />
        </div>
      )}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED ROUTES */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/overview/tracked"
          element={<YearsPage pageProp="overview" typeProp="tracked" />}
        />
        <Route
          path="/overview/planned"
          element={<YearsPage pageProp="overview" typeProp="planned" />}
        />
        <Route
          path="/overview/tracked/:year"
          element={<MonthsPage typeProp="tracked" />}
        />
        <Route
          path="/overview/planned/:year"
          element={<MonthsPage typeProp="planned" />}
        />
        <Route
          path="/transactions/tracked/"
          element={<TransactionsPage typeProp="tracked" />}
        />
        <Route
          path="/transactions/planned/"
          element={<TransactionsPage typeProp="planned" />}
        />
      </Routes>
    </div>
  );
}

export default App;
