/* =========================================================
   Community Watches — indicadores extras no Desempenho
   Envolve window.openPerformance: a lista por relógio continua
   sendo montada por main.js, isto só acrescenta um bloco no
   topo com indicadores que já existem na Home (hoje: alocação
   por categoria). Ponto único para novos indicadores relevantes.
   ========================================================= */

import { donut, PIE } from './charts.js';

function ensureMount(body) {
  let box = body.querySelector('#uiPerfIndicators');
  if (!box) {
    box = document.createElement('div');
    box.id = 'uiPerfIndicators';
    body.prepend(box);
  }
  return box;
}

function allocationHTML(CW, list) {
  const byCat = {};
  list.forEach(w => { (byCat[w.cat] = byCat[w.cat] || []).push(w); });
  const total = CW.totalMkt();
  const segs = Object.keys(byCat)
    .map(k => ({ name: k, value: byCat[k].reduce((s, w) => s + w.mkt, 0) }))
    .sort((a, b) => b.value - a.value)
    .map((s, i) => Object.assign(s, { color: PIE[i % PIE.length] }));

  return '<h2 class="sec">' + CW.t('uiAlloc') + '</h2>' +
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
}

/* ---------- botão "Ver detalhes" em cada card, mesma tela do detalhe refatorado ---------- */
function mountDetailButtons(CW, body) {
  body.querySelectorAll('.perfcard').forEach(card => {
    if (card.querySelector('.ui-perf-detail')) return;
    const m = (card.getAttribute('onclick') || '').match(/openDetail\('([^']+)'\)/);
    if (!m) return;
    const id = m[1];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'linkbtn ui-perf-detail';
    btn.textContent = CW.t('seeDetails');
    btn.addEventListener('click', e => { e.stopPropagation(); window.openDetail(id); });
    card.appendChild(btn);
  });
}

export function enhancePerformance(CW) {
  const body = document.getElementById('perfBody');
  if (!body) return;
  const box = ensureMount(body);
  const list = CW.active();
  if (!list.length) { box.innerHTML = ''; return; }

  box.innerHTML = allocationHTML(CW, list);

  box.querySelectorAll('[data-cat]').forEach(b =>
    b.addEventListener('click', () => window.filterBy('cat', b.dataset.cat)));

  mountDetailButtons(CW, body);
}
