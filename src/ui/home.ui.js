/* =========================================================
   Community Watches — blocos novos da Home
   1. card de valorização com linha e seletor de período
   2. faixa de ações rápidas
   3. rosca de alocação por categoria

   Tudo lê do estado existente (CW.active, CW.history, CW.money).
   Nenhum dado é duplicado aqui.
   ========================================================= */

import { sparkline, donut, PIE } from './charts.js';

let range = '1Y';          /* '6M' | '1Y' | 'All' */
const RANGE_MONTHS = { '6M': 6, '1Y': 12, 'All': 60 };

/* ---------- pontos de montagem, criados por JS (padrão ensure* do main.js) ---------- */
function ensureMounts() {
  const home = document.getElementById('s-home');
  if (!home) return null;

  const kpis = home.querySelector('.kpis');
  const search = home.querySelector('.search');
  const addedHead = home.querySelector('[data-i="secAdded"]');

  let val = document.getElementById('uiValuation');
  if (!val) {
    val = document.createElement('div');
    val.id = 'uiValuation';
    if (search && search.nextSibling) home.insertBefore(val, search.nextSibling);
    else home.appendChild(val);
    /* os dois KPIs viram parte do card novo */
    if (kpis) kpis.classList.add('ui-hide');
  }

  let quick = document.getElementById('uiQuick');
  if (!quick) {
    quick = document.createElement('div');
    quick.id = 'uiQuick';
    quick.className = 'ui-quick';
    val.after(quick);
  }

  let alloc = document.getElementById('uiAlloc');
  if (!alloc) {
    alloc = document.createElement('div');
    alloc.id = 'uiAlloc';
    if (addedHead) home.insertBefore(alloc, addedHead);
    else home.appendChild(alloc);
  }

  return { val, quick, alloc };
}

/* ---------- série do portfólio: soma dos históricos de cada peça ---------- */
function portfolioSeries(CW) {
  const list = CW.active();
  if (!list.length) return [];
  const months = 60;
  const sum = new Array(months).fill(0);
  list.forEach(w => {
    const h = CW.history(w);
    for (let i = 0; i < months; i++) sum[i] += h[i] || 0;
  });
  const keep = RANGE_MONTHS[range] || 12;
  return sum.slice(months - keep);
}

function rangeLabels(CW, points) {
  const now = new Date();
  const out = [];
  for (let k = 0; k < 4; k++) {
    const i = Math.round(k * (points - 1) / 3);
    const d = new Date(now.getFullYear(), now.getMonth() - (points - 1 - i), 1);
    out.push(d.toLocaleDateString(CW.S.lang === 'pt' ? 'pt-BR' : 'en-GB', { month: 'short', year: '2-digit' }));
  }
  return out;
}

/* ---------- 1. card de valorização ---------- */
export function renderValuation(CW) {
  const box = document.getElementById('uiValuation');
  if (!box) return;
  const list = CW.active();

  if (!list.length) {
    box.innerHTML = '<div class="card hint">' + CW.t('emptyS') + '</div>';
    return;
  }

  const series = portfolioSeries(CW);
  const spark = sparkline(series, { width: 348, height: 96, pad: 8 });
  const delta = range === 'All'
    ? (CW.totalMkt() - CW.totalPaid()) / CW.totalPaid() * 100
    : spark.delta;
  const sinceKey = range === '6M' ? 'uiSince6M' : range === '1Y' ? 'uiSince1Y' : 'uiSinceAll';
  const labels = rangeLabels(CW, series.length);

  const seg = ['6M', '1Y', 'All'].map(k =>
    '<button type="button" data-range="' + k + '" class="' + (range === k ? 'on' : '') + '">' +
    CW.t(k === '6M' ? 'uiVal6M' : k === '1Y' ? 'uiVal1Y' : 'uiValAll') + '</button>').join('');

  box.innerHTML =
    '<section class="ui-val">' +
      '<div class="ui-val-head">' +
        '<div class="ui-val-figure">' +
          '<div class="lab">' + CW.t('uiValTitle') + '</div>' +
          '<b class="ui-val-total">' + CW.money(CW.totalMkt(), true) + '</b>' +
          '<div class="ui-val-delta">' +
            '<span class="' + (delta >= 0 ? 'up' : 'down') + '">' + (delta >= 0 ? '+' : '') + delta.toFixed(1) + '%</span>' +
            '<span class="ui-val-since">' + CW.t(sinceKey) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="seg ui-val-seg">' + seg + '</div>' +
      '</div>' +
      '<div class="ui-val-chart">' + spark.svg + '</div>' +
      '<div class="ui-val-labels">' + labels.map(l => '<span>' + l + '</span>').join('') + '</div>' +
      '<div class="ui-val-foot">' +
        '<span>' + CW.t('uiInvested') + '</span>' +
        '<b>' + CW.money(CW.totalPaid(), true) + '</b>' +
        '<span class="ui-val-sep"></span>' +
        '<span>' + CW.t('kPieces') + '</span>' +
        '<b>' + list.length + '</b>' +
      '</div>' +
    '</section>';

  box.querySelectorAll('[data-range]').forEach(b =>
    b.addEventListener('click', () => { range = b.dataset.range; renderValuation(CW); }));
}

