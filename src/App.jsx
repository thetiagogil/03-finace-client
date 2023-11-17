import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import SignupPage from "./pages/auths/SignupPage";
import LoginPage from "./pages/auths/LoginPage";
import DashboardPage from "./pages/dashboardpage/DashboardPage";
import OverviewTrackedPage from "./pages/overviewpage/OverviewTrackedPage";
import OverviewPlannedPage from "./pages/overviewpage/OverviewPlannedPage";
import TransactionsTrackedPage from "./pages/transactionspage/TransactionsTrackedPage";
import TransactionsPlannedPage from "./pages/transactionspage/TransactionsPlannedPage";
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
        <Route path="/overview/tracked" element={<OverviewTrackedPage />} />
        <Route path="/overview/planned" element={<OverviewPlannedPage />} />
        <Route path="/transactions/tracked" element={<TransactionsTrackedPage />} />
        <Route path="/transactions/planned" element={<TransactionsPlannedPage />} />
      </Routes>
    </div>
  );
}

export default App;
