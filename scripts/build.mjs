import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const assetHash = createHash("sha256");
for (const file of ["style.css", "app.js", "settings.js"]) assetHash.update(await readFile(root + file));
const assetVersion = assetHash.digest("hex").slice(0,12);
const base = "https://taka565.github.io/sonae-design/";
const arrow = '<span aria-hidden="true">↗</span>';
const icons = {
  education: '<path d="m3 10 9-6 9 6-9 6-9-6Z"/><path d="M6 12v6c4 3 8 3 12 0v-6M21 10v7"/>',
  sports: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18"/>',
  care: '<path d="M12 20 4 12C-2 5 7 0 12 7c5-7 14-2 8 5l-8 8Z"/><path d="M8 12h8M12 8v8"/>',
  hospitality: '<path d="M5 21V4h14v17M3 21h18M9 21v-5h6v5M9 8h1m4 0h1M9 12h1m4 0h1"/>',
  business: '<path d="M4 21V9h7V3h9v18M2 21h20M7 13v1m0 3v1m8-11h1m-1 4h1m-1 4h1m-4 6v-4"/>',
  plan: '<path d="M6 3h9l4 4v14H6V3Z"/><path d="M14 3v5h5M9 12h7M9 16h5"/>',
  training: '<circle cx="8" cy="7" r="3"/><path d="M2 20v-4a6 6 0 0 1 12 0v4M15 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 5 5v1"/>',
  advisory: '<path d="M20 7a9 9 0 0 0-15-2L2 8m0-5v5h5M4 17a9 9 0 0 0 15 2l3-3m0 5v-5h-5"/>'
};
const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const sectors = [
  {
    slug: "education", number: "01", name: "保育・教育・こども施設", short: "保育・教育", audience: "保育園・幼稚園・学校・小児関連施設", label: "子どもの安全を預かる皆さまへ",
    title: "子どもを守る備えを、<br>職員みんなの行動に。",
    description: "企業が運営する保育園、幼稚園、私立・公立の小中高校、小児関連施設の皆さまへ。子どもの年齢や施設の環境、職員の体制に合わせて、マニュアルと研修・訓練を整えます。",
    problem: "避難・引き渡しや、職員の役割分担を確かめたい。",
    concerns: ["いつもの避難訓練だけで、想定外にも対応できるか不安。", "担任や責任者が不在のとき、誰が何を判断するか曖昧。", "保護者への連絡や引き渡しまで含めて、手順を確認したい。"],
    topics: [["マニュアルの整理", "年齢・人数・施設条件を踏まえ、避難、人数確認、保護者連絡などの役割と手順を整理します。"], ["職員・教職員の研修と訓練", "地震・火災などを想定し、情報共有や判断を机上訓練で確認。現地で動きを確かめる実践訓練も相談できます。"], ["教育・保育の継続", "休止・再開に向けた優先事項、関係者への連絡、必要な人員などを整理します。"]],
    scenario: "活動場所が分かれている時間帯に地震が発生。責任者とすぐに連絡がつかない場合、各担当はどの情報を集め、誰に共有するか。",
    takeaway: "職員の役割、連絡・判断の順番、見直す手順を整理する。",
    ask: "施設の種類、子どもの年齢・人数、職員体制、相談したい場面をお知らせください。公立学校や複数園・校での研修は、設置者・教育委員会・運営本部からもご相談いただけます。"
  },
  {
    slug: "sports", number: "02", name: "スポーツ施設・団体", short: "スポーツ", audience: "クラブ・体操教室・施設・スポーツ団体", label: "スポーツの現場を支える皆さまへ",
    title: "もしもの初動を、<br>チームの共通認識に。",
    description: "スポーツクラブ、スポーツ施設、体操教室、各種スポーツ団体の皆さまへ。活動中の事故や災害を想定し、指導者・スタッフが連携して動くための手順と訓練を整えます。",
    problem: "活動中の事故・災害への初動と、スタッフの連携を整えたい。",
    concerns: ["指導者によって緊急時の判断や動き方に差がある。", "活動中の事故対応と、ほかの参加者の安全確保を両立したい。", "施設・会場が変わっても、連絡や役割を共有できるようにしたい。"],
    topics: [["緊急時の役割分担", "通報、周囲の安全確保、施設管理者との連絡、参加者への案内など、現場の役割と情報の流れを整理します。"], ["指導者・スタッフ研修", "自分の役割と施設の手順を共有し、想定場面で何を確認・判断するかを考える研修を設計します。"], ["会場を想定した訓練", "地震や活動中の事故などの場面を設定し、関係者の連携と手順を確かめ、改善事項をまとめます。"]],
    scenario: "教室の活動中に参加者の体調不良が発生。対応するスタッフと、ほかの参加者を見守るスタッフは、どのように役割を分担するか。",
    takeaway: "対応する人、活動を管理する人、連絡する人の役割を明確にする。",
    ask: "競技・活動内容、参加者の年齢・人数、指導者やスタッフの体制、使用施設をお知らせください。団体・複数拠点での研修も内容を相談できます。"
  },
  {
    slug: "care", number: "03", name: "介護・福祉施設", short: "介護・福祉", audience: "高齢者施設・介護事業所・福祉施設", label: "利用者の暮らしを支える皆さまへ",
    title: "少人数のときも、<br>使えるBCPと訓練を。",
    description: "高齢者関連施設、介護事業所、福祉施設の皆さまへ。利用者への支援と業務の継続を考え、実際の人員体制に合ったBCPの見直し、職員研修、訓練を支援します。",
    problem: "夜間・少人数でも動けるBCPと、実践的な訓練にしたい。",
    concerns: ["BCPは作成したが、夜間の人数で実行できるか確認できていない。", "利用者の状態に応じた避難や、支援の優先順位に迷う。", "研修・訓練を実施した後、計画の改善までつながっていない。"],
    topics: [["現場に合わせたBCPの見直し", "利用者の状況、人員、設備、既存資料を確認し、初動と優先業務、連絡体制を整理します。"], ["少人数を想定した訓練", "夜間や責任者不在の場面を設定し、役割の重なりや判断が止まる箇所を確かめます。"], ["年間の研修・改善支援", "職員への周知、机上・実践訓練、実施後の見直しを年間の取り組みとして組み立てます。"]],
    scenario: "夜間の少人数体制で停電が発生。利用者の状況確認、施設内の情報収集、応援の連絡を、誰がどの順番で進めるか。",
    takeaway: "限られた人員での優先事項と役割、応援が必要になる条件を整理する。",
    ask: "サービスの種類、利用者数、日中・夜間の職員体制、既存BCPや直近の訓練についてお知らせください。新規策定・既存計画の見直しのどちらも相談できます。"
  },
  {
    slug: "hospitality", number: "04", name: "ホテル・宿泊施設", short: "宿泊施設", audience: "ホテル・旅館・その他の宿泊施設", label: "お客様の滞在を支える皆さまへ",
    title: "不慣れな場所でも、<br>お客様を支えられる備えを。",
    description: "ホテル、旅館などの宿泊施設の皆さまへ。館内に不慣れなお客様への案内、夜間のスタッフ体制、営業の継続・再開を踏まえて、危機対応とBCPを整えます。",
    problem: "宿泊客への案内と、夜間の初動対応を確認したい。",
    concerns: ["夜間のスタッフだけで、お客様への案内や情報収集ができるか不安。", "フロント・客室・設備担当の連絡と役割を揃えたい。", "災害後に何を確認して営業再開を判断するか、整理したい。"],
    topics: [["館内の初動・案内手順", "宿泊客の把握、案内、情報共有の手順を確認。言語や移動への配慮が必要な場面も整理します。"], ["部門をつなぐ研修・訓練", "昼夜の人員体制や部門間の連絡を踏まえ、初動と判断を机上・実践訓練で確かめます。"], ["営業継続・再開の整理", "優先する業務、必要な設備・人員、関係先への連絡など、BCPに必要な情報を整理します。"]],
    scenario: "夜間に地震が発生し、館内の状況がまだ揃っていない。フロントと各担当は何を確認し、お客様への案内内容をどう共有するか。",
    takeaway: "確認すべき情報、部門間の連絡、案内を判断する役割を整理する。",
    ask: "施設の規模、客室数、夜間のスタッフ体制、既存マニュアルと訓練の状況をお知らせください。単独の研修・訓練から相談できます。"
  },
  {
    slug: "business", number: "05", name: "一般企業", short: "一般企業", audience: "総務・防災・BCP担当者、経営者", label: "企業の備えを担当する皆さまへ",
    title: "従業員を守り、<br>事業をつなぐ備えを。",
    description: "総務・防災・BCP担当者、経営者の皆さまへ。従業員の安全確保と事業継続の両面から、初動、重要業務、役割分担を整理し、研修・訓練で実行できるかを確認します。",
    problem: "従業員の安全確保と、重要業務の継続を両立したい。",
    concerns: ["BCPを作る必要は感じているが、どこから着手すればよいか迷う。", "安否確認の後、誰が何を判断するか決まっていない。", "担当者だけが内容を把握しており、組織全体へ共有できていない。"],
    topics: [["初動と重要業務の整理", "従業員の安全確保、情報収集、優先業務、必要な人員や資源など、現状を確認して計画を整えます。"], ["担当者・従業員向け研修", "BCPの目的や自分の役割を共有し、担当部署だけに依存しない体制づくりを支援します。"], ["意思決定を確かめる訓練", "責任者不在や複数拠点での被災を想定し、情報共有、役割分担、継続・再開に向けた判断を検証します。"]],
    scenario: "地震で一部の社員が出勤できず、通常どおりの業務が難しい。どの業務を優先し、どの情報を集めて体制を決めるか。",
    takeaway: "優先業務、判断に必要な情報、決定する人と代行者を整理する。",
    ask: "業種、従業員数、拠点数、BCPの有無と困っていることをお知らせください。初動・人員・重要業務など、今回支援する範囲を事前に相談して決めます。"
  }
];

