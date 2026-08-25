/**
 * main.js — renders the sidebar (from CATEGORIES) and the item grid for
 * whichever category is currently selected. Clicking an item card navigates
 * to its static detail page at items/{id}.html, or
 * items/{category.folder}/{id}.html when the category declares a `folder`
 * (see data.js).
 *
 * View states:
 * - Portal view (#portal-view): default view on first load, and whatever
 *   the "INFO HUB" logo button (#brand-home) returns you to. Shows a static
 *   cover hero (see .hero-cover in style.css). No sidebar item is active in
 *   this state. The old 12-tool/modality showcase now lives at
 *   items/C_AI_Tools/c00.html (category C00's intro item).
 * - Category view (#category-view): shown after clicking a sidebar item.
 *
 * Depends on: data.js (CATEGORIES), icons.js (iconSvg)
 */
(function () {
  const navList = document.getElementById("nav-list");
  const brandHome = document.getElementById("brand-home");
  const portalView = document.getElementById("portal-view");
  const categoryView = document.getElementById("category-view");
  const pageEyebrow = document.getElementById("page-eyebrow");
  const pageTitle = document.getElementById("page-title");
  const pageDesc = document.getElementById("page-desc");
  const itemCount = document.getElementById("item-count");
  const itemGrid = document.getElementById("item-grid");

  function renderSidebar(activeId) {
    navList.innerHTML = CATEGORIES.map((cat) => {
      const active = cat.id === activeId ? "active" : "";
      return `
        <li>
          <button class="nav-item ${active}" data-category="${cat.id}">
            ${iconSvg(cat.icon)}
            <span>${cat.label}</span>
          </button>
        </li>`;
    }).join("");

    navList.querySelectorAll(".nav-item").forEach((btn) => {
      btn.addEventListener("click", () => selectCategory(btn.dataset.category));
    });
  }

  function renderCategory(cat) {
    pageEyebrow.textContent = "CATEGORY";
    pageTitle.textContent = cat.label;
    pageDesc.textContent = cat.description;
    itemCount.textContent = `${cat.items.length}개 항목`;

    if (!cat.items.length) {
      itemGrid.innerHTML = `<div class="empty-state">이 카테고리에는 아직 항목이 없습니다.</div>`;
      return;
    }

    itemGrid.innerHTML = cat.items
      .map(
        (item) => `
        <a class="item-card" href="items/${cat.folder ? cat.folder + "/" : ""}${item.id}.html">
          <div class="card-cover" style="background: linear-gradient(160deg, hsl(${item.hue} 70% 42%), hsl(${item.hue} 55% 18%));">
            ${iconSvg(cat.icon)}
            <span class="card-play">${iconSvg("play")}</span>
          </div>
          <p class="card-title">${item.title}</p>
          <p class="card-meta">${item.meta}</p>
        </a>`
      )
      .join("");
  }

  // Chrome (and some other browsers) throw a SecurityError from
  // history.replaceState()/pushState() when the page is opened directly as
  // a file:// document (its origin is "null", which fails the same-origin
  // check the History API performs). That's exactly how this site is meant
  // to be opened (double-click index.html), so we must never let a failed
  // history update break navigation — it's a nice-to-have for deep-linking
  // only, never required for the view switch itself.
  function safeReplaceState(url) {
    try {
      history.replaceState(null, "", url);
    } catch (err) {
      /* ignore — file:// origin restriction, see comment above */
    }
  }

  function selectCategory(id) {
    const cat = CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
    renderSidebar(cat.id);
    renderCategory(cat);
    portalView.hidden = true;
    categoryView.hidden = false;
    safeReplaceState(`#${cat.id}`);
  }

  function goToPortal() {
    renderSidebar(null); // no category active while on the portal
    categoryView.hidden = true;
    portalView.hidden = false;
    safeReplaceState(location.pathname + location.search);
  }

  brandHome.addEventListener("click", goToPortal);

  const initialId = (location.hash || "").replace("#", "");
  if (initialId && CATEGORIES.some((c) => c.id === initialId)) {
    selectCategory(initialId);
  } else {
    goToPortal();
  }
})();
