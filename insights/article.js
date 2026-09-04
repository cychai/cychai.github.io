(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector(".article-theme-toggle");
  var savedTheme = null;

  if (!toggle) return;

  try {
    savedTheme = localStorage.getItem("profile-theme");
  } catch (error) {
    // 本地存储不可用时使用系统主题。
  }

  function setTheme(theme) {
    var isDark = theme === "dark";
    root.dataset.theme = theme;
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "切换为白色主题" : "切换为黑色主题");
    toggle.textContent = isDark ? "○" : "●";
    window.dispatchEvent(new CustomEvent("article-theme-change"));
    try {
      localStorage.setItem("profile-theme", theme);
    } catch (error) {
      // 主题切换不依赖本地存储。
    }
  }

  toggle.addEventListener("click", function () {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  setTheme(
    savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
})();
