/* =========================================================
   Community Watches — entrada da camada de UI refatorada
   Carregado depois de /src/main.js. Só desenha: estado,
   rotas, three.js e handlers continuam em main.js.

   Depende de window.CW, publicado por main.js (ver README).
   ========================================================= */

import './refactor.css';
import { installStrings } from './i18n.ui.js';
import { mountScanOrb, refreshScanOrb } from './dock.ui.js';
import { renderHomeUI } from './home.ui.js';
import { renderCollStats } from './collection.ui.js';
import { enhanceDetail } from './detail.ui.js';

/* funções de main.js que, ao rodar, mudam números na tela */
const REDRAW_AFTER = [
  'setCur', 'setLang', 'togglePriv', 'toggleDemo', 'toggleHide',
  'setSort', 'filterBy', 'clearFilter', 'toggleGrail', 'addGrail', 'setTheme'
];

function wrap(name, after) {
  const original = window[name];
  if (typeof original !== 'function' || original.__uiWrapped) return;
  const patched = function () {
    const out = original.apply(this, arguments);
    try { after.apply(this, arguments); } catch (e) { console.warn('[ui]', name, e); }
    return out;
  };
  patched.__uiWrapped = true;
  window[name] = patched;
}

function renderUI(CW) {
  renderHomeUI(CW);
  renderCollStats(CW);
  refreshScanOrb(CW);
}

function boot() {
  const CW = window.CW;
  if (!CW) {
    console.warn('[ui] window.CW ausente — main.js precisa publicar a ponte de leitura.');
    return;
  }

  installStrings(CW.T);
  mountScanOrb(CW);
  try { renderUI(CW); } catch (e) { console.warn('[ui] renderUI', e); }

  REDRAW_AFTER.forEach(n => wrap(n, () => renderUI(CW)));

  /* detalhe: o corpo é montado por main.js e recebe as seções novas depois */
  wrap('openDetail', function (id, override) {
    const w = override || CW.WATCHES.find(x => x.id === id);
    enhanceDetail(CW, w);
  });

  /* o idioma troca o dicionário inteiro; redesenha tudo o que é nosso */
  wrap('setLang', () => renderUI(CW));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
