import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import SignupPage from "./pages/auths/SignupPage";
import LoginPage from "./pages/auths/LoginPage";
import NavbarHorizontal from "./components/navbar/NavbarHorizontal";

function App() {
  return (
    <div>
      <NavbarHorizontal />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
