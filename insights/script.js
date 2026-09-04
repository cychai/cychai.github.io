(function () {
  "use strict";

  var root = document.documentElement;
  var languageToggle = document.querySelector(".language-toggle");
  var themeToggle = document.querySelector(".theme-toggle");
  var languageNodes = document.querySelectorAll("[data-zh][data-en]");
  var toggleOptions = document.querySelectorAll(".toggle-option");
  var savedLanguage = null;
  var savedTheme = null;

  try {
    savedLanguage = localStorage.getItem("profile-language");
    savedTheme = localStorage.getItem("profile-theme");
  } catch (error) {
    // 本地存储不可用时使用默认设置。
  }

  function setTheme(theme) {
    var isDark = theme === "dark";
    root.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      root.lang === "en"
        ? isDark ? "Switch to light theme" : "Switch to dark theme"
        : isDark ? "切换为白色主题" : "切换为黑色主题"
    );
    try {
      localStorage.setItem("profile-theme", theme);
    } catch (error) {
      // 主题切换不依赖本地存储。
    }
  }

  function setLanguage(language) {
    var isEnglish = language === "en";
    root.lang = isEnglish ? "en" : "zh-CN";
    languageNodes.forEach(function (node) {
      node.textContent = node.dataset[language];
    });
    languageToggle.setAttribute("aria-pressed", String(isEnglish));
    languageToggle.setAttribute("aria-label", isEnglish ? "切换到中文" : "Switch to English");
    toggleOptions[0].classList.toggle("active", !isEnglish);
    toggleOptions[1].classList.toggle("active", isEnglish);
    setTheme(root.dataset.theme);
    try {
      localStorage.setItem("profile-language", language);
    } catch (error) {
      // 语言切换不依赖本地存储。
    }
  }

  themeToggle.addEventListener("click", function () {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  languageToggle.addEventListener("click", function () {
    setLanguage(root.lang === "en" ? "zh" : "en");
  });

  setTheme(
    savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  setLanguage(savedLanguage === "en" ? "en" : "zh");
})();
