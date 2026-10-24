const arrow = '<span aria-hidden="true">→</span>';
const brand = '<img src="./assets/mark.svg" width="32" height="32" alt=""><strong>ソナエデザイン</strong>';

function header(home) {
  const prefix = home ? "" : "./index.html";
  return `<a class="skip-link" href="#main">本文へ移動</a>
<header class="header"><div class="header-inner wrap">
  <a class="brand" href="./index.html" aria-label="ソナエデザイン ホーム">${brand}</a>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation"><span>メニュー</span><span class="menu-lines" aria-hidden="true"></span></button>
  <nav id="navigation" aria-label="メインナビゲーション"><a href="${prefix}#services">支援内容</a><a href="${prefix}#process">料金・依頼の流れ</a><a href="${prefix}#sectors">対象の施設・業種</a><a href="./action-os.html">行動確認・記録ツール</a><a class="nav-contact" href="#contact">相談窓口の状況</a></nav>
</div></header>`;
}

export function contact(subject = "防災研修・訓練・対応計画づくり") {
  return `<section class="contact-section" id="contact" aria-labelledby="contact-title"><div class="wrap contact-grid">
  <div><h2 id="contact-title">ご相談窓口</h2><p>相談に向けて、施設・店舗の種類や人数、困っていること、希望時期を整理しておくと、支援内容の検討が進めやすくなります。</p><p>既存の計画や訓練の記録があれば、その有無もお知らせください。</p></div>
  <div class="contact-box"><span class="status-badge" id="contact-state-label">お問い合わせ受付は準備中です</span><h3 id="contact-box-title">窓口の開設までお待ちください。</h3><p id="contact-state-detail">メールアドレス・受付方法は、準備が整い次第こちらに掲載します。現在、このサイトから相談を送信することはできません。</p><a id="email-link" class="button button-dark" data-subject="${subject}" hidden>メールで相談する ${arrow}</a></div>
</div></section>`;
}

function footer() {
  return `<footer class="footer wrap"><div class="footer-main"><div><a class="brand" href="./index.html">${brand}</a><p>防災研修・訓練・対応計画づくりを支援。</p></div><div class="footer-links"><a href="./index.html#service-details">3つのサービス・成果物</a><a href="./index.html#process">料金・対応範囲・依頼の流れ</a><a href="./action-os.html">行動確認・記録ツール ACTION OS</a><a href="./resources.html">防災の読みもの・公的支援</a><button type="button" data-info="operator">運営情報</button><button type="button" data-info="privacy">プライバシーについて</button></div></div><div class="footer-bottom"><span>© 2026 ソナエデザイン</span><a class="back-top" href="#top">ページの先頭へ <span aria-hidden="true">↑</span></a></div></footer>
<dialog id="content-dialog" aria-labelledby="dialog-title"><div class="dialog-top"><span class="eyebrow" id="dialog-category"></span><button class="dialog-close" type="button" aria-label="閉じる">×</button></div><h2 id="dialog-title"></h2><div id="dialog-body"></div><button class="button button-dark dialog-bottom-close" type="button">閉じる</button></dialog>`;
}

export function page({ title, description, filename, content, base, assetVersion }) {
  const home = filename === "index.html";
  const canonical = home ? base : base + filename;
  return `<!doctype html>
<html lang="ja"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#17354A">
  <title>${title}｜ソナエデザイン</title><meta name="description" content="${description}">
  <meta property="og:title" content="${title}｜ソナエデザイン"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:locale" content="ja_JP"><meta property="og:image" content="${base}assets/readiness-workshop.png"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${canonical}"><link rel="icon" href="./assets/mark.svg" type="image/svg+xml">
  <link rel="stylesheet" href="./style.css?v=${assetVersion}">${home ? `<link rel="stylesheet" href="./premium.css?v=${assetVersion}">` : ""}
  <script src="./settings.js?v=${assetVersion}" defer></script><script src="./app.js?v=${assetVersion}" defer></script>
</head><body id="top" class="${home ? "home-page" : "inner-page"}">
${header(home)}<main id="main">${content}</main>${footer()}
</body></html>`;
}

