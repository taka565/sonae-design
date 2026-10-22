"use strict";
(() => {
  const root = document.documentElement;
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionButton = document.querySelector(".motion-control");
  let reducedMotion = motionPreference.matches;
  let motionWasChosen = false;
  function applyMotion() {
    root.classList.toggle("reduce-motion", reducedMotion);
    motionButton.setAttribute("aria-pressed", String(reducedMotion));
    const label = reducedMotion ? "動きを有効にする" : "動きを抑える";
    motionButton.querySelector(".motion-label").textContent = label;
    motionButton.title = label;
  }
  motionButton.addEventListener("click", () => { motionWasChosen = true; reducedMotion = !reducedMotion; applyMotion(); });
  motionPreference.addEventListener("change", event => { if (!motionWasChosen) { reducedMotion = event.matches; applyMotion(); } });
  applyMotion();

  const tabs = [...document.querySelectorAll("[data-sector-tab]")];
  function activateTab(tab, focus = false) {
    for (const item of tabs) {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute("aria-controls")).hidden = !active;
    }
    if (focus) tab.focus({ preventScroll: true });
    // Only move the tab strip, preserving the visitor's vertical reading position.
    const strip = tab.parentElement;
    const left = tab.offsetLeft - strip.offsetLeft;
    if (left < strip.scrollLeft) strip.scrollLeft = left;
    else if (left + tab.offsetWidth > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = left + tab.offsetWidth - strip.clientWidth;
  }
  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", event => {
      const target = event.key === "ArrowRight" ? (index + 1) % tabs.length : event.key === "ArrowLeft" ? (index - 1 + tabs.length) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : null;
      if (target !== null) { event.preventDefault(); activateTab(tabs[target], true); }
    });
  }

  const header = document.querySelector(".header");
  const progress = document.querySelector(".reading-progress>span");
  const quickActions = document.querySelector(".quick-actions");
  const sectionLinks = [...document.querySelectorAll(".home-page #navigation a[href^='#']")];
  let frame = 0;
  function updateReadingPosition() {
    frame = 0;
    const length = root.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${length > 0 ? Math.min(1, Math.max(0, window.scrollY / length)) : 0})`;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
    quickActions.classList.toggle("is-visible", window.scrollY > 430);
    let current = null;
    for (const link of sectionLinks) {
      const section = document.getElementById(link.hash.slice(1));
      if (section && section.getBoundingClientRect().top <= 160) current = link;
    }
    for (const link of sectionLinks) {
      if (link === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }
  function scheduleReadingPosition() { if (!frame) frame = requestAnimationFrame(updateReadingPosition); }
  window.addEventListener("scroll", scheduleReadingPosition, { passive: true });
  window.addEventListener("resize", scheduleReadingPosition, { passive: true });
  document.addEventListener("toggle", scheduleReadingPosition, true);
  updateReadingPosition();
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.07, rootMargin: "0px 0px -15px 0px" });
    for (const element of document.querySelectorAll(".section-heading,.service-row,.guide-banner,.approach-image,.insight-card,.process-list li,.topic-grid article")) {
      element.classList.add("reveal-ready");
      observer.observe(element);
    }
  }

  const guide = document.getElementById("support-guide");
  const next = guide.querySelector(".guide-next");
  const back = guide.querySelector(".guide-back");
  const contact = guide.querySelector(".guide-contact");
  const error = document.getElementById("guide-error");
  const options = {
    plan: { title: "BCP・マニュアルの策定・改善", copy: "既存の計画や職員体制を確認し、現場で使う役割・手順から整理します。新規策定と見直しのどちらも相談できます。", list: ["既存のBCP・マニュアルの有無", "施設の人数・職員体制", "見直したい場面や、気になっている点"], hash: "service-bcp" },
    training: { title: "職員研修・机上訓練・実践訓練", copy: "参加者と現場の課題に合わせて、研修や訓練のテーマ・形式を組み立てます。講師・研修登壇の依頼も相談できます。", list: ["参加する方の役割と人数", "希望するテーマ・想定場面", "希望時期・会場・所要時間"], hash: "service-training" },
    advisory: { title: "月額・年間の顧問支援", copy: "定期的な点検、研修・訓練、振り返りを通じて、継続的に備えを改善するための関わり方を相談できます。", list: ["現在の防災・BCPの担当体制", "年間の研修・訓練の予定", "継続して相談したい課題"], hash: "service-advisory" },
    unsure: { title: "まずは、現場の課題の整理から", copy: "相談内容がまとまっていなくても大丈夫です。施設や組織の状況を伺い、どこから備えを整えるかを一緒に考えます。", list: ["施設・組織の種類と規模", "現在取り組んでいること", "漠然とした不安や、気になっている場面"], hash: "process" }
  };
  let step = 1;
  let focusAfterClose = null;
  const selectedValue = name => guide.querySelector(`input[name="${name}"]:checked`)?.value;
  function renderStep(value, moveFocus = true) {
    step = value;
    error.textContent = "";
    for (const element of guide.querySelectorAll("[data-guide-step]")) element.hidden = Number(element.dataset.guideStep) !== step;
    for (const mark of guide.querySelectorAll("[data-step-mark]")) {
      mark.classList.toggle("is-current", Number(mark.dataset.stepMark) === step);
      mark.classList.toggle("is-complete", Number(mark.dataset.stepMark) < step);
      if (Number(mark.dataset.stepMark) === step) mark.setAttribute("aria-current", "step");
      else mark.removeAttribute("aria-current");
    }
    back.hidden = step === 1;
    next.hidden = step === 3;
    contact.hidden = step !== 3;
    next.firstChild.textContent = step === 2 ? "支援の案内を見る " : "次の質問へ ";
    guide.scrollTop = 0;
    if (moveFocus) {
      const target = step === 3 ? document.getElementById("guide-result-title") : guide.querySelector(`[data-guide-step="${step}"] legend`);
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  }
  function showResult() {
    const result = options[selectedValue("guide-need")];
    document.getElementById("guide-result-title").textContent = result.title;
    document.getElementById("guide-result-copy").textContent = result.copy;
    document.getElementById("guide-result-list").replaceChildren(...result.list.map(text => {
      const item = document.createElement("li"); item.textContent = text; return item;
    }));
    document.getElementById("guide-service-link").href = `./index.html#${result.hash}`;
    const sector = selectedValue("guide-sector");
    const sectorLink = document.getElementById("guide-sector-link");
    sectorLink.hidden = sector === "other";
    if (sector !== "other") sectorLink.href = `./${sector}.html`;
    else sectorLink.removeAttribute("href");
    renderStep(3);
  }
  document.querySelectorAll("[data-open-guide]").forEach(button => button.addEventListener("click", () => {
    if (guide.open) return;
    focusAfterClose = button;
    for (const radio of guide.querySelectorAll("input")) radio.checked = false;
    const initial = guide.dataset.initialSector;
    if (initial) guide.querySelector(`input[name="guide-sector"][value="${initial}"]`).checked = true;
    renderStep(1, false);
    guide.showModal();
    document.body.style.overflow = "hidden";
    guide.scrollTop = 0;
    guide.querySelector(".guide-close").focus({ preventScroll: true });
  }));
  next.addEventListener("click", () => {
    const group = step === 1 ? "guide-sector" : "guide-need";
    if (!selectedValue(group)) {
      error.textContent = step === 1 ? "施設・業種を1つ選んでください。" : "相談したいことを1つ選んでください。";
      guide.querySelector(`input[name="${group}"]`).focus();
      return;
    }
    if (step === 1) renderStep(2);
    else showResult();
  });
  guide.addEventListener("change", () => { error.textContent = ""; });
  back.addEventListener("click", () => renderStep(step - 1));
  guide.querySelector(".guide-close").addEventListener("click", () => guide.close());
  guide.addEventListener("close", () => {
    document.body.style.overflow = "";
    if (focusAfterClose?.isConnected) focusAfterClose.focus({ preventScroll: true });
  });
  guide.addEventListener("click", event => {
    if (event.target !== guide) return;
    const box = guide.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) guide.close();
  });
  contact.addEventListener("click", () => {
    const result = options[selectedValue("guide-need")];
    const sectorText = guide.querySelector('input[name="guide-sector"]:checked').closest("label").querySelector("strong").textContent;
    const area = document.getElementById("contact");
    let context = area.querySelector(".consultation-context");
    if (!context) { context = document.createElement("p"); context.className = "consultation-context"; area.querySelector(".contact-grid>div").append(context); }
    context.textContent = `支援ガイドで選んだ内容：${sectorText} ／ ${result.title}`;
    const emailLink = document.getElementById("email-link");
    if (!emailLink.hidden && emailLink.href.startsWith("mailto:")) {
      emailLink.href = `${emailLink.href.split("?")[0]}?subject=${encodeURIComponent(`ソナエデザイン｜${sectorText}・${result.title}の相談`)}`;
    }
    const heading = area.querySelector("h2");
    heading.tabIndex = -1;
    focusAfterClose = heading;
    guide.close();
    area.scrollIntoView({ block: "start", behavior: "instant" });
    heading.focus({ preventScroll: true });
    scheduleReadingPosition();
  });
})();
