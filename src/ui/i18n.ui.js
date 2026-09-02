/* =========================================================
   Community Watches — textos da UI refatorada (PT-BR / EN)
   Entram no mesmo dicionário T de main.js, então t('chave')
   e o data-i do HTML continuam funcionando sem mudança.
   ========================================================= */

export const UI_STRINGS = {
  pt: {
    /* card de valorização */
    uiValTitle: 'Valor da coleção',
    uiVal6M: '6M',
    uiVal1Y: '1A',
    uiValAll: 'Tudo',
    uiSince6M: 'nos últimos 6 meses',
    uiSince1Y: 'no último ano',
    uiSinceAll: 'desde a compra',
    uiInvested: 'Investido',

    /* ações rápidas */
    uiQuickCatalog: 'Catálogo',
    uiQuickAdd: 'Adicionar',
    uiQuickPerf: 'Desempenho',
    uiQuickJulios: 'Julios',

    /* alocação */
    uiAlloc: 'Alocação por categoria',
    uiPieces: 'PEÇAS',

    /* coleção */
    uiStatPieces: 'Peças',
    uiStatInvested: 'Investido',
    uiStatMarket: 'Mercado',
    uiStatCats: 'categorias',
    uiStatLifetime: 'histórico',

    /* detalhe */
    uiValHistory: 'Histórico de valorização',
    uiComposition: 'Composição do valor',
    uiCompInvested: 'Investido',
    uiCompGain: 'Valorização',
    uiCompLoss: 'Desvalorização',
    uiUpside: 'GANHO',
    uiYearsHeld: 'Anos na coleção',
    uiAnnualised: 'Ao ano',
    uiShareOfBox: 'Da coleção',
    uiTimeline: 'Linha do tempo',
    uiTlValuation: 'Valor de mercado atualizado',
    uiTlValuationSub: 'estimativa de mercado',
    uiTlAdded: 'Entrou na coleção',
    uiTlBought: 'Comprado',
    uiRailService: 'Registrar revisão',
    uiRailAsk: 'Perguntar ao Julios',
    uiRailAuth: 'Autenticar',
    uiServiceSaved: 'Revisão registrada',
    uiStrapMetal: 'Bracelete',
    uiStrapOther: 'Pulseira',

    /* dock */
    uiScan: 'Escanear relógio'
  },

  en: {
    uiValTitle: 'Collection value',
    uiVal6M: '6M',
    uiVal1Y: '1Y',
    uiValAll: 'All',
    uiSince6M: 'in the last 6 months',
    uiSince1Y: 'in the last year',
    uiSinceAll: 'since purchase',
    uiInvested: 'Invested',

    uiQuickCatalog: 'Catalogue',
    uiQuickAdd: 'Add piece',
    uiQuickPerf: 'Performance',
    uiQuickJulios: 'Julios',

    uiAlloc: 'Allocation by category',
    uiPieces: 'PIECES',

    uiStatPieces: 'Pieces',
    uiStatInvested: 'Invested',
    uiStatMarket: 'Market',
    uiStatCats: 'categories',
    uiStatLifetime: 'lifetime',

    uiValHistory: 'Valuation history',
    uiComposition: 'Value composition',
    uiCompInvested: 'Invested',
    uiCompGain: 'Appreciation',
    uiCompLoss: 'Depreciation',
    uiUpside: 'UPSIDE',
    uiYearsHeld: 'Years held',
    uiAnnualised: 'Annualised',
    uiShareOfBox: 'Share of box',
    uiTimeline: 'Ownership timeline',
    uiTlValuation: 'Valuation updated',
    uiTlValuationSub: 'market estimate',
    uiTlAdded: 'Added to the collection',
    uiTlBought: 'Acquired',
    uiRailService: 'Log a service',
    uiRailAsk: 'Ask Julios',
    uiRailAuth: 'Authenticate',
    uiServiceSaved: 'Service record added',
    uiStrapMetal: 'Bracelet',
    uiStrapOther: 'Strap',

    uiScan: 'Scan a watch'
  }
};

/* Injeta as chaves novas no dicionário existente, sem sobrescrever nada. */
export function installStrings(T) {
  if (!T) return;
  ['pt', 'en'].forEach(lang => {
    if (!T[lang]) return;
    Object.keys(UI_STRINGS[lang]).forEach(k => {
      if (T[lang][k] === undefined) T[lang][k] = UI_STRINGS[lang][k];
    });
  });
}
