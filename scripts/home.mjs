const arrow = '<span aria-hidden="true">→</span>';

export function homePage(sectors, contact) {
  const fieldOrder = ["business", "hospitality", "education", "care", "sports"];
  return `
<section class="home-intro wrap" aria-labelledby="intro-title">
  <div class="intro-columns">
    <div><p class="intro-audience">企業・ホテル・店舗・各種施設の方へ</p>
      <h1 id="intro-title"><span class="phrase">職場の防災訓練と</span><br><span class="phrase">災害への備えを</span><span class="phrase">支援。</span></h1></div>
    <div class="intro-summary"><p>研修・訓練の実施から、災害時の対応計画づくりまで。<br class="desktop-break">担当者の困りごとに合わせて支援します。</p>
      <div class="intro-actions"><a class="button button-dark" href="#services">支援内容を見る <span aria-hidden="true">↓</span></a><a class="text-link" href="#process">料金・ご依頼の流れ</a></div>
    </div>
  </div>
</section>

<section class="needs-section" id="services" aria-labelledby="needs-title">
  <div class="wrap"><h2 id="needs-title"><span class="phrase">どんなことで</span><span class="phrase">お困りですか？</span></h2>
    <ul class="needs-list">
      <li><a href="#service-training"><span><strong>職員・従業員の訓練をしたい</strong><small>防災研修・避難訓練など</small></span>${arrow}</a></li>
      <li><a href="#service-bcp"><span><strong>災害時の対応を決めたい</strong><small>対応手順や事業を続ける計画づくり</small></span>${arrow}</a></li>
      <li><a href="#service-advisory"><span><strong><span class="phrase">定期的に相談・</span><span class="phrase">見直しをしたい</span></strong><small>年間の訓練・計画見直しを支援</small></span>${arrow}</a></li>
    </ul>
  </div>
</section>

<section class="section wrap examples-section" id="examples" aria-labelledby="examples-title">
  <h2 id="examples-title">例えば、こんな相談ができます</h2>
  <p class="section-lead">支援内容を説明するための想定例です。現場の状況に合わせて内容を決めます。</p>
  <div class="consultation-examples">
    <article><h3>企業の総務担当者</h3><p>社内で共有する計画を見直し、部署ごとの役割と、責任者が不在のときの判断を整理したい。</p><a class="text-link" href="./business.html">企業向けの支援内容 ${arrow}</a></article>
    <article><h3>ホテルの運営担当者</h3><p>夜間の少人数体制で、宿泊客への案内と情報収集をどう分担するか、訓練で確かめたい。</p><a class="text-link" href="./hospitality.html">ホテル向けの支援内容 ${arrow}</a></article>
    <article><h3>店舗の経営者</h3><p>専任の防災担当者がいない。少人数の店でも実行できる備えを、何から始めるか整理したい。</p><a class="text-link" href="./business.html#small-business">小規模な店舗の相談例 ${arrow}</a></article>
  </div>
</section>

<section class="section services-detail" id="service-details" aria-labelledby="details-title"><div class="wrap">
  <h2 id="details-title">ご依頼いただける3つの支援</h2>
  <p class="section-lead">以下は支援内容・成果物の例です。必要な内容と作成する資料を相談し、見積もりに含む範囲を事前に決めます。</p>
  <article class="service-detail" id="service-training" tabindex="-1" aria-labelledby="training-title">
    <div class="service-heading"><h3 id="training-title">防災研修・訓練</h3><p>職員・従業員が学び、<br>実際の動きを確かめます。</p></div>
    <dl class="service-facts">
      <div><dt>こんな困りごと</dt><dd>訓練が毎年同じ内容になっている。責任者が不在のときの動きが決まっていない。</dd></div>
      <div><dt>実施すること</dt><dd><p>職員研修、机上訓練、避難・初動を確認する実践訓練などを、現場の課題に合わせて設計・実施します。講師・研修登壇のみの依頼も相談できます。</p><p id="service-tabletop"><strong>机上訓練とは：</strong>災害の場面を想定し、誰がどう動くかを話し合って確かめる訓練です。</p><p id="service-drill"><strong>実践訓練とは：</strong>実際の場所で動き、避難・連絡・役割分担を確かめる訓練です。施設条件と安全管理を踏まえて設計します。</p></dd></div>
      <div><dt>受け取れるもの</dt><dd>訓練シナリオ、研修資料、振り返り、改善事項一覧など。</dd></div>
    </dl>
  </article>
  <article class="service-detail" id="service-bcp" tabindex="-1" aria-labelledby="bcp-title">
    <div class="service-heading"><h3 id="bcp-title">BCP作成・見直し</h3><p>災害時の対応手順と、<br>事業を続ける計画を整えます。</p></div>
    <dl class="service-facts">
      <div><dt>こんな困りごと</dt><dd>作った計画が、今の人員や運営体制に合っていない。何を決めておくべきか整理したい。</dd></div>
      <div><dt>実施すること</dt><dd><p><strong>災害時も事業を続けるための計画（BCP）</strong>と、対応マニュアルの作成・見直しを支援します。</p><p>既存資料と現場の体制を確認し、初動、優先業務、役割分担、連絡手順を整理します。</p></dd></div>
      <div><dt>受け取れるもの</dt><dd>BCPの改訂案、役割分担表、初動対応シートなど。</dd></div>
    </dl>
  </article>
  <article class="service-detail" id="service-advisory" tabindex="-1" aria-labelledby="advisory-title">
    <div class="service-heading"><h3 id="advisory-title">年間サポート</h3><p>定期的な相談と見直しを、<br>月額・年間の顧問支援で。</p></div>
    <dl class="service-facts">
      <div><dt>こんな困りごと</dt><dd>担当者だけでは、定期的な点検や訓練後の見直しまで手が回らない。</dd></div>
      <div><dt>実施すること</dt><dd>計画の点検、年間の研修・訓練計画づくり、実施後の改善相談など。相談頻度、訪問、研修の実施、緊急時の対応を含めるかなどは、契約前に範囲を確認します。</dd></div>
      <div><dt>受け取れるもの</dt><dd>年間計画、点検結果、改善の記録など。</dd></div>
    </dl>
  </article>
  <a class="text-link" href="#process">料金の決まり方と依頼方法を確認する ${arrow}</a>
</div></section>

<section class="section wrap" id="approach" aria-labelledby="approach-title">
  <div class="support-approach"><div><h2 id="approach-title">現場の体制を確認し、<br>支援内容を決めます</h2>
    <ul class="feature-list"><li><strong>実際の人数・役割から考える</strong><p>夜間、少人数、責任者不在などの状況も伺い、実行できる手順を整理します。</p></li><li><strong>既存の資料を生かす</strong><p>今ある計画や訓練の記録を確認し、必要な見直しから取り組みます。</p></li><li><strong>改善することを残す</strong><p>研修・訓練の振り返りを、役割や手順の更新につなげます。</p></li></ul></div>
    <figure class="support-photo"><img src="./assets/readiness-workshop.webp" width="1536" height="1024" alt="図面を囲み、施設の役割や対応手順を話し合う様子のイメージ" loading="lazy"><figcaption>研修・訓練のイメージ画像（AI生成）</figcaption></figure>
  </div>
</section>

<section class="section process-section" id="process" aria-labelledby="process-title"><div class="wrap">
  <h2 id="process-title">料金・対応範囲・ご依頼の流れ</h2>
  <dl class="estimate-facts">
    <div><dt>料金の決まり方</dt><dd><strong>内容・人数・実施時間・訪問の有無に応じて個別にお見積もりします。</strong><p>必要な準備、支援する範囲、作成する資料を確認し、費用をご提案します。内容・費用に合意してから実施します。</p></dd></div>
    <div><dt>地域・実施方法</dt><dd>所在地、希望時期、支援内容を伺い、訪問できる地域やオンラインでの対応可否を個別に確認します。希望する予算も、見積もり前にお知らせください。</dd></div>
  </dl>
  <h3 class="flow-title">受付開始後は、次の流れで進めます</h3>
  <ol class="process-list"><li><h4>現状をお聞きします</h4><p>施設・店舗の種類、人数、今ある資料、困っていることを伺います。</p></li><li><h4>内容・費用をご提案</h4><p>支援範囲、成果物、日程、実施方法を整理し、見積もりをご確認いただきます。</p></li><li><h4>実施・振り返り</h4><p>研修・訓練や計画づくりを実施し、次に改善することをまとめます。</p></li></ol>
  <a class="text-link" href="#contact">相談窓口の受付状況を確認する ${arrow}</a>
</div></section>

<section class="section wrap" id="sectors" aria-labelledby="sectors-title">
  <h2 id="sectors-title">施設・業種に合わせた支援</h2>
  <p class="section-lead">それぞれの現場の課題、支援内容、訓練の想定例をご覧いただけます。</p>
  <ul class="field-links">${fieldOrder.map(slug=>sectors.find(s=>s.slug===slug)).map(s=>`<li><a href="./${s.slug}.html"><span><strong>${s.name}</strong><small>${s.audience}</small></span>${arrow}</a></li>`).join("")}</ul>
</section>

<section class="section tool-introduction" id="tool" aria-labelledby="tool-title"><div class="wrap tool-layout">
  <div><p class="eyebrow">手順の確認・記録を支えるツール</p><h2 id="tool-title">災害時の手順を確認し、<br>対応を記録する道具</h2><p>ACTION OSは、事象に応じた行動を確認し、担当・時刻・メモを記録するWebアプリです。対応後や訓練後の振り返りにも使えます。</p><a class="text-link" href="./action-os.html">行動確認・記録ツールの機能と利用範囲 ${arrow}</a></div>
  <figure><img src="./assets/action-os-screen.png" width="1440" height="900" alt="ACTION OSのホーム画面。事象や訓練を選ぶ画面。" loading="lazy"><figcaption>ACTION OSのホーム画面</figcaption></figure>
</div></section>

<section class="section wrap faq-section" id="faq" aria-labelledby="faq-title"><h2 id="faq-title">よくあるご質問</h2><div class="faq-list">
  <details><summary>小規模な店舗や、専任の担当者がいない職場も相談できますか？<span aria-hidden="true">＋</span></summary><p>相談できます。現在の人員や資料、困っていることから整理します。どの支援を依頼するか、事前に決まっていなくても構いません。</p></details>
  <details><summary>研修や講師の依頼だけでも相談できますか？<span aria-hidden="true">＋</span></summary><p>職員研修、机上・実践訓練、講師登壇を単独でも相談できます。参加者、テーマ、実施時間、場所をもとに内容を組み立てます。</p></details>
  <details><summary>遠方への訪問や、オンラインでの対応はできますか？<span aria-hidden="true">＋</span></summary><p>所在地、希望時期、支援内容を確認し、対応可否と費用をご案内します。訪問・オンラインでの対応が可能と一律にお約束するものではありません。<a href="#process">料金・対応範囲の説明</a>もご覧ください。</p></details>
  <details><summary>対象に載っていない施設も相談できますか？<span aria-hidden="true">＋</span></summary><p>施設の種類、現場の状況、希望する支援内容をお知らせください。支援できる範囲と実施方法を確認してご案内します。</p></details>
  <details><summary>補助金や公的支援は使えますか？<span aria-hidden="true">＋</span></summary><p>地域・法人種別・対象経費・時期によって異なり、本サービスの費用が対象になるとは限りません。<a href="./resources.html#support">公的支援の確認先</a>を掲載しています。</p></details>
</div></section>
${contact()}`;
}
