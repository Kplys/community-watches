/* =========================================================
   Community Watches — detalhe do relógio, camada extra
   Envolve window.openDetail: o corpo original é montado por
   main.js e aqui recebem-se as seções novas.

   Acrescenta:
   . rail de ações sobre o slot 3D
   . seletor de período no gráfico existente (#lineC, drawLine)
   . rosca de composição do valor + três indicadores
   . linha do tempo de propriedade
   ========================================================= */

import { donut, PIE } from './charts.js';

let dRange = 'All';                       /* '3Y' | '5Y' | 'All' */
const RANGE_MONTHS = { '3Y': 36, '5Y': 60, 'All': 60 };
let current = null;

const RAIL = [
  { k: 'uiRailService', icon: '<path d="M12 5v14M5 12h14"/>', act: CW => CW.toast(CW.t('uiServiceSaved')) },
  { k: 'uiRailAsk', icon: '<path d="M21 12a8 8 0 1 1-3.2-6.4"/><path d="M8 11h8M8 15h5"/>', act: () => window.openChat() },
  { k: 'uiRailAuth', icon: '<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><circle cx="12" cy="12" r="3.2"/>', act: () => window.openScan() }
];

/* ---------- rail flutuante sobre o slot do modelo 3D ---------- */
function mountRail(CW, body) {
  const slot = body.querySelector('.slot');
  if (!slot || slot.querySelector('.ui-rail')) return;
  const rail = document.createElement('div');
  rail.className = 'ui-rail';
  rail.innerHTML = RAIL.map((a, i) =>
    '<button type="button" class="iconbtn" data-rail="' + i + '" aria-label="' + CW.t(a.k) + '">' +
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + a.icon + '</svg>' +
    '</button>').join('');
  slot.appendChild(rail);
  rail.querySelectorAll('[data-rail]').forEach(b =>
    b.addEventListener('click', e => { e.stopPropagation(); RAIL[+b.dataset.rail].act(CW); }));
}

/* ---------- chips de identificação sobre o slot 3D ---------- */
function mountChips(CW, body, w) {
  const slot = body.querySelector('.slot');
  if (!slot || body.querySelector('.ui-chips')) return;
  const items = [w.ref, String(w.year), w.cat];
  if (w.papers) items.push(CW.t('detPapers'));
  items.push(CW.t(w.strap === 'metal' ? 'uiStrapMetal' : 'uiStrapOther'));
  const chips = document.createElement('div');
  chips.className = 'ui-chips';
  chips.innerHTML = items.map(v => '<span class="tag">' + v + '</span>').join('');
  slot.after(chips);
}

