export const getSystemTheme = () => {
  var media = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;
  return media && media.matches ? "light" : "dark";
};

export const applyTheme = (theme) => () => {
  var resolved = theme === "light" ? "light" : "dark";
  var root = document.documentElement;
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
};
