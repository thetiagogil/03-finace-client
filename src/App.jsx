import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/auths/SignupPage";
import LoginPage from "./pages/auths/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import OverviewTrackedYearsPage from "./pages/overview/tracked/OverviewTrackedYearsPage";
import OverviewTrackedMonthsPage from "./pages/overview/tracked/OverviewTrackedMonthsPage";
import OverviewPlannedYearsPage from "./pages/overview/planned/OverviewPlannedYearsPage";
import OverviewPlannedMonthsPage from "./pages/overview/planned/OverviewPlannedMonthsPage";
import TransactionsTrackedYearsPage from "./pages/transactions/tracked/TransactionsTrackedYearsPage";
import TransactionsTrackedMonthsPage from "./pages/transactions/tracked/TransactionsTrackedMonthsPage";
import TransactionsPlannedYearsPage from "./pages/transactions/planned/TransactionsPlannedYearsPage";
import TransactionsPlannedMonthsPage from "./pages/transactions/planned/TransactionsPlannedMonthsPage";
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
          element={<OverviewTrackedYearsPage />}
        />
        <Route
          path="/overview/tracked/:year"
          element={<OverviewTrackedMonthsPage />}
        />
        <Route
          path="/overview/planned"
          element={<OverviewPlannedYearsPage />}
        />
        <Route
          path="/overview/planned/:year"
          element={<OverviewPlannedMonthsPage />}
        />

        {/* TRANSACTIONS ROUTES */}
        <Route
          path="/transactions/tracked"
          element={<TransactionsTrackedYearsPage />}
        />
        <Route
          path="/transactions/tracked/:year"
          element={<TransactionsTrackedMonthsPage />}
        />
        <Route
          path="/transactions/planned"
          element={<TransactionsPlannedYearsPage />}
        />
        <Route
          path="/transactions/planned/:year"
          element={<TransactionsPlannedMonthsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