const brand = `<img src="./assets/mark.svg" width="38" height="38" alt=""><span><strong>ソナエデザイン</strong><small>SONAE DESIGN</small></span>`;
function header(home = false) {
  const prefix = home ? "" : "./index.html";
  return `<a class="skip-link" href="#main">本文へ移動</a><header class="header"><div class="header-inner"><a class="brand" href="./index.html" aria-label="ソナエデザイン ホーム">${brand}</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation"><span>メニュー</span><span class="menu-lines" aria-hidden="true"></span></button><nav id="navigation" aria-label="メインナビゲーション"><a href="${prefix}#sectors">施設・業種から探す</a><a href="${prefix}#services">支援内容</a><a href="${prefix}#process">ご依頼の流れ</a><a href="./action-os.html">ACTION OS</a><a class="nav-contact" href="#contact">ご相談について ${arrow}</a></nav></div></header>`;
}
function contact(subject = "防災・BCP支援") {
  return `<section class="contact-section" id="contact" aria-labelledby="contact-title"><div class="wrap contact-grid"><div><p class="eyebrow light">ご相談について</p><h2 id="contact-title">「何から始めるか」から、<br>一緒に考えます。</h2><p>BCPの見直し、ひとつの研修、年間の備えまで。<br>現場の状況と、いま気になっていることをお聞かせください。</p></div><div class="contact-box"><span class="status-badge" id="contact-state-label">お問い合わせ受付は準備中です</span><h3 id="contact-box-title">窓口の開設まで、<br>もう少しお待ちください。</h3><p id="contact-state-detail">メールアドレス・受付方法は、準備が整い次第こちらに掲載します。現在、このサイトから相談を送信することはできません。</p><a id="email-link" class="button button-orange" data-subject="${subject}" hidden>メールで相談する ${arrow}</a><p class="contact-check">相談時にあると役立つ情報<br><span>施設・業種 ／ 困っていること ／ 希望時期・人数</span></p></div></div></section>`;
}
function footer() {
  return `<footer class="footer wrap"><div class="footer-main"><div><a class="brand" href="./index.html">${brand}</a><p>人を守る備えを、現場で使える形に。</p></div><div class="footer-links"><a href="./index.html#services">支援内容</a><a href="./action-os.html">ACTION OS</a><a href="./resources.html">防災の読みもの・公的支援</a><button type="button" data-info="operator">運営情報</button><button type="button" data-info="privacy">プライバシーについて</button></div><a class="back-top" href="#top" aria-label="ページの先頭へ">↑</a></div><div class="footer-bottom"><span>© 2026 SONAE DESIGN</span><span>備えを、動ける力に。</span></div></footer><dialog id="content-dialog" aria-labelledby="dialog-title"><div class="dialog-top"><span class="eyebrow" id="dialog-category"></span><button class="dialog-close" type="button" aria-label="閉じる">×</button></div><h2 id="dialog-title"></h2><div id="dialog-body"></div><button class="button button-dark dialog-bottom-close" type="button">閉じる</button></dialog>`;
}
function page(title, description, filename, content, home = false) {
  const canonical = filename === "index.html" ? base : base + filename;
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#183e36"><title>${title}｜ソナエデザイン</title><meta name="description" content="${description}"><meta property="og:title" content="${title}｜ソナエデザイン"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:locale" content="ja_JP"><meta property="og:image" content="${base}assets/readiness-workshop.png"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="${canonical}"><link rel="icon" href="./assets/mark.svg" type="image/svg+xml"><link rel="stylesheet" href="./style.css"><script src="./settings.js" defer></script><script src="./app.js" defer></script></head><body id="top">${header(home)}<main id="main">${content}</main>${footer()}</body></html>`;
}
const sectorCards = sectors.map(s => `<a class="sector-card" href="./${s.slug}.html"><div class="sector-card-top">${icon(s.slug)}<span>${s.number}</span></div><h3>${s.name}</h3><p>${s.audience}</p><div class="sector-card-bottom"><span>この分野の支援を見る</span>${arrow}</div></a>`).join("");
const process = `<section class="section wrap" id="process"><div class="section-heading"><div><p class="eyebrow">ご依頼の流れ</p><h2>課題がまとまっていなくても、<br>大丈夫です。</h2></div><p>まずは現状を整理。<br>支援の内容と費用に合意してから進めます。</p></div><ol class="process-list"><li><span>01</span><h3>現状をお聞きします</h3><p>施設の種類や体制、既存の計画、困っている場面を確認します。</p></li><li><span>02</span><h3>内容・費用をご提案</h3><p>目的、実施方法、日程、成果物、費用を事前にすり合わせます。</p></li><li><span>03</span><h3>実施して、改善へ</h3><p>計画づくりや研修・訓練を実施。課題と、次に見直すことを整理します。</p></li></ol><div class="price-note"><strong>料金・対応地域について</strong><p>支援内容、準備・実施時間、参加人数、訪問の有無などに応じた個別見積もりです。実施地域やオンライン対応も、内容に合わせてご相談いただけます。</p></div></section>`;

