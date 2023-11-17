import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import SignupPage from "./pages/auths/SignupPage";
import LoginPage from "./pages/auths/LoginPage";
import DashboardPage from "./pages/dashboardpage/DashboardPage";
import OverviewPage from "./pages/overviewpage/OverviewPage";
import TransactionsPage from "./pages/transactionspage/TransactionsPage";
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
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </div>
  );
}

export default App;
