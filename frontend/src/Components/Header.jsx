const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header
      className="
        flex items-center justify-between px-6 py-4
        bg-white dark:bg-gray-900
        border-b border-gray-200 dark:border-gray-700
        shadow-sm
        sticky top-0 z-50
      "
    >
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Koin<span className="text-orange-400">X</span>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="
          px-4 py-2 text-sm rounded-md 
          bg-blue-600 text-white 
          hover:bg-blue-700 
          transition
        "
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;