const home = `<section class="hero"><div class="wrap hero-grid"><div class="hero-copy"><p class="eyebrow"><span class="orange-dot"></span> 命を預かる現場と、企業の備えに。</p><h1>施設と企業の、<br>防災研修・訓練・<br><span>BCP支援。</span></h1><p class="hero-lead">計画をつくる。職員が学ぶ。訓練で確かめる。<br>あなたの現場に必要な備えを、一緒に整えます。</p><div class="hero-actions"><a class="button button-dark" href="#services">支援内容を見る ${arrow}</a><a class="text-link" href="#sectors">自分の施設・業種から探す <span aria-hidden="true">↓</span></a></div><p class="hero-audience">保育・教育 ／ スポーツ ／ 介護・福祉 ／ 宿泊 ／ 一般企業</p></div><figure class="hero-visual"><div class="hero-photo"><img src="./assets/readiness-workshop.png" width="1536" height="1024" alt="施設の図面を囲み、役割や手順を話し合う机上訓練のイメージ" fetchpriority="high"><span class="photo-label">研修・訓練のイメージ</span></div><figcaption><span class="visual-caption">備えを、動ける力に。</span><div><span>計画・マニュアル</span><i>→</i><span>研修・訓練</span><i>→</i><span>改善・継続</span></div></figcaption></figure></div></section>
<section class="sectors-section" id="sectors"><div class="wrap"><div class="section-heading compact"><div><p class="eyebrow">施設・業種から探す</p><h2>あなたの現場に合う支援を。</h2></div><p>それぞれの現場で、相談できることをご紹介します。</p></div><div class="sector-grid">${sectorCards}</div></div></section>
<section class="section wrap" id="services"><div class="section-heading"><div><p class="eyebrow">ソナエデザインにできること</p><h2>必要なところから頼める、<br>3つの支援。</h2></div><p>BCPは、非常時に大切な業務を続けるための計画です。<br>新しくつくることも、今ある備えの見直しも相談できます。</p></div><div class="services-list">
<article class="service-row" id="service-bcp"><div class="service-title"><span class="service-number">01</span>${icon("plan")}<h3>BCP・マニュアルを<br>つくる・見直す</h3><p>計画はある。でも、今の現場に合っている？</p></div><div class="service-description"><p>既存資料と現場の体制を確認し、初動、優先業務、役割分担、連絡の手順を整理。担当者が変わっても共有できる計画を目指します。</p><ul class="tags"><li>BCP新規策定</li><li>既存計画の改善</li><li>危機対応マニュアル</li></ul><details><summary>支援内容・成果物の例 <span aria-hidden="true">＋</span></summary><div class="details-body"><p>現状のヒアリング、課題の整理、BCP・対応マニュアルの策定や改訂を支援します。</p><p><strong>成果物の例：</strong>見直し事項の一覧、役割分担表、初動チェックリスト。作成する資料と支援範囲は、事前に相談して決めます。</p></div></details></div></article>
<article class="service-row" id="service-training"><div class="service-title"><span class="service-number">02</span>${icon("training")}<h3>職員が学び、<br>訓練で確かめる</h3><p>毎年の訓練を、実際の行動につなげたい。</p></div><div class="service-description"><p>対象者や人員体制に合わせて研修と訓練を設計。「誰が、何を、どの順番で行うか」を確かめ、次の改善につなげます。</p><ul class="tags"><li>職員・教職員研修</li><li>机上訓練</li><li>実践訓練</li><li>講師・研修登壇</li></ul><details><summary>研修・訓練の違いと支援内容 <span aria-hidden="true">＋</span></summary><div class="details-body"><dl class="definition-list"><div><dt>職員研修・講師登壇</dt><dd>防災・危機対応の基礎や、組織の計画と自分の役割を学びます。団体の勉強会や講演も相談できます。</dd></div><div id="service-tabletop"><dt>机上訓練</dt><dd>災害や危機の場面を示し、参加者が判断や連絡・役割分担を話し合って確認します。</dd></div><div id="service-drill"><dt>実践訓練</dt><dd>実際の場所で動き、連絡・避難・役割分担などの手順を確認します。施設条件と安全管理を踏まえて設計します。</dd></div></dl><p><strong>成果物の例：</strong>研修資料、訓練シナリオ、振り返りと改善事項の一覧。内容は実施前に相談して決めます。</p></div></details></div></article>
<article class="service-row" id="service-advisory"><div class="service-title"><span class="service-number">03</span>${icon("advisory")}<h3>年間を通じて、<br>備えを更新する</h3><p>担当者だけで抱えず、継続して整えたい。</p></div><div class="service-description"><p>計画の点検から、年間の研修・訓練、実施後の改善相談まで。組織の変化に合わせて備えを更新する、月額・年間の顧問支援です。</p><ul class="tags"><li>月額・年間顧問</li><li>定期的な計画点検</li><li>年間研修・訓練計画</li></ul><details><summary>継続支援の内容と契約範囲 <span aria-hidden="true">＋</span></summary><div class="details-body"><p>定期相談、BCP・マニュアルの点検、研修・訓練計画、体制変更への対応など、必要な支援を組み合わせます。</p><p>相談の頻度、訪問回数、研修の実施、連絡方法などは契約前に決定します。緊急時の対応を含めるかどうかも、事前に範囲を確認します。</p></div></details></div></article></div><div class="services-end"><p>ひとつの研修、既存BCPの見直しからでも。</p><a class="text-link" href="#contact">ご相談・受付状況について ${arrow}</a></div></section>
<section class="approach-band"><div class="wrap approach-grid"><div><p class="eyebrow light">支援で大切にすること</p><h2>計画を、<br>現場の人数と動きに合わせる。</h2></div><div class="approach-items"><div><span>01</span><h3>実際の体制から考える</h3><p>夜間・少人数・責任者不在。普段と違う状況まで含めて整理します。</p></div><div><span>02</span><h3>迷う場面を確かめる</h3><p>判断が止まった理由や、足りない情報を訓練で見つけます。</p></div><div><span>03</span><h3>次に変えることを残す</h3><p>訓練の振り返りを、役割や手順の見直しにつなげます。</p></div></div></div></section>
${process}
<section class="tool-section wrap"><div class="tool-image"><img src="./assets/action-os-screen.png" width="1440" height="900" alt="ACTION OSのホーム画面" loading="lazy"></div><div class="tool-copy"><p class="eyebrow">現場の備えを支えるツール</p><h2>ACTION OS<span class="orange">.</span></h2><h3>行動の確認と記録を、ひとつの画面に。</h3><p>事象に応じた手順の確認、担当・時刻・メモの記録、対応後の振り返りを支えるWebアプリです。</p><a class="text-link" href="./action-os.html">機能・利用範囲を見る ${arrow}</a></div></section>
<section class="section wrap faq-section"><div><p class="eyebrow">相談前に知っておきたいこと</p><h2>よくあるご質問</h2></div><div class="faq-list"><details><summary>まだ何を依頼するか決まっていなくても大丈夫ですか？<span>＋</span></summary><p>現状と困っていることを整理するところから相談できます。既存の計画があるか、どんな場面に不安があるかをお聞かせください。</p></details><details><summary>研修や講師の依頼だけでも相談できますか？<span>＋</span></summary><p>職員研修、机上・実践訓練、講師登壇を単独でも相談できます。参加者、テーマ、時間、実施場所に合わせて内容を組み立てます。</p></details><details><summary>対象に載っていない施設も相談できますか？<span>＋</span></summary><p>施設の種類や現場の状況、希望する支援内容をお知らせください。支援できる範囲と実施方法を確認してご案内します。</p></details><details><summary>補助金や公的支援は使えますか？<span>＋</span></summary><p>地域・法人種別・対象経費・時期によって異なります。本サービスの費用が対象になるとは限りません。<a href="./resources.html#support">公的支援の確認先</a>を掲載しています。</p></details></div></section>
${contact()}`;

