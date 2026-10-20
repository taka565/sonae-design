"use strict";

const settings = window.SONAE_SETTINGS || {};
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigation");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});
navigation.addEventListener("click", event => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", event => {
  if (!event.target.closest(".header")) closeMenu();
});
window.matchMedia("(min-width: 741px)").addEventListener("change", closeMenu);

document.querySelectorAll("[data-interest]").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("interest").value = link.dataset.interest;
    document.getElementById("form-status").textContent = "";
  });
});

const filters = [...document.querySelectorAll("[data-filter]")];
const cards = [...document.querySelectorAll(".journal-card")];
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(other => other.setAttribute("aria-pressed", String(other === button)));
  let count = 0;
  cards.forEach(card => {
    const show = button.dataset.filter === "all" || card.dataset.category === button.dataset.filter;
    card.hidden = !show;
    if (show) count += 1;
  });
  document.getElementById("filter-status").textContent = `${button.textContent}の記事を${count}件表示しています。`;
}));

const articles = {
  bcp: {
    category: "SONAE JOURNAL / BCP",
    title: "そのBCP、いまの現場に合っていますか。",
    body: `<p>BCPは、作成時の組織の姿を前提にしています。人員や設備、業務の進め方が変わったら、計画にも見直しが必要です。まずは、次の5つを確認してみましょう。</p>
      <ol><li><strong>連絡先と役割は、いまの体制と一致しているか。</strong><br>異動・退職した担当者の名前が残っていないか。責任者が不在のときの代行者も確認します。</li>
      <li><strong>少人数の時間帯でも実行できるか。</strong><br>日中だけでなく、夜間・休日など、実際の勤務体制で役割が重なりすぎないかを考えます。</li>
      <li><strong>優先する業務が具体的か。</strong><br>すべてを通常どおり続けることが難しいとき、何を優先するか。現場で判断できる粒度に整理します。</li>
      <li><strong>必要な資料・道具にアクセスできるか。</strong><br>停電や通信障害を想定し、紙の連絡先、保管場所、鍵の管理なども確認します。</li>
      <li><strong>訓練で見つかった課題が反映されているか。</strong><br>気づきを残し、改訂する人と期限を決めます。更新した内容を職員に伝えるところまでが見直しです。</li></ol>
      <p>一度にすべてを直す必要はありません。「現場で困りそうなこと」を一つ選び、確かめるところから始めてみてください。</p>
      <p class="article-cta">関連する支援：<a href="#service-bcp" data-dialog-target="service-bcp">BCP・マニュアル策定／改善</a></p>`
  },
  training: {
    category: "SONAE JOURNAL / TRAINING",
    title: "机上訓練を、「話し合い」で終わらせない。",
    body: `<p>机上訓練は、想定した状況のもとで判断や連携を確かめる機会です。参加者が活発に話せたかに加え、「次に何を変えるか」が残るように設計してみましょう。</p>
      <h3>確認したいことを、一つ決める。</h3><p>例えば「責任者と連絡がつかないときの判断」「夜間の役割分担」「複数拠点の情報共有」。目的を絞ると、シナリオや振り返りの観点が揃います。</p>
      <h3>答えだけでなく、迷った理由を残す。</h3><p>判断が止まった場面では、どの情報が足りなかったのか、誰が決める想定だったのかを記録します。人を評価する場にせず、手順や体制を改善する材料として扱います。</p>
      <h3>改善する人と、確認する日を決める。</h3><p>「連絡網を修正する」「代行者を決める」などの行動に分けて、担当と期限を設定。次回の研修・訓練で、変更が機能したかを確かめます。</p>
      <p class="article-cta">関連する支援：<a href="#service-tabletop" data-dialog-target="service-tabletop">机上訓練</a> ／ <a href="#service-advisory" data-dialog-target="service-advisory">月額・年間顧問</a></p>`
  },
  stock: {
    category: "SONAE JOURNAL / PREPAREDNESS",
    title: "備蓄は、買ったあとの使い方まで。",
    body: `<p>備蓄品は、必要なときに取り出して使える状態にしておくことが大切です。品目や数量の検討とあわせて、保管・担当・点検を整えましょう。</p>
      <h3>誰が使うかを確認する。</h3><p>職員だけでなく、利用者や来訪者など、施設にいる人を想定します。個別の配慮が必要な場合は、日頃の支援方針や専門職の確認も踏まえて検討します。</p>
      <h3>取り出せる場所に置く。</h3><p>保管場所が分散していないか、鍵を管理する人が不在でも取り出せるかを確認。水害リスクや転倒・落下の可能性など、置き場所の条件も見直します。</p>
      <h3>点検を日常の仕事に組み込む。</h3><p>期限、数量、動作状況を確認する担当と日を決めます。使った分の補充や入れ替えも含めて、管理表を更新します。</p>
      <h3>訓練で一度、使ってみる。</h3><p>開封方法や設置方法を知っているか、説明書にたどり着けるか。安全に試せる範囲で実物を確認すると、準備の課題が見つかります。</p>
      <p class="article-cta">関連する支援：<a href="#service-drill" data-dialog-target="service-drill">実践訓練</a> ／ <a href="#service-bcp" data-dialog-target="service-bcp">BCP・マニュアル策定／改善</a></p>`
  }
};
const dialog = document.getElementById("content-dialog");
let returnFocus;
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
function closeDialog() { dialog.close(); }
dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
});
document.querySelectorAll(".dialog-close,.dialog-bottom-close").forEach(button => button.addEventListener("click", closeDialog));
dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
  }
  const targetLink = event.target.closest("[data-dialog-target]");
  if (targetLink) {
    event.preventDefault();
    const target = document.getElementById(targetLink.dataset.dialogTarget);
    closeDialog();
    target.open = true;
    target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",block:"start"});
    target.querySelector("summary").focus({preventScroll:true});
    returnFocus = target.querySelector("summary");
  }
});
document.querySelectorAll("[data-article]").forEach(button => button.addEventListener("click", () => {
  const article = articles[button.dataset.article];
  openDialog(article.category, article.title, article.body);
}));
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
document.querySelectorAll("[data-info]").forEach(button => button.addEventListener("click", () => {
  if (button.dataset.info === "operator") {
    const operator = settings.operatorName
      ? `<p>運営者：${escapeHtml(settings.operatorName)}</p>${settings.representative ? `<p>代表者：${escapeHtml(settings.representative)}</p>` : ""}${settings.operatorAddress ? `<p>所在地：${escapeHtml(settings.operatorAddress)}</p>` : ""}`
      : "<p>ソナエデザインは、防災・BCP・危機対応支援のブランドです。運営者名、代表者、所在地の掲載情報は現在準備中です。</p>";
    openDialog("INFORMATION", "運営情報", `${operator}<p>事業内容：BCP・マニュアル策定／改善、職員研修、机上訓練、実践訓練、講師・研修登壇、月額・年間顧問、ACTION OSの紹介。</p><p>お問い合わせ：${settings.contactEmail ? escapeHtml(settings.contactEmail) : "受付窓口を準備中です。"}</p>`);
  } else {
    openDialog("PRIVACY", "このサイトでの情報の取り扱い", "<p>このサイト独自のアクセス解析や広告トラッカーは設置していません。</p><h3>相談前のメモについて</h3><p>入力内容は、表示中のページでメモを作成するために使用します。ソナエデザインのサーバーへ送信したり、ブラウザーの保存領域に記録したりすることはありません。「保存する」を押すと、お使いの端末にテキストファイルをダウンロードします。</p><h3>外部サイトについて</h3><p>ACTION OSや公的機関へのリンクは外部サイトに移動します。移動先での取り扱いは、それぞれのサイトをご確認ください。ホスティングサービスでは、サービス提供に伴うアクセス情報等が処理される場合があります。</p><h3>お問い合わせ受付の開始について</h3><p>問い合わせフォーム等による個人情報の取得を開始する際は、運営者・利用目的・問い合わせ窓口などの情報を整備し、この案内を更新します。</p>");
  }
}));