/* ---------- 2. ações rápidas ---------- */
const ICON = {
  grails: '<circle cx="12" cy="12.5" r="5"/><path d="M8.7 7.8 9 3.5h6l.3 4.3M8.7 17.2 9 21.5h6l.3-4.3"/>',
  catalog: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  add: '<path d="M12 5v14M5 12h14"/>',
  julios: '<path d="M21 12a8 8 0 1 1-3.2-6.4"/><path d="M8 11h8M8 15h5"/>'
};

export function renderQuickActions(CW) {
  const box = document.getElementById('uiQuick');
  if (!box) return;

  const items = [
    { k: 'secGrails', icon: 'grails', fn: 'openGrails' },
    { k: 'uiQuickCatalog', icon: 'catalog', fn: 'openCatalog' },
    { k: 'uiQuickAdd', icon: 'add', fn: 'openScan' },
    { k: 'uiQuickJulios', icon: 'julios', fn: 'openChat' }
  ];

  box.innerHTML = items.map(it =>
    '<button type="button" class="ui-tile" data-fn="' + it.fn + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2.2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[it.icon] + '</svg>' +
      '<span>' + CW.t(it.k) + '</span>' +
    '</button>').join('');

  box.querySelectorAll('[data-fn]').forEach(b =>
    b.addEventListener('click', () => { const f = window[b.dataset.fn]; if (f) f(); }));
}

/* ---------- 3. alocação por categoria ---------- */
export function renderAllocation(CW) {
  const box = document.getElementById('uiAlloc');
  if (!box) return;
  const list = CW.active();
  if (!list.length) { box.innerHTML = ''; return; }

  const byCat = {};
  list.forEach(w => { (byCat[w.cat] = byCat[w.cat] || []).push(w); });
  const total = CW.totalMkt();
  const segs = Object.keys(byCat)
    .map(k => ({ name: k, list: byCat[k], value: byCat[k].reduce((s, w) => s + w.mkt, 0) }))
    .sort((a, b) => b.value - a.value)
    .map((s, i) => Object.assign(s, { color: PIE[i % PIE.length] }));

  box.innerHTML =
    '<h2 class="sec">' + CW.t('uiAlloc') + '</h2>' +
    '<div class="card ui-alloc">' +
      donut(segs, { size: 118, thickness: 15, center: String(list.length), sub: CW.t('uiPieces') }) +
      '<div class="ui-legend">' +
        segs.map(s =>
          '<button type="button" class="ui-legend-row" data-cat="' + s.name + '">' +
            '<i style="background:' + s.color + '"></i>' +
            '<b>' + s.name + '</b>' +
            '<span>' + Math.round(s.value / total * 100) + '%</span>' +
          '</button>').join('') +
      '</div>' +
    '</div>';

  box.querySelectorAll('[data-cat]').forEach(b =>
    b.addEventListener('click', () => window.filterBy('cat', b.dataset.cat)));
}

export function renderHomeUI(CW) {
  if (!ensureMounts()) return;
  renderValuation(CW);
  renderQuickActions(CW);
  renderAllocation(CW);
}