function sectorPage(s) {
  return `<div class="wrap breadcrumb"><a href="./index.html">ホーム</a><span>/</span><a href="./index.html#sectors">施設・業種から探す</a><span>/</span><span>${s.name}</span></div><section class="sector-hero"><div class="wrap sector-hero-grid"><div><p class="eyebrow">${s.label}</p><h1>${s.title}</h1><p class="sector-lead">${s.description}</p><a class="button button-dark" href="#sector-support">相談できる内容を見る <span aria-hidden="true">↓</span></a></div><div class="sector-sign">${icon(s.slug)}<span>SONAE DESIGN / ${s.number}</span><strong>${s.name}</strong><p>${s.audience}</p></div></div></section><section class="section wrap concern-section"><div><p class="eyebrow">こんな課題はありませんか</p><h2>現場の不安を、<br>具体的な備えに。</h2></div><ul class="concern-list">${s.concerns.map(x => `<li><span aria-hidden="true">↗</span>${x}</li>`).join("")}</ul></section><section class="sector-support" id="sector-support"><div class="wrap"><p class="eyebrow">相談できること</p><h2>${s.short}の現場に合わせた支援</h2><div class="topic-grid">${s.topics.map((t,i) => `<article><span class="topic-number">0${i+1}</span><h3>${t[0]}</h3><p>${t[1]}</p></article>`).join("")}</div><a class="text-link" href="./index.html#services">共通の支援メニュー・成果物の例を見る ${arrow}</a></div></section><section class="section wrap scenario-section"><div><p class="eyebrow">机上訓練で考える場面の例</p><h2>「そのとき、どう動く？」を<br>一緒に確かめる。</h2><p class="muted">以下は支援内容を伝えるための想定例です。<br>実際の施設条件に合わせて内容を組み立てます。</p></div><div class="scenario-card"><span class="scenario-label">想定シナリオ</span><p class="scenario-text">${s.scenario}</p><div class="scenario-result"><span>振り返りの視点</span><p>${s.takeaway}</p></div></div></section><section class="sector-inquiry wrap"><div><p class="eyebrow">相談する前に</p><h2>まずは現場の状況を、<br>お聞かせください。</h2></div><div><p>${s.ask}</p><p>支援内容・実施方法・費用は個別にご提案します。<a href="./index.html#process">ご依頼の流れ・料金について</a></p></div></section><div class="wrap sector-switch"><span>ほかの施設・業種を見る</span>${sectors.filter(x=>x.slug!==s.slug).map(x=>`<a href="./${x.slug}.html">${x.name} ${arrow}</a>`).join("")}</div>${contact(s.name + "向けの支援")}`;
}

