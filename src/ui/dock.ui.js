/* =========================================================
   Community Watches — dock com o orbe de escanear
   O botão de escanear sai do topo da Home e desce para o
   centro da barra, encaixado num recorte da pílula de abas.

   Não altera #tabs por dentro além de um espaçador inerte:
   syncTabInd() mede .tab.on por geometria real e go() indexa
   apenas elementos .tab, então a navegação segue intacta.
   ========================================================= */

const SCAN_SVG =
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--on-gold)" ' +
  'stroke-width="2.2" stroke-linecap="round" aria-hidden="true">' +
  '<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/>' +
  '<circle cx="12" cy="12" r="3.2"/></svg>';

export function mountScanOrb(CW) {
  const dock = document.getElementById('dock');
  const tabs = document.getElementById('tabs');
  if (!dock || !tabs || document.getElementById('scanOrb')) return;

  /* espaçador central: abre espaço para o recorte, sem virar uma aba */
  const tabList = tabs.querySelectorAll('.tab');
  if (tabList.length >= 4 && !tabs.querySelector('.ui-tabgap')) {
    const gap = document.createElement('div');
    gap.className = 'ui-tabgap';
    gap.setAttribute('aria-hidden', 'true');
    tabs.insertBefore(gap, tabList[2]);
  }

  /* trilho de altura zero logo acima da pílula: o orbe fica centrado na borda */
  const slot = document.createElement('div');
  slot.className = 'ui-orbslot';
  slot.innerHTML =
    '<button type="button" id="scanOrb" class="ui-orb" aria-label="' + CW.t('uiScan') + '">' +
    SCAN_SVG + '</button>';
  dock.insertBefore(slot, tabs);

  slot.querySelector('#scanOrb').addEventListener('click', () => window.openScan());
  dock.classList.add('ui-has-orb');

  /* o botão de escanear do topo da Home vira redundante */
  const homeTop = document.querySelector('#s-home .top .iconbtn');
  if (homeTop) homeTop.classList.add('ui-hide');

  if (typeof window.syncTabInd === 'function') window.syncTabInd(false);

  /* a fonte do Google Fonts carrega depois do primeiro layout (display=swap) e muda
     a largura dos rótulos das abas; sem isto a pílula fica com o tamanho errado
     por um instante, até o usuário trocar de aba */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (typeof window.syncTabInd === 'function') window.syncTabInd(false);
    });
  }
}

/* Rótulo do orbe acompanha a troca de idioma. */
export function refreshScanOrb(CW) {
  const orb = document.getElementById('scanOrb');
  if (orb) orb.setAttribute('aria-label', CW.t('uiScan'));
}
