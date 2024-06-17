import { useState } from "react";

const themes = {
  garden : "garden",
  dark : "dark",
};

const ThemeToggler = () => {
  const [theme, setTheme] = useState(themes.light);

  const handleThemeToggle = () => {
   const newTheme = theme === themes.garden ? themes.dark : themes.garden;
   document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return <button onClick= {handleThemeToggle} className="btn btn-sm">
  {theme}
  </button>;
};
export default ThemeToggler;