const product = `<div class="wrap breadcrumb"><a href="./index.html">ホーム</a><span>/</span><span>ACTION OS</span></div><section class="product-hero"><div class="wrap product-grid"><div><p class="eyebrow light">現場の対応を支えるWebアプリ</p><h1>ACTION OS<span class="orange">.</span></h1><h2>次の行動と、その記録を。<br>ひとつの画面で。</h2><p>事象に応じた行動の確認から、担当・時刻・メモの記録まで。対応中の情報をひとつの事案にまとめ、振り返りにつなげます。</p><a class="button button-orange" href="https://taka565.github.io/action-os/" target="_blank" rel="noopener noreferrer">ACTION OSを開く ${arrow}</a><p class="product-note">別タブで開きます。お試しの際は、アプリの「訓練する」からご利用ください。</p></div><img src="./assets/action-os-screen.png" width="1440" height="900" alt="ACTION OSのホーム画面。対応する事象や訓練を選択できる。"></div></section><section class="section wrap"><p class="eyebrow">できること</p><h2>確認・行動・記録をつなぐ。</h2><div class="topic-grid"><article><span class="topic-number">01</span><h3>手順を確認する</h3><p>対応する事象を選び、初動の行動を確認します。施設固有のルールや役割分担と併せて活用します。</p></article><article><span class="topic-number">02</span><h3>対応を記録する</h3><p>担当、時刻、メモなどを事案ごとにまとめ、対応中の情報を整理します。</p></article><article><span class="topic-number">03</span><h3>訓練・振り返りに使う</h3><p>実対応と訓練を分けて利用できます。記録の書き出しや印刷を、振り返りにも活用できます。</p></article></div><div class="product-scope"><h2>ご利用前に、対応範囲をご確認ください。</h2><p>成人の救命対応、火災・地震・大雨／浸水の初動手順と記録機能を備えています。不審者・行方不明・停電などは記録機能のみです。<strong>小児・乳児の専用救命手順は未実装です。</strong></p><p>記録は利用端末のブラウザー内に保存され、クラウド同期はありません。施設固有の手順・避難経路・役割分担の確認、適切な研修や訓練と組み合わせてご利用ください。専門機関による監修・認証を取得したものではありません。</p></div></section><section class="tool-consult wrap"><p class="eyebrow">現場での活用を考える</p><h2>アプリと、施設の備えをつなぐ。</h2><p>手順を確認するだけでなく、現場の役割や連絡を研修・訓練で確かめることが大切です。ソナエデザインの支援内容も併せてご覧ください。</p><a class="text-link" href="./index.html#services">研修・訓練・BCP支援を見る ${arrow}</a></section>${contact("ACTION OSの活用")}`;

