import { useState, useEffect } from "react";
import Header from "./Components/Header";
import TaxHarvestingPage from "./Pages/TaxHarvestingPage";
import TaxHarvestingDashboard from "./Components/TaxHarvestingDashboard.jsx";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <TaxHarvestingPage />
      {/* <TaxHarvestingDashboard /> */}
    </div>

  );
};

export default App;