document.getElementById("consultation-form").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const text = `ソナエデザイン｜相談前のメモ\n\n関心のある支援：${data.get("interest")}\n組織・施設の種類：${data.get("organization") || "未選択"}\n\n気になっていること：\n${data.get("memo")?.trim() || "未記入"}\n\n相談前に確認しておくとよい項目：\n・実施したい時期\n・対象者、参加人数\n・既存のBCPやマニュアルの有無\n・今回の支援で実現したいこと\n\nこのメモは端末に保存したものです。問い合わせは送信されていません。\n`;
  const blob = new Blob(["\uFEFF",text], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ソナエデザイン_相談メモ.txt";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById("form-status").textContent = "メモのダウンロードを開始しました。問い合わせは送信されていません。";
});

// Publish contact details only after they have been confirmed.
if (typeof settings.contactEmail === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.contactEmail)) {
  document.getElementById("contact-state-label").textContent = "メールでご相談を受け付けています";
  document.getElementById("contact-state-detail").textContent = settings.contactEmail;
  const emailLink = document.getElementById("email-link");
  emailLink.hidden = false;
  emailLink.href = `mailto:${settings.contactEmail}?subject=${encodeURIComponent("ソナエデザインへのお問い合わせ")}`;
}
[
  [settings.goodsRankingUrl, document.querySelectorAll(".media-item")[0]],
  [settings.blogUrl, document.querySelectorAll(".media-item")[1]]
].forEach(([url, element]) => {
  if (typeof url !== "string" || !url.startsWith("https://")) return;
  const link = document.createElement("a");
  link.className = element.className;
  link.textContent = element.firstChild.textContent.trim();
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  const arrow = document.createElement("span");
  arrow.textContent = "↗";
  link.append(arrow);
  element.replaceWith(link);
});