const articles = [
  ["review", "BCPの見直し", "そのBCP、いまの現場に合っていますか。", "人員や設備、業務の進め方が変わったら、計画にも見直しが必要です。次の5つから確認してみましょう。", [["連絡先と役割", "異動・退職した担当者の名前が残っていないか。責任者が不在のときの代行者も確認します。"], ["少人数の時間帯", "夜間・休日などの勤務体制で、役割が一人に重なりすぎないかを考えます。"], ["優先する業務", "すべてを通常どおり続けることが難しいとき、何を優先するかを整理します。"], ["必要な資料・道具", "停電や通信障害も想定し、紙の連絡先、保管場所、鍵の管理などを確認します。"], ["訓練後の更新", "気づきを残し、改訂する人と期限を決め、変更した内容を職員に伝えます。"]]],
  ["training", "研修・訓練", "机上訓練を、「話し合い」で終わらせない。", "机上訓練は判断や連携を確かめる機会です。「次に何を変えるか」が残るように設計してみましょう。", [["確かめたいことを決める", "責任者不在時の判断、夜間の役割分担、複数拠点の情報共有など、確認したい課題を絞ります。"], ["迷った理由を残す", "どの情報が足りなかったか、誰が決める想定だったかを記録します。手順や体制を改善する材料にします。"], ["担当と確認日を決める", "連絡網を修正する、代行者を決めるなどの行動に分けて、担当と期限を設定。次回、変更が機能したかを確かめます。"]]],
  ["stock", "備蓄", "備蓄は、買ったあとの使い方まで。", "必要なときに取り出して使えるように、品目・数量と併せて、保管・担当・点検を整えましょう。", [["誰が使うか", "職員だけでなく、利用者や来訪者も想定します。個別の配慮は、日頃の支援方針や専門職の確認も踏まえて検討します。"], ["取り出せるか", "鍵を管理する人が不在でも取り出せるか。水害や転倒・落下のリスクなど、保管場所の条件も確認します。"], ["管理と訓練", "期限・数量・動作状況を確認する担当と日を決めます。安全に試せる範囲で実物を使い、開封や設置の方法を確かめます。"]]]
];
const resources = `<div class="wrap breadcrumb"><a href="./index.html">ホーム</a><span>/</span><span>防災の読みもの・公的支援</span></div><section class="resource-hero wrap"><p class="eyebrow">防災の読みもの・公的支援</p><h1>備えを見直す、<br>小さなきっかけに。</h1><p>計画・訓練・備蓄のヒントと、確認しておきたい公的情報をまとめました。</p></section><section class="wrap articles-section" aria-label="防災の読みもの">${articles.map(a=>`<details class="article-detail" id="${a[0]}"><summary><span class="eyebrow">${a[1]}</span><h2>${a[2]}</h2><span class="article-read">読む <span aria-hidden="true">＋</span></span></summary><div class="article-content"><p>${a[3]}</p>${a[4].map(x=>`<h3>${x[0]}</h3><p>${x[1]}</p>`).join("")}<a class="text-link" href="./index.html#services">関連する支援を見る ${arrow}</a></div></details>`).join("")}</section><section class="section wrap" id="support"><p class="eyebrow">公的情報の確認先</p><h2>備えの必要性と、使える支援制度。</h2><div class="public-links"><article><span>計画と運用</span><h3>BCPを、日頃の備えにつなげる。</h3><p>計画の策定に加え、教育・訓練や見直しを続けるために。BCPの考え方や進め方は、中小企業庁の指針を参考にできます。</p><a href="https://www.chusho.meti.go.jp/bcp/contents/level_a/bcpgl_01.html" target="_blank" rel="noopener noreferrer">中小企業庁｜BCP策定運用指針 ${arrow}</a></article><article><span>補助金・助成金</span><h3>地域・法人種別・経費を確認する。</h3><p>一例として、東京都にはBCPの実践に必要な設備等を支援する制度があります。対象法人・経費・募集時期に条件があり、相談料や研修費が対象になるとは限りません。学校法人・社会福祉法人・医療法人などは対象外です。</p><a href="https://www.tokyo-kosha.or.jp/support/josei/setsubijosei/bcp.html" target="_blank" rel="noopener noreferrer">東京都中小企業振興公社｜BCP実践促進助成金 ${arrow}</a><p class="small-note">契約・発注前に、実施機関の最新の募集要項をご確認ください。助成の適用・採択を保証するものではありません。</p></article></div></section><section class="network-section wrap"><div><p class="eyebrow">関連メディア</p><h2>日常の備えにも、つながる。</h2></div><div class="media-links"><div class="media-item" data-media="goods">防災グッズランキング <span>準備中</span></div><div class="media-item" data-media="blog">防災ブログ <span>準備中</span></div></div></section>${contact()}`;

