(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector(".language-toggle");
  var themeToggle = document.querySelector(".theme-toggle");
  var languageNodes = document.querySelectorAll("[data-zh][data-en]");
  var toggleOptions = document.querySelectorAll(".toggle-option");
  var portrait = document.querySelector(".portrait");
  var qrImage = document.querySelector(".qr-card img");
  var title = document.querySelector("title");
  var description = document.querySelector('meta[name="description"]');
  var themeColor = document.querySelector('meta[name="theme-color"]');
  var savedLanguage;
  var savedTheme;

  try {
    savedLanguage = localStorage.getItem("profile-language");
    savedTheme = localStorage.getItem("profile-theme");
  } catch (error) {
    savedLanguage = null;
    savedTheme = null;
  }
  var initialLanguage = savedLanguage === "en" ? "en" : "zh";
  var initialTheme = savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  function updateThemeLabel() {
    var isDark = root.dataset.theme === "dark";
    var isEnglish = root.lang === "en";

    if (!themeToggle) {
      return;
    }

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isEnglish
        ? isDark ? "Switch to light theme" : "Switch to dark theme"
        : isDark ? "切换为白色主题" : "切换为黑色主题"
    );
  }

  function setTheme(theme) {
    var isDark = theme === "dark";

    root.dataset.theme = theme;
    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#0b0b0b" : "#ffffff");
    }
    updateThemeLabel();

    try {
      localStorage.setItem("profile-theme", theme);
    } catch (error) {
      // 存储不可用时，主题切换仍可正常工作。
    }
  }

  function setLanguage(language) {
    var isEnglish = language === "en";

    root.lang = isEnglish ? "en" : "zh-CN";
    languageNodes.forEach(function (node) {
      node.textContent = node.dataset[language];
    });

    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isEnglish));
      toggle.setAttribute(
        "aria-label",
        isEnglish ? "切换到中文" : "Switch to English"
      );
    }
    if (toggleOptions.length >= 2) {
      toggleOptions[0].classList.toggle("active", !isEnglish);
      toggleOptions[1].classList.toggle("active", isEnglish);
    }
    if (portrait) {
      portrait.alt = isEnglish ? "Portrait of Chai Chunyan" : "柴春燕肖像";
    }
    if (qrImage) {
      qrImage.alt = isEnglish
        ? "QR code for Chai Chunyan's WeChat Official Account"
        : "柴春燕微信公众号二维码";
    }
    if (document.body.dataset.titleZh) {
      title.textContent = isEnglish
        ? document.body.dataset.titleEn
        : document.body.dataset.titleZh;
      description.setAttribute(
        "content",
        isEnglish
          ? document.body.dataset.descriptionEn
          : document.body.dataset.descriptionZh
      );
    } else if (portrait) {
      title.textContent = isEnglish
        ? "Chai Chunyan | Technology Leader · AI Search & Agent Engineering"
        : "柴春燕｜技术负责人 · AI 搜索与 Agent 工程化";
      description.setAttribute(
        "content",
        isEnglish
          ? "Chai Chunyan is a Technology Leader at ByteDance with 18 years of experience, focused on AI search, GEO, agent engineering, and platform architecture."
          : "柴春燕，字节跳动技术负责人，拥有 18 年互联网研发与技术管理经验，关注 AI 搜索、GEO、Agent 工程化与平台架构。"
      );
    }
    updateThemeLabel();

    try {
      localStorage.setItem("profile-language", language);
    } catch (error) {
      // 存储不可用时，页面仍可正常完成语言切换。
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setLanguage(root.lang === "en" ? "zh" : "en");
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
  setTheme(initialTheme);
  setLanguage(initialLanguage);
})();
