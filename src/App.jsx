import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auths/SignupPage";
import LoginPage from "./pages/auths/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import YearsPage from "./pages/years/YearsPage";
import OverviewMonthsPage from "./pages/overview/OverviewMonthsPage";
import TransactionsMonthsPage from "./pages/transactions/TransactionsMonthsPage";
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
          element={<YearsPage page="overview" type="tracked" />}
        />
        <Route
          path="/overview/planned"
          element={<YearsPage page="overview" type="planned" />}
        />
        <Route
          path="/overview/tracked/:year"
          element={<OverviewMonthsPage />}
        />
        <Route
          path="/overview/planned/:year"
          element={<OverviewMonthsPage />}
        />

        {/* TRANSACTIONS ROUTES */}
        <Route
          path="/transactions/tracked"
          element={<YearsPage page="transactions" type="tracked" />}
        />
        <Route
          path="/transactions/planned"
          element={<YearsPage page="transactions" type="planned" />}
        />
        <Route
          path="/transactions/tracked/:year"
          element={<TransactionsMonthsPage />}
        />
        <Route
          path="/transactions/planned/:year"
          element={<TransactionsMonthsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
