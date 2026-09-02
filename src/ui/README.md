# Camada de UI refatorada — `src/ui/`

Módulos novos e isolados. Nada de estado, rotas, three.js ou handlers foi movido:
`main.js` continua sendo o dono da lógica; estes arquivos só desenham.

## Arquivos

| Arquivo | O que faz |
| --- | --- |
| `charts.js` | Geradores puros de SVG: `sparkline()`, `donut()`, `shares()`, paleta `PIE`. Sem DOM. |
| `i18n.ui.js` | Textos PT-BR/EN das seções novas + `installStrings(T)`, que injeta as chaves no dicionário `T` existente sem sobrescrever nada. |
| `dock.ui.js` | Move o escanear do topo da Home para o orbe central, encaixado no recorte da pílula de abas. |
| `home.ui.js` | Card de valorização (linha + período), faixa de ações rápidas, rosca de alocação por categoria. |
| `collection.ui.js` | Faixa Peças / Investido / Mercado no topo da Coleção. |
| `detail.ui.js` | No detalhe: rail de ações sobre o slot 3D, seletor de período no gráfico existente, rosca de composição do valor, três indicadores e linha do tempo. |
| `refactor.css` | Estilos das seções novas. Só `var(--…)` do design system — o tema claro continua funcionando. |
| `index.js` | Entrada: instala textos, monta o orbe, desenha e envolve as funções de `main.js` que mudam números na tela. |

Os pontos de montagem (`#uiValuation`, `#uiQuick`, `#uiAlloc`, `#uiCollStats`) são criados
por JS, seguindo o padrão `ensureSheet()` / `ensurePerfSheet()` que já existe em `main.js`.
Por isso o `index.html` muda em uma linha só.

## Duas alterações no código existente

### 1. `index.html` — carregar a camada depois do main

```html
<script type="module" src="/src/main.js"></script>
<script type="module" src="/src/ui/index.js"></script>
```

### 2. `src/main.js` — publicar a ponte de leitura

Tudo em `main.js` roda dentro de uma IIFE, então os helpers não são visíveis de fora.
Imediatamente **antes** do `Object.assign(window, { … })` que já existe no fim do arquivo,
acrescente:

```js
  /* ponte de leitura para a camada de UI (src/ui) — apenas leitura */
  window.CW = {
    S, T, t,
    WATCHES, CATALOG,
    active, visible,
    money, moneyAlt, totalPaid, totalMkt,
    history, fmtDate, pic, toast, drawLine
  };
```

Nada é reatribuído e nenhuma função existente muda de assinatura.

## O que a camada envolve (wrap)

`index.js` envolve, no `window`, as funções que já existem e que alteram números na tela:
`setCur`, `setLang`, `togglePriv`, `toggleDemo`, `toggleHide`, `setSort`, `filterBy`,
`clearFilter`, `toggleGrail`, `addGrail`, `setTheme` e `openDetail`.
O comportamento original roda primeiro e o retorno é preservado; só depois as seções novas
são redesenhadas. Remover a linha do `index.html` desativa a camada inteira sem efeito colateral.

## Por que a dock não quebra

- `syncTabInd()` mede `.tab.on` por geometria real, então o espaçador `.ui-tabgap` no meio da
  pílula é lido corretamente.
- `go()` indexa apenas elementos `.tab`; o espaçador não tem essa classe e não entra na conta.
- O recorte do orbe é uma `mask-image` no `#tabs` — nenhum filho é reposicionado.