const smallBusiness = `<section class="section wrap small-business" id="small-business" aria-labelledby="small-business-title"><h2 id="small-business-title">小規模な店舗の相談例</h2><p class="section-lead">専任の防災担当者がいない店舗も、今ある人員や資料から、必要な備えを整理できます。</p><div class="scenario-card"><span class="scenario-label">支援内容を説明するための想定例</span><p>菓子店など、少人数で営業している店舗。災害時に誰が何を担当し、営業を続けるかどうかを判断するために何を確認するか、整理したい。</p><ul><li>来店客・従業員への案内や連絡の役割</li><li>休業・営業再開に向けて確認する項目</li><li>優先する業務と、責任者に代わって判断する人</li></ul></div><p>支援する範囲と費用は個別に確認します。訪問地域・オンライン対応も、所在地と希望する内容を伺って対応可否をご案内します。</p><a class="text-link" href="./index.html#process">料金・対応範囲・依頼の流れ ${arrow}</a></section>`;

export function sectorPage(s, sectors) {
  const description = s.description.replace("BCP", "災害時も事業を続けるための計画（BCP）");
  return `<div class="wrap breadcrumb"><a href="./index.html">ホーム</a><span aria-hidden="true">/</span><a href="./index.html#sectors">対象の施設・業種</a><span aria-hidden="true">/</span><span>${s.name}</span></div>
<section class="sector-hero"><div class="wrap sector-hero-grid"><div><p class="eyebrow">${s.label}</p><h1>${s.name}の<br>防災研修・対応計画づくり</h1><p class="sector-lead">${description}</p><a class="button button-dark" href="#sector-support">${s.short}で相談できる支援内容 <span aria-hidden="true">↓</span></a></div><figure class="sector-photo"><img src="./assets/blue-${s.slug}.webp" width="1536" height="1024" alt="${s.name}の空間のイメージ" loading="lazy"><figcaption>施設のイメージ画像（AI生成）</figcaption></figure></div></section>
<section class="section wrap concern-section"><h2>こんな課題はありませんか</h2><ul class="concern-list">${s.concerns.map(x=>`<li>${x}</li>`).join("")}</ul></section>
<section class="sector-support section" id="sector-support"><div class="wrap"><h2>${s.short}の現場に合わせた支援</h2><p class="section-lead">以下は支援内容の例です。実施内容と成果物の範囲は事前に相談して決めます。</p><div class="topic-grid">${s.topics.map(t=>`<article><h3>${t[0]}</h3><p>${t[1]}</p></article>`).join("")}</div><a class="text-link" href="./index.html#service-details">3つのサービス・成果物の例 ${arrow}</a></div></section>
${s.slug === "business" ? smallBusiness : ""}
<section class="section wrap scenario-section"><div><h2>訓練で確かめる場面の例</h2><p>災害の場面を想定し、誰がどう動くかを話し合って確かめる「机上訓練」などで、判断と連携を確認します。</p><p class="muted">支援内容を説明するための想定例です。実際の施設条件に合わせて組み立てます。</p></div><div class="scenario-card"><span class="scenario-label">想定シナリオ</span><p class="scenario-text">${s.scenario}</p><div class="scenario-result"><strong>振り返りの視点</strong><p>${s.takeaway}</p></div></div></section>
<section class="sector-inquiry wrap"><h2>相談前に整理しておきたいこと</h2><div><p>${s.ask}</p><p>支援内容・実施方法・費用は個別にご提案します。<a href="./index.html#process">料金・対応範囲・依頼の流れ</a>をご覧ください。</p></div></section>
<div class="wrap sector-switch"><span>ほかの施設・業種の支援内容</span>${sectors.filter(x=>x.slug!==s.slug).map(x=>`<a href="./${x.slug}.html">${x.name} ${arrow}</a>`).join("")}</div>
${contact(s.name + "向けの支援")}`;
}
