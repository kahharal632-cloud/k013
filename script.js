(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var mobileNav = document.getElementById("mobile-nav");

  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Close mobile menu on resize to desktop ---------- */
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 860 && mobileNav) {
      mobileNav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Price table: class tabs highlight matching column ---------- */
  var tabs = document.querySelectorAll(".price-tab");
  var table = document.getElementById("price-table");

  function highlightColumn(index) {
    if (!table) return;
    var colNum = index + 2; // +1 for 1-based nth-child, +1 to skip the name column

    table.querySelectorAll("th.is-highlight, td.is-highlight").forEach(function (cell) {
      cell.classList.remove("is-highlight");
    });

    table.querySelectorAll(
      "thead tr th:nth-child(" + colNum + "), tbody tr td:nth-child(" + colNum + ")"
    ).forEach(function (cell) {
      cell.classList.add("is-highlight");
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      var index = parseInt(tab.getAttribute("data-class"), 10) || 0;
      highlightColumn(index);

      // On small screens, scroll the highlighted column into view.
      var scrollWrap = table.closest(".table-scroll");
      if (scrollWrap && window.innerWidth < 900) {
        var headerCell = table.querySelectorAll("thead th")[index + 1];
        if (headerCell) {
          scrollWrap.scrollTo({
            left: headerCell.offsetLeft - 16,
            behavior: "smooth"
          });
        }
      }
    });
  });

  if (tabs.length) {
    highlightColumn(0);
  }

  /* ---------- Smooth-scroll offset for sticky header on anchor links ---------- */
  var header = document.querySelector(".site-header");

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      var headerHeight = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();
