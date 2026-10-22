const arrow = '<span aria-hidden="true">↗</span>';
const photo = (name) => `./assets/blue-${name}.webp`;
const english = {education:"EDUCATION",sports:"SPORTS",care:"CARE & WELFARE",hospitality:"HOSPITALITY",business:"BUSINESS"};

export function premiumContent(content, filename, sectors) {
  if (filename === "index.html") {
    content = content.replace(/^<section class="hero">[\s\S]*?<\/section>/, `
      <section class="hero premium-hero" aria-labelledby="hero-title">
        <div class="hero-landscape" aria-hidden="true"><img src="${photo("hero")}" width="1536" height="1024" fetchpriority="high" alt=""></div>
        <div class="hero-grid-lines" aria-hidden="true"></div>
        <div class="wrap hero-stage">
          <div class="hero-copy">
            <p class="eyebrow"><span class="blue-line"></span> SONAE DESIGN <span class="hero-kicker-jp">防災・危機対応・BCP支援</span></p>
            <h1 id="hero-title">施設と企業の、<br>防災研修・訓練・<br><span>BCP支援。</span></h1>
            <p class="hero-lead">人を守る。事業をつなぐ。<br>現場に必要な備えを、計画から実践まで。</p>
            <div class="hero-actions"><a class="button button-white" href="#services">支援内容を見る ${arrow}</a><button class="button button-outline" type="button" data-open-guide>自分に合う支援を探す ${arrow}</button></div>
            <p class="hero-audience">保育・教育 ／ スポーツ ／ 介護・福祉 ／ 宿泊 ／ 一般企業</p>
          </div>
          <div class="hero-side-note" aria-hidden="true"><span>DESIGN FOR</span><strong>READINESS.</strong><i></i><span>備えを、動ける力に。</span></div>
        </div>
        <div class="wrap hero-bottom"><a href="#sectors"><span class="scroll-line" aria-hidden="true"></span> SCROLL TO DISCOVER</a><span>施設のイメージ画像</span><span class="hero-edition">PLAN / TRAIN / ACT</span></div>
      </section>
      <div class="intro-strip"><div class="wrap"><p>命を預かる現場に、<strong>実行できる備えを。</strong></p><span>計画づくりから、職員研修・訓練、継続的な改善まで。</span></div></div>`);

    content = content.replace(/<section class="sectors-section"[\s\S]*?<\/section>/, `
      <section class="sectors-section" id="sectors" aria-labelledby="sectors-title">
        <div class="wrap"><div class="section-heading"><div><p class="eyebrow"><span class="section-index">01</span> FIELDS / 対象の施設・業種</p><h2 id="sectors-title">守る日常は、<br>現場ごとに違うから。</h2></div><p>あなたの施設・業種を選ぶと、<br>相談できる支援をご覧いただけます。</p></div>
          <div class="sector-tabs" role="tablist" aria-label="施設・業種を選ぶ">${sectors.map((s,i)=>`<button type="button" role="tab" id="tab-${s.slug}" aria-controls="panel-${s.slug}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-sector-tab="${s.slug}"><span>${s.number}</span><strong>${s.short}</strong><i aria-hidden="true">↗</i></button>`).join("")}</div>
          <div class="sector-panels">${sectors.map((s,i)=>`
            <div class="sector-panel" role="tabpanel" id="panel-${s.slug}" aria-labelledby="tab-${s.slug}" tabindex="0" ${i?"hidden":""}>
              <figure class="sector-photo"><img src="${photo(s.slug)}" width="1536" height="1024" alt="${s.name}の空間イメージ" loading="lazy"><figcaption>施設のイメージ画像</figcaption><span class="photo-index" aria-hidden="true">${s.number}<small>/ 05</small></span></figure>
              <div class="sector-panel-copy"><span class="field-english">${english[s.slug]}</span><h3>${s.name}</h3><p class="sector-target">${s.audience}</p><p class="sector-problem">${s.problem}</p><a class="button button-dark" href="./${s.slug}.html">この分野の支援を見る ${arrow}</a><span class="sector-caption">現場の課題・支援内容・訓練の想定例をご紹介</span></div>
            </div>`).join("")}</div>
          <div class="all-fields"><span>各分野のページへ</span>${sectors.map(s=>`<a href="./${s.slug}.html">${s.short} ${arrow}</a>`).join("")}</div>
        </div>
      </section>`);

    content = content.replace(/<section class="approach-band">[\s\S]*?<\/section>/, `
      <section class="approach-band"><div class="wrap approach-grid"><figure class="approach-image"><img src="./assets/readiness-workshop.webp" width="1536" height="1024" alt="図面を囲み、現場の役割や手順を確認する机上訓練のイメージ" loading="lazy"><figcaption>研修・訓練のイメージ画像</figcaption><div class="image-outline" aria-hidden="true"></div></figure><div><p class="eyebrow light">OUR APPROACH / 私たちの考え方</p><h2>計画を、<br>現場で動く力に。</h2><div class="approach-items"><div><span>01</span><h3>実際の体制から考える</h3><p>夜間・少人数・責任者不在。普段と違う状況まで含めて整理します。</p></div><div><span>02</span><h3>迷う場面を確かめる</h3><p>判断が止まった理由や、足りない情報を訓練で見つけます。</p></div><div><span>03</span><h3>次に変えることを残す</h3><p>振り返りを、役割や手順の見直しにつなげます。</p></div></div></div></div></section>`);

    content = content.replace('<section class="section wrap" id="services">','<section class="section wrap premium-services" id="services">');
    content = content.replace('<p class="eyebrow">ソナエデザインにできること</p>','<p class="eyebrow"><span class="section-index">02</span> SERVICES / 支援内容</p>');
    content = content.replace('<p class="eyebrow">ご依頼の流れ</p>','<p class="eyebrow"><span class="section-index">03</span> PROCESS / ご依頼の流れ</p>');
    content = content.replace('<section class="approach-band">', `<section class="guide-banner wrap" aria-labelledby="guide-banner-title"><div><p class="eyebrow">FIND YOUR SUPPORT</p><h2 id="guide-banner-title">何から始めるか、<br>迷っている方へ。</h2><p>施設の種類と、いまの困りごと。<br>2つの質問から、相談の入口をご案内します。</p></div><button class="guide-launch" type="button" data-open-guide><span class="guide-launch-circle" aria-hidden="true">↗</span><strong>支援を探す</strong><span>2つの質問でご案内</span></button><span class="guide-watermark" aria-hidden="true">START<br>HERE.</span></section><section class="approach-band">`);
    content = content.replace('<section class="section wrap faq-section">', `<section class="insights-teaser wrap"><div class="section-heading"><div><p class="eyebrow">INSIGHTS / 防災の読みもの</p><h2>今日の気づきを、<br>明日の備えに。</h2></div><a class="text-link" href="./resources.html">すべての読みものを見る ${arrow}</a></div><div class="insight-cards">${[
      ["review","business","BCPの見直し","そのBCP、いまの現場に<br>合っていますか。"],
      ["training","sports","研修・訓練","机上訓練を、<br>話し合いで終わらせない。"],
      ["stock","care","備蓄","備蓄は、買ったあとの<br>使い方まで。"]
    ].map(([id,img,label,title])=>`<a class="insight-card" href="./resources.html#${id}"><div class="insight-photo"><img src="${photo(img)}" width="1536" height="1024" alt="${label}を考える施設のイメージ" loading="lazy"></div><span>${label}</span><h3>${title}</h3><span class="insight-arrow" aria-hidden="true">↗</span></a>`).join("")}</div><p class="image-disclaimer">掲載写真は各分野のイメージです。</p></section><section class="section wrap faq-section">`);
  } else {
    const sector = sectors.find(s=>filename===s.slug+".html");
    if (sector) {
      content = content.replace(/<div class="sector-sign">[\s\S]*?<\/div>/, `<figure class="sector-sign sector-hero-photo"><img src="${photo(sector.slug)}" width="1536" height="1024" alt="${sector.name}の空間イメージ" fetchpriority="high"><figcaption><span>${english[sector.slug]}</span><span>施設のイメージ画像</span></figcaption></figure>`);
    }
    if(filename === "resources.html") {
      const imageMap={review:"business",training:"sports",stock:"care"};
      content=content.replace(/(<details class="article-detail" id="([^"]+)"><summary>)/g,(_,prefix,id)=>`${prefix}<img class="reading-thumbnail" src="${photo(imageMap[id])}" width="1536" height="1024" alt="${id==='review'?'企業':id==='training'?'スポーツ施設':'福祉施設'}のイメージ" loading="lazy">`);
    }
  }
  return content;
}

export function premiumExtras(sectors, filename) {
  const selected=sectors.find(s=>filename===s.slug+".html")?.slug||"";
  return `<div class="reading-progress" aria-hidden="true"><span></span></div>
    <div class="quick-actions"><button type="button" class="quick-guide" data-open-guide><span class="quick-icon" aria-hidden="true">＋</span><span>支援を探す</span></button><a class="quick-top" href="#top" aria-label="ページの先頭へ"><span aria-hidden="true">↑</span></a></div>
    <button class="motion-control" type="button" aria-pressed="false" title="アニメーションを抑える"><span aria-hidden="true">Ⅱ</span><span class="motion-label">動きを抑える</span></button>
    <dialog id="support-guide" class="support-guide" aria-labelledby="guide-title" data-initial-sector="${selected}">
      <div class="guide-dialog-top"><span>SONAE DESIGN / SUPPORT GUIDE</span><button class="guide-close" type="button" aria-label="支援ガイドを閉じる">×</button></div>
      <div class="guide-progress" aria-label="質問の進み具合"><span data-step-mark="1" class="is-current">01 <i>施設・業種</i></span><b></b><span data-step-mark="2">02 <i>困りごと</i></span><b></b><span data-step-mark="3">03 <i>ご案内</i></span></div>
      <h2 id="guide-title">自分に合う支援を見つける。</h2>
      <p class="guide-intro">2つの質問で、相談の入口をご案内します。</p>
      <div class="guide-step" data-guide-step="1"><fieldset><legend>施設・業種を選んでください。</legend><div class="guide-options">${sectors.map(s=>`<label><input type="radio" name="guide-sector" value="${s.slug}"><span><strong>${s.name}</strong><small>${s.audience}</small></span><i aria-hidden="true">✓</i></label>`).join("")}<label><input type="radio" name="guide-sector" value="other"><span><strong>その他・まだ決まっていない</strong><small>団体での研修や講師依頼もこちら</small></span><i aria-hidden="true">✓</i></label></div></fieldset></div>
      <div class="guide-step" data-guide-step="2" hidden><fieldset><legend>いま、一番相談したいことは？</legend><div class="guide-options">${[
        ["plan","BCP・マニュアルを整えたい","新規策定、見直し、役割・手順の整理"],
        ["training","研修・訓練を実施したい","職員研修、机上・実践訓練、講師依頼"],
        ["advisory","継続的に相談できる相手がほしい","年間の研修・訓練、定期点検、顧問支援"],
        ["unsure","課題を整理するところから相談したい","どの支援が合うか、まだわからない"]
      ].map(([v,title,sub])=>`<label><input type="radio" name="guide-need" value="${v}"><span><strong>${title}</strong><small>${sub}</small></span><i aria-hidden="true">✓</i></label>`).join("")}</div></fieldset></div>
      <div class="guide-step guide-result" data-guide-step="3" hidden><span class="result-kicker">ご相談の入口</span><h3 id="guide-result-title"></h3><p id="guide-result-copy"></p><div class="result-preparation"><span>相談時にあると役立つこと</span><ul id="guide-result-list"></ul></div><div class="result-links"><a id="guide-service-link" class="button button-dark">支援内容を詳しく見る ${arrow}</a><a id="guide-sector-link" class="text-link">分野別の支援を見る ${arrow}</a></div><p class="guide-result-note">選択に応じた支援内容のご案内です。正式な内容・費用は、現場の状況を確認してご提案します。</p></div>
      <p id="guide-error" class="guide-error" role="alert"></p>
      <div class="guide-controls"><button type="button" class="guide-back" hidden>← 前の質問へ</button><button type="button" class="button button-dark guide-next">次の質問へ ${arrow}</button><button type="button" class="button button-dark guide-contact" hidden>ご相談・受付状況を見る ${arrow}</button></div>
      <p class="guide-privacy">個人情報の入力はありません。選択内容は、このページ内でのみ扱います。</p>
    </dialog>`;
}
