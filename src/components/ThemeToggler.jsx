import { useState } from "react";

const themes = {
  garden : "garden",
  dark : "dark",
};

const ThemeToggler = () => {
  const [theme, setTheme] = useState(themes.garden);

  const handleThemeToggle = () => {
   const newTheme = theme === themes.garden ? themes.dark : themes.garden;
   document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return <button onClick= {handleThemeToggle} className="btn btn-sm">
  {theme === themes.garden ? "🌙" : "🌞"}
  </button>;
};
export default ThemeToggler;