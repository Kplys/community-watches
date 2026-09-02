/* =========================================================
   Community Watches — faixa de indicadores da Coleção
   Peças / Investido / Mercado, lida do estado existente.
   ========================================================= */

function ensureMount() {
  const screen = document.getElementById('s-coll');
  if (!screen) return null;
  let box = document.getElementById('uiCollStats');
  if (!box) {
    box = document.createElement('div');
    box.id = 'uiCollStats';
    const top = screen.querySelector('.top');
    if (top && top.nextSibling) screen.insertBefore(box, top.nextSibling);
    else screen.prepend(box);
  }
  return box;
}

export function renderCollStats(CW) {
  const box = ensureMount();
  if (!box) return;

  const list = CW.visible();
  if (!list.length) { box.innerHTML = ''; return; }

  const paid = list.reduce((s, w) => s + w.paid, 0);
  const mkt = list.reduce((s, w) => s + w.mkt, 0);
  const delta = paid ? (mkt - paid) / paid * 100 : 0;
  const cats = new Set(list.map(w => w.cat)).size;

  const cell = (lab, val, sub, cls) =>
    '<div class="ui-stat">' +
      '<div class="lab">' + lab + '</div>' +
      '<b>' + val + '</b>' +
      '<span class="' + (cls || 'ui-stat-sub') + '">' + sub + '</span>' +
    '</div>';

  box.innerHTML =
    '<div class="ui-stats">' +
      cell(CW.t('uiStatPieces'), list.length, cats + ' ' + CW.t('uiStatCats')) +
      cell(CW.t('uiStatInvested'), CW.money(paid, true), CW.t('uiStatLifetime')) +
      cell(CW.t('uiStatMarket'), CW.money(mkt, true),
        (delta >= 0 ? '+' : '') + delta.toFixed(1) + '%', delta >= 0 ? 'up' : 'down') +
    '</div>';
}
