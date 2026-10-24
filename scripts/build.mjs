import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { homePage } from "./home.mjs";
import { contact, page, sectorPage } from "./layout.mjs";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const base = "https://taka565.github.io/sonae-design/";
const arrow = '<span aria-hidden="true">→</span>';
const assetHash = createHash("sha256");
for (const file of ["style.css", "premium.css", "app.js", "settings.js"]) {
  assetHash.update((await readFile(root + file, "utf8")).replace(/\r\n/g, "\n"));
}
const assetVersion = assetHash.digest("hex").slice(0, 12);

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
    slug: "hospitality", number: "04", name: "ホテル・宿泊施設", short: "ホテル・宿泊施設", audience: "ホテル・旅館・その他の宿泊施設", label: "お客様の滞在を支える皆さまへ",
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
    slug: "business", number: "05", name: "企業・店舗", short: "企業・店舗", audience: "総務・防災担当者、店舗の経営者", label: "企業・店舗の備えを担当する皆さまへ",
    title: "従業員を守り、<br>事業をつなぐ備えを。",
    description: "企業の総務・防災担当者、店舗の経営者の皆さまへ。専任の防災担当者がいない小規模な店舗も、現在の体制から相談できます。従業員の安全確保と事業継続の両面から、初動、重要業務、役割分担を整理し、研修・訓練で実行できるかを確認します。",
    problem: "従業員の安全確保と、重要業務の継続を両立したい。",
    concerns: ["BCPを作る必要は感じているが、どこから着手すればよいか迷う。", "安否確認の後、誰が何を判断するか決まっていない。", "担当者だけが内容を把握しており、組織全体へ共有できていない。"],
    topics: [["初動と重要業務の整理", "従業員の安全確保、情報収集、優先業務、必要な人員や資源など、現状を確認して計画を整えます。"], ["担当者・従業員向け研修", "BCPの目的や自分の役割を共有し、担当部署だけに依存しない体制づくりを支援します。"], ["意思決定を確かめる訓練", "責任者不在や複数拠点での被災を想定し、情報共有、役割分担、継続・再開に向けた判断を検証します。"]],
    scenario: "地震で一部の社員が出勤できず、通常どおりの業務が難しい。どの業務を優先し、どの情報を集めて体制を決めるか。",
    takeaway: "優先業務、判断に必要な情報、決定する人と代行者を整理する。",
    ask: "業種、従業員数、拠点数、BCPの有無と困っていることをお知らせください。小規模な店舗は、店の人数や営業時間、現在の備えからお聞きします。初動・人員・重要業務など、今回支援する範囲を事前に相談して決めます。"
  }
];


const product = `<div class="wrap breadcrumb"><a href="./index.html">ホーム</a><span>/</span><span>ACTION OS</span></div><section class="product-hero"><div class="wrap product-grid"><div><p class="eyebrow light">現場の対応を支えるWebアプリ</p><h1>災害時の手順を確認し、<br>対応を記録する道具</h1><p class="product-name">ACTION OS</p><p>事象に応じた行動の確認から、担当・時刻・メモの記録まで。対応中の情報をひとつの事案にまとめ、振り返りにつなげます。</p><a class="button button-orange" href="https://taka565.github.io/action-os/" target="_blank" rel="noopener noreferrer">ACTION OSを開く ${arrow}</a><p class="product-note">別タブで開きます。お試しの際は、アプリの「訓練する」からご利用ください。</p></div><img src="./assets/action-os-screen.png" width="1440" height="900" alt="ACTION OSのホーム画面。対応する事象や訓練を選択できる。"></div></section><section class="section wrap"><p class="eyebrow">できること</p><h2>確認・行動・記録をつなぐ。</h2><div class="topic-grid"><article><span class="topic-number">01</span><h3>手順を確認する</h3><p>対応する事象を選び、初動の行動を確認します。施設固有のルールや役割分担と併せて活用します。</p></article><article><span class="topic-number">02</span><h3>対応を記録する</h3><p>担当、時刻、メモなどを事案ごとにまとめ、対応中の情報を整理します。</p></article><article><span class="topic-number">03</span><h3>訓練・振り返りに使う</h3><p>実対応と訓練を分けて利用できます。記録の書き出しや印刷を、振り返りにも活用できます。</p></article></div><div class="product-scope"><h2>ご利用前に、対応範囲をご確認ください。</h2><p>成人の救命対応、火災・地震・大雨／浸水の初動手順と記録機能を備えています。不審者・行方不明・停電などは記録機能のみです。<strong>小児・乳児の専用救命手順は未実装です。</strong></p><p>記録は利用端末のブラウザー内に保存され、クラウド同期はありません。施設固有の手順・避難経路・役割分担の確認、適切な研修や訓練と組み合わせてご利用ください。専門機関による監修・認証を取得したものではありません。</p></div></section><section class="tool-consult wrap"><p class="eyebrow">現場での活用を考える</p><h2>アプリと、施設の備えをつなぐ。</h2><p>手順を確認するだけでなく、現場の役割や連絡を研修・訓練で確かめることが大切です。ソナエデザインの支援内容も併せてご覧ください。</p><a class="text-link" href="./index.html#service-details">防災研修・訓練・計画づくりの支援内容 ${arrow}</a></section>${contact("ACTION OSの活用")}`;


