import { useState } from "react";

const themes = {
  light : "light",
  dark : "dark",
};

const ThemeToggler = () => {
  const [theme, setTheme] = useState(themes.light);

  const handleThemeToggle = () => {
   const newTheme = theme === themes.light ? themes.dark : themes.light;
   document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return <button onClick= {handleThemeToggle} className="btn btn-sm">
  {theme}
  </button>;
};
export default ThemeToggler;