/* ---------- valor + delta + período, dentro do card do gráfico já existente ---------- */
function mountRangePicker(CW, body, w) {
  const canvas = body.querySelector('#lineC');
  if (!canvas) return;
  const card = canvas.closest('.card');
  const head = card && card.previousElementSibling;
  if (head && head.tagName === 'H2') head.textContent = CW.t('uiValHistory');
  if (!card || card.querySelector('.ui-mkt-head')) return;

  const row = document.createElement('div');
  row.className = 'ui-mkt-head';
  row.innerHTML =
    '<div class="ui-mkt-figure"><b>' + CW.money(w.mkt, true) + '</b><span class="ui-mkt-delta"></span></div>' +
    '<div class="seg ui-range">' + ['3Y', '5Y', 'All'].map(k =>
      '<button type="button" data-drange="' + k + '" class="' + (dRange === k ? 'on' : '') + '">' +
      (k === 'All' ? CW.t('uiValAll') : (CW.S.lang === 'pt' ? (k === '3Y' ? '3A' : '5A') : k)) +
      '</button>').join('') + '</div>';
  card.insertBefore(row, canvas);

  const delta = row.querySelector('.ui-mkt-delta');
  const draw = () => {
    const h = CW.history(w);
    const slice = h.slice(h.length - (RANGE_MONTHS[dRange] || 60));
    CW.drawLine(slice, canvas);
    const pct = slice[0] ? (slice[slice.length - 1] - slice[0]) / slice[0] * 100 : 0;
    delta.className = 'ui-mkt-delta ' + (pct >= 0 ? 'up' : 'down');
    delta.textContent = (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%';
  };
  row.querySelectorAll('[data-drange]').forEach(b =>
    b.addEventListener('click', () => {
      dRange = b.dataset.drange;
      row.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      draw();
    }));
  requestAnimationFrame(draw);
}

/* ---------- composição do valor + indicadores ---------- */
function compositionHTML(CW, w) {
  const gain = w.mkt - w.paid;
  const up = gain >= 0;
  const base = Math.max(w.mkt, w.paid) || 1;
  const segs = [
    { name: CW.t('uiCompInvested'), value: Math.min(w.paid, w.mkt), color: PIE[2], amount: CW.money(w.paid, true) },
    { name: up ? CW.t('uiCompGain') : CW.t('uiCompLoss'), value: Math.abs(gain), color: up ? PIE[0] : 'var(--down)', amount: CW.money(Math.abs(gain), true) }
  ];
  const pctTotal = w.paid ? gain / w.paid * 100 : 0;
  const years = Math.max(1, new Date().getFullYear() - new Date(w.date).getFullYear());
  const share = CW.totalMkt() ? Math.round(w.mkt / CW.totalMkt() * 100) : 0;

  const stat = (lab, val) => '<div class="ui-substat"><div class="lab">' + lab + '</div><b>' + val + '</b></div>';

  return '<h2 class="sec">' + CW.t('uiComposition') + '</h2>' +
    '<div class="card">' +
      '<div class="ui-alloc">' +
        donut(segs, {
          size: 112, thickness: 14,
          center: (up ? '+' : '') + pctTotal.toFixed(0) + '%',
          centerSize: 17, sub: CW.t('uiUpside')
        }) +
        '<div class="ui-legend">' +
          segs.map(s =>
            '<div class="ui-legend-row ui-legend-static">' +
              '<i style="background:' + s.color + '"></i>' +
              '<div class="ui-legend-txt"><b>' + s.name + '</b><span>' + s.amount + '</span></div>' +
              '<span>' + Math.round(s.value / base * 100) + '%</span>' +
            '</div>').join('') +
        '</div>' +
      '</div>' +
      '<div class="ui-substats">' +
        stat(CW.t('uiYearsHeld'), years + (CW.S.lang === 'pt' ? 'a' : 'y')) +
        stat(CW.t('uiAnnualised'), (pctTotal / years).toFixed(1) + '%') +
        stat(CW.t('uiShareOfBox'), share + '%') +
      '</div>' +
    '</div>';
}

/* ---------- linha do tempo ---------- */
function timelineHTML(CW, w) {
  const rows = [
    { t: CW.t('uiTlValuation'), m: CW.money(w.mkt, true) + ' · ' + CW.t('uiTlValuationSub'), hot: true },
    { t: CW.t('uiTlAdded'), m: CW.fmtDate(w.date) },
    { t: CW.t('uiTlBought'), m: CW.money(w.paid, true) + ' · ' + CW.fmtDate(w.date) }
  ];
  return '<h2 class="sec">' + CW.t('uiTimeline') + '</h2>' +
    '<div class="card"><div class="ui-tl">' +
      rows.map(r =>
        '<div class="ui-tl-row">' +
          '<i class="' + (r.hot ? 'hot' : '') + '"></i>' +
          '<div><b>' + r.t + '</b><span>' + r.m + '</span></div>' +
        '</div>').join('') +
    '</div></div>';
}

/* ---------- entrada ---------- */
export function enhanceDetail(CW, watch) {
  const body = document.getElementById('dBody');
  if (!body || !watch) return;
  current = watch;
  if (body.dataset.uiFor !== watch.id) dRange = 'All';
  body.dataset.uiFor = watch.id;

  mountRail(CW, body);
  mountChips(CW, body, watch);
  mountRangePicker(CW, body, watch);

  if (!body.querySelector('.ui-detail-extra')) {
    const extra = document.createElement('div');
    extra.className = 'ui-detail-extra';
    const storyHead = [...body.querySelectorAll('h2.sec')].find(h => h.textContent === CW.t('secStory'));
    if (storyHead) body.insertBefore(extra, storyHead);
    else body.appendChild(extra);
  }
  body.querySelector('.ui-detail-extra').innerHTML =
    compositionHTML(CW, watch) + timelineHTML(CW, watch);
}

export function currentDetail() { return current; }
