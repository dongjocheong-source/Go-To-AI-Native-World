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
 *   three stacked sections: intro (.hero-intro) → cover (.hero-cover) →
 *   latest posts (.latest, filled from LATEST_POSTS in data.js). No sidebar
 *   item is active in this state. The old 12-tool/modality showcase now lives at
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
  const latestGrid = document.getElementById("latest-grid");

  // Portal section (3): the three "최신 글" cards. Content comes from
  // LATEST_POSTS in data.js; title/href are resolved from CATEGORIES so a
  // renamed item never has to be updated in two places.
  function renderLatest() {
    if (!latestGrid || typeof LATEST_POSTS === "undefined") return;

    latestGrid.innerHTML = LATEST_POSTS.map((post) => {
      const cat = CATEGORIES.find((c) => c.id === post.cat);
      const item = cat && cat.items.find((i) => i.id === post.item);
      if (!item) return "";
      const href = `items/${cat.folder ? cat.folder + "/" : ""}${item.id}.html`;
      const summary = post.summary || (item.body || "").split("\n")[0];
      return `
        <a class="latest-card" href="${href}">
          <p class="latest-card-date">${post.date || ""}</p>
          <h3 class="latest-card-title">${item.title}</h3>
          <p class="latest-card-summary">${summary}</p>
          <p class="latest-card-more">더 읽기 →</p>
        </a>`;
    }).join("");
  }

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
  renderLatest();

  const initialId = (location.hash || "").replace("#", "");
  if (initialId && CATEGORIES.some((c) => c.id === initialId)) {
    selectCategory(initialId);
  } else {
    goToPortal();
  }
})();