await mkdir(root, {recursive: true});
const pages = [
  ["index.html", "施設と企業の防災研修・訓練・BCP支援", "保育・教育、スポーツ、介護・福祉、宿泊施設、一般企業の防災・危機対応を支援。BCP・マニュアル策定から職員研修、机上・実践訓練、月額・年間顧問まで。", home],
  ...sectors.map(s=>[s.slug+".html", s.name+"の防災・危機対応・BCP支援", s.description, sectorPage(s)]),
  ["action-os.html", "ACTION OS｜行動の確認と記録を支えるWebアプリ", "事象に応じた行動確認と、担当・時刻・メモの記録をひとつの画面に。ACTION OSの機能、訓練での活用、利用範囲をご紹介します。", product],
  ["resources.html", "防災の読みもの・公的支援", "BCPの見直し、机上訓練、備蓄のヒント。公的支援や関連メディアの確認先をご案内します。", resources]
];
for (const [filename,title,description,content] of pages) {
  const markup = page(title,description,filename,content,filename==="index.html")
    .replace('href="./style.css"', `href="./style.css?v=${assetVersion}"`)
    .replace('src="./app.js"', `src="./app.js?v=${assetVersion}"`)
    .replace('src="./settings.js"', `src="./settings.js?v=${assetVersion}"`);
  await writeFile(root+filename, markup, "utf8");
}
await writeFile(root+"sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([f])=>`\n  <url><loc>${f === "index.html" ? base : base+f}</loc><lastmod>2026-10-22</lastmod></url>`).join("")}\n</urlset>\n`);
console.log(`Built ${pages.length} static pages.`);
