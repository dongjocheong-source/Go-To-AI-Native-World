/**
 * icons.js — inline SVG icon set shared by index.html and every generated
 * detail page. All icons are simple hand-authored line icons (24x24,
 * stroke=currentColor, fill=none) so no external icon font/CDN is required
 * and the site works fully offline from a plain file:// open.
 *
 * Add a new category icon by adding a new "name: '<path d="...">'" entry.
 */
const ICONS = {
  "file-text":
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M8 9h2"/>',
  folder:
    '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  bookmark: '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/>',
  "edit-3":
    '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  "book-open":
    '<path d="M2 5c2-1 5-1 7 0v14c-2-1-5-1-7 0Z"/><path d="M22 5c-2-1-5-1-7 0v14c2-1 5-1 7 0Z"/>',
  coffee:
    '<path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M7 3c0 1-1 1-1 2s1 1 1 2"/><path d="M11 3c0 1-1 1-1 2s1 1 1 2"/>',
  zap: '<path d="M13 2 4 14h6l-1 8 9-12h-6Z"/>',
  user: '<path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  calendar:
    '<path d="M4 5h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/>',
  star: '<path d="m12 2 3.1 6.9 7.4.8-5.6 5 1.6 7.3L12 18.3 5.5 22l1.6-7.3-5.6-5 7.4-.8Z"/>',
  play: '<path d="M6 3.5v17l14-8.5Z"/>',
  "arrow-left": '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  trash:
    '<path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="M6 6l12 12"/>',
  layers:
    '<path d="M12 2 2 7l10 5 10-5Z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>',
  rss: '<path d="M4 4a16 16 0 0 1 16 16"/><path d="M4 11a9 9 0 0 1 9 9"/><circle cx="5" cy="19" r="1.5"/>',
  film:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8h18"/><path d="M3 16h18"/><path d="M8 3v18"/><path d="M16 3v18"/>',
  database:
    '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 2v3"/><path d="M15 2v3"/><path d="M9 19v3"/><path d="M15 19v3"/><path d="M2 9h3"/><path d="M2 15h3"/><path d="M19 9h3"/><path d="M19 15h3"/>',
  terminal:
    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 9l4 3-4 3"/><path d="M12 15h6"/>',
  "message-circle":
    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z"/>',
  device:
    '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  image:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  code: '<path d="m8 6-6 6 6 6"/><path d="m16 6 6 6-6 6"/>',
  video:
    '<path d="M23 7l-7 5 7 5V7Z"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
  music:
    '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
};

function iconSvg(name, extraAttrs) {
  const inner = ICONS[name] || ICONS["file-text"];
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${
    extraAttrs || ""
  }>${inner}</svg>`;
}

if (typeof module !== "undefined") {
  module.exports = { ICONS, iconSvg };
}