const articles = [
  ["review", "BCPの見直し", "そのBCP、いまの現場に合っていますか。", "人員や設備、業務の進め方が変わったら、計画にも見直しが必要です。次の5つから確認してみましょう。", [["連絡先と役割", "異動・退職した担当者の名前が残っていないか。責任者が不在のときの代行者も確認します。"], ["少人数の時間帯", "夜間・休日などの勤務体制で、役割が一人に重なりすぎないかを考えます。"], ["優先する業務", "すべてを通常どおり続けることが難しいとき、何を優先するかを整理します。"], ["必要な資料・道具", "停電や通信障害も想定し、紙の連絡先、保管場所、鍵の管理などを確認します。"], ["訓練後の更新", "気づきを残し、改訂する人と期限を決め、変更した内容を職員に伝えます。"]]],
  ["training", "研修・訓練", "机上訓練を、「話し合い」で終わらせない。", "机上訓練は判断や連携を確かめる機会です。「次に何を変えるか」が残るように設計してみましょう。", [["確かめたいことを決める", "責任者不在時の判断、夜間の役割分担、複数拠点の情報共有など、確認したい課題を絞ります。"], ["迷った理由を残す", "どの情報が足りなかったか、誰が決める想定だったかを記録します。手順や体制を改善する材料にします。"], ["担当と確認日を決める", "連絡網を修正する、代行者を決めるなどの行動に分けて、担当と期限を設定。次回、変更が機能したかを確かめます。"]]],
  ["stock", "備蓄", "備蓄は、買ったあとの使い方まで。", "必要なときに取り出して使えるように、品目・数量と併せて、保管・担当・点検を整えましょう。", [["誰が使うか", "職員だけでなく、利用者や来訪者も想定します。個別の配慮は、日頃の支援方針や専門職の確認も踏まえて検討します。"], ["取り出せるか", "鍵を管理する人が不在でも取り出せるか。水害や転倒・落下のリスクなど、保管場所の条件も確認します。"], ["管理と訓練", "期限・数量・動作状況を確認する担当と日を決めます。安全に試せる範囲で実物を使い、開封や設置の方法を確かめます。"]]]
];
const resources = `<div class="wrap breadcrumb"><a href="./index.html">ホーム</a><span>/</span><span>防災の読みもの・公的支援</span></div><section class="resource-hero wrap"><h1>防災の読みもの・公的支援</h1><p>災害時も事業を続けるための計画（BCP）、訓練、備蓄のヒントと、公的情報の確認先をまとめました。</p></section><section class="wrap articles-section" aria-label="防災の読みもの">${articles.map(a=>`<details class="article-detail" id="${a[0]}"><summary><span class="eyebrow">${a[1]}</span><h2>${a[2]}</h2><span class="article-read">読む <span aria-hidden="true">＋</span></span></summary><div class="article-content"><p>${a[3]}</p>${a[4].map(x=>`<h3>${x[0]}</h3><p>${x[1]}</p>`).join("")}<a class="text-link" href="./index.html#service-details">防災研修・訓練・計画づくりの支援内容 ${arrow}</a></div></details>`).join("")}</section><section class="section wrap" id="support"><p class="eyebrow">公的情報の確認先</p><h2>備えの必要性と、使える支援制度。</h2><div class="public-links"><article><span>計画と運用</span><h3>BCPを、日頃の備えにつなげる。</h3><p>計画の策定に加え、教育・訓練や見直しを続けるために。BCPの考え方や進め方は、中小企業庁の指針を参考にできます。</p><a href="https://www.chusho.meti.go.jp/bcp/contents/level_a/bcpgl_01.html" target="_blank" rel="noopener noreferrer">中小企業庁｜BCP策定運用指針 ${arrow}</a></article><article><span>補助金・助成金</span><h3>地域・法人種別・経費を確認する。</h3><p>一例として、東京都にはBCPの実践に必要な設備等を支援する制度があります。対象法人・経費・募集時期に条件があり、相談料や研修費が対象になるとは限りません。学校法人・社会福祉法人・医療法人などは対象外です。</p><a href="https://www.tokyo-kosha.or.jp/support/josei/setsubijosei/bcp.html" target="_blank" rel="noopener noreferrer">東京都中小企業振興公社｜BCP実践促進助成金 ${arrow}</a><p class="small-note">契約・発注前に、実施機関の最新の募集要項をご確認ください。助成の適用・採択を保証するものではありません。</p></article></div></section><section class="network-section wrap"><div><p class="eyebrow">関連メディア</p><h2>日常の備えにも、つながる。</h2></div><div class="media-links"><div class="media-item" data-media="goods">防災グッズランキング <span>準備中</span></div><div class="media-item" data-media="blog">防災ブログ <span>準備中</span></div></div></section>${contact()}`;


await mkdir(root, { recursive: true });
const pages = [
  ["index.html", "企業・ホテル・店舗・施設の防災研修・訓練・対応計画づくり", "企業・ホテル・店舗・各種施設の防災研修・訓練、BCP作成・見直し、年間サポート。困りごとから支援内容・成果物・料金の決まり方をご案内します。", homePage(sectors, contact)],
  ...sectors.map(s => [s.slug + ".html", s.name + "の防災研修・訓練・BCP支援", s.description, sectorPage(s, sectors)]),
  ["action-os.html", "行動の確認と記録を支えるWebアプリ ACTION OS", "事象に応じた行動確認と、担当・時刻・メモの記録をひとつの画面に。ACTION OSの機能、訓練での活用、利用範囲をご紹介します。", product],
  ["resources.html", "防災の読みもの・公的支援", "BCPの見直し、机上訓練、備蓄のヒント。公的支援や関連メディアの確認先をご案内します。", resources]
];
for (const [filename, title, description, content] of pages) {
  await writeFile(root + filename, page({ title, description, filename, content, base, assetVersion }), "utf8");
}
await writeFile(root + "sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([f]) => `\n  <url><loc>${f === "index.html" ? base : base + f}</loc><lastmod>2026-10-24</lastmod></url>`).join("")}\n</urlset>\n`);
console.log(`Built ${pages.length} static pages.`);
