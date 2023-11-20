import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auths/SignupPage";
import LoginPage from "./pages/auths/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import YearsPage from "./pages/overview/YearsPage";
import MonthsPage from "./pages/overview/MonthsPage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import NavbarHorizontal from "./components/navbar/NavbarHorizontal";
import NavbarVertical from "./components/navbar/NavbarVertical";

function App() {
  const location = useLocation();

  const renderNavbars = () => {
    const isAuthPage = ["/login", "/signup"].includes(location.pathname);

    if (!isAuthPage) {
      return (
        <div>
          <NavbarHorizontal />
          <NavbarVertical />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderNavbars()}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* OVERVIEW ROUTES */}
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
          element={<MonthsPage />}
        />
        <Route
          path="/overview/planned/:year"
          element={<MonthsPage />}
        />

        {/* TRANSACTIONS ROUTES */}
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
