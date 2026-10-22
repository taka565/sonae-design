"use strict";
const settings = window.SONAE_SETTINGS || {};
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigation");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
navigation.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
document.addEventListener("click", event => { if (!event.target.closest(".header")) closeMenu(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") { closeMenu(); menuButton.focus(); }
});
window.matchMedia("(min-width: 901px)").addEventListener("change", closeMenu);
// Deep links to readings or service definitions open the containing details.
function revealHash() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  const details = target.closest("details");
  if (details && !details.open) { details.open = true; target.scrollIntoView({block:"start"}); }
}
window.addEventListener("hashchange", revealHash);
revealHash();
const email = typeof settings.contactEmail === "string" ? settings.contactEmail.trim() : "";
const hasEmail = /^[^\s@<>?&#]+@[^\s@<>?&#]+\.[^\s@<>?&#]+$/.test(email);
if (hasEmail) {
  document.getElementById("contact-state-label").textContent = "メールでご相談を受け付けています";
  document.getElementById("contact-box-title").textContent = "施設のこと、気になっていることをお聞かせください。";
  document.getElementById("contact-state-detail").textContent = email;
  const emailLink = document.getElementById("email-link");
  emailLink.href = `mailto:${email}?subject=${encodeURIComponent("ソナエデザイン｜" + emailLink.dataset.subject + "の相談")}`;
  emailLink.hidden = false;
}
const dialog = document.getElementById("content-dialog");
let returnFocus;
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char])); }
function openDialog(category, title, body) {
  returnFocus = document.activeElement;
  document.getElementById("dialog-category").textContent = category;
  document.getElementById("dialog-title").textContent = title;
  document.getElementById("dialog-body").innerHTML = body;
  dialog.showModal();
  document.body.style.overflow = "hidden";
  dialog.scrollTop = 0;
  dialog.querySelector(".dialog-close").focus();
}
dialog.addEventListener("close", () => { document.body.style.overflow = ""; if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true}); });
document.querySelectorAll(".dialog-close,.dialog-bottom-close").forEach(button => button.addEventListener("click", () => dialog.close()));
dialog.addEventListener("click", event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
document.querySelectorAll("[data-info]").forEach(button => button.addEventListener("click", () => {
  if (button.dataset.info === "operator") {
    const operator = settings.operatorName ? `<p>運営者：${escapeHtml(settings.operatorName)}</p>${settings.representative ? `<p>代表者：${escapeHtml(settings.representative)}</p>` : ""}${settings.operatorAddress ? `<p>所在地：${escapeHtml(settings.operatorAddress)}</p>` : ""}` : "<p>ソナエデザインは、防災・BCP・危機対応支援のブランドです。運営者名、代表者、所在地の掲載情報は現在準備中です。</p>";
    openDialog("運営情報", "ソナエデザインについて", `${operator}<p>事業内容：BCP・マニュアル策定／改善、職員研修、机上訓練、実践訓練、講師・研修登壇、月額・年間顧問、ACTION OSの紹介。</p><p>お問い合わせ：${hasEmail ? escapeHtml(email) : "受付窓口を準備中です。"}</p>`);
  } else {
    openDialog("プライバシー", "このサイトでの情報の取り扱い", "<p>このサイト独自のアクセス解析や広告トラッカーは設置していません。個人情報を入力・送信するフォームはありません。</p><h3>メールでのお問い合わせ</h3><p>メール窓口の開設後は、メールアプリからお問い合わせいただく形式です。受付開始時には、運営者、利用目的、問い合わせ窓口等の案内を整備します。</p><h3>外部サイトについて</h3><p>ACTION OSや公的機関へのリンクは外部サイトに移動します。移動先での取り扱いは、それぞれのサイトをご確認ください。ホスティングサービスでは、サービス提供に伴うアクセス情報等が処理される場合があります。</p>");
  }
}));
for (const [key, url] of [["goods",settings.goodsRankingUrl],["blog",settings.blogUrl]]) {
  const element = document.querySelector(`[data-media="${key}"]`);
  if (!element || typeof url !== "string") continue;
  let parsed;
  try { parsed = new URL(url); } catch { continue; }
  if (parsed.protocol !== "https:") continue;
  const link = document.createElement("a");
  link.className = "media-item"; link.textContent = element.firstChild.textContent.trim(); link.href = parsed.href; link.target = "_blank"; link.rel = "noopener noreferrer";
  const arrow = document.createElement("span"); arrow.textContent = "↗"; link.append(arrow); element.replaceWith(link);
}
