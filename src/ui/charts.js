/* =========================================================
   Community Watches — geradores de SVG dos gráficos da UI
   Funções puras: entram números, sai string de SVG.
   Sem DOM, sem estado, sem dependência de main.js.
   ========================================================= */

let uid = 0;
const nextId = p => p + '_' + (++uid);

/* Linha de valorização com área preenchida.
   values: array de números (>= 2). Devolve { svg, first, last, delta } */
export function sparkline(values, opts = {}) {
  const w = opts.width || 348;
  const h = opts.height || 96;
  const pad = opts.pad == null ? 8 : opts.pad;
  const v = (values || []).filter(n => typeof n === 'number' && isFinite(n));
  if (v.length < 2) return { svg: '', first: 0, last: 0, delta: 0 };

  const min = Math.min.apply(null, v);
  const max = Math.max.apply(null, v);
  const span = (max - min) || 1;
  const px = i => +(pad + i * (w - pad * 2) / (v.length - 1)).toFixed(2);
  const py = n => +(h - pad - (n - min) / span * (h - pad * 2)).toFixed(2);

  const pts = v.map((n, i) => px(i) + ',' + py(n));
  const gid = nextId('cwGrad');
  const area = 'M' + px(0) + ' ' + py(v[0]) +
    v.map((n, i) => ' L' + px(i) + ' ' + py(n)).join('') +
    ' L' + px(v.length - 1) + ' ' + h + ' L' + px(0) + ' ' + h + ' Z';

  const grid = (opts.grid ? [0.28, 0.64] : [])
    .map(f => '<line x1="0" y1="' + (h * f).toFixed(1) + '" x2="' + w + '" y2="' + (h * f).toFixed(1) +
      '" stroke="var(--line)" stroke-width="1"/>').join('');

  const dots = opts.dots
    ? v.map((n, i) => '<circle cx="' + px(i) + '" cy="' + py(n) + '" r="2.6" fill="var(--gold-hi)"/>').join('')
    : '';

  const svg =
    '<svg class="ui-spark" viewBox="0 0 ' + w + ' ' + h + '" width="100%" height="' + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="var(--gold)" stop-opacity=".30"/>' +
        '<stop offset="1" stop-color="var(--gold)" stop-opacity="0"/>' +
      '</linearGradient></defs>' +
      grid +
      '<path d="' + area + '" fill="url(#' + gid + ')"/>' +
      '<polyline points="' + pts.join(' ') + '" fill="none" stroke="var(--gold)" stroke-width="2.4" ' +
        'stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>' +
      dots +
      '<circle cx="' + px(v.length - 1) + '" cy="' + py(v[v.length - 1]) + '" r="4" fill="var(--gold-hi)"/>' +
    '</svg>';

  return {
    svg,
    first: v[0],
    last: v[v.length - 1],
    delta: v[0] ? (v[v.length - 1] - v[0]) / v[0] * 100 : 0
  };
}

/* Rosca de participação.
   segments: [{ value, color, label }] — o cálculo de fatia é feito aqui. */
export function donut(segments, opts = {}) {
  const size = opts.size || 118;
  const thickness = opts.thickness || 15;
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  const total = (segments || []).reduce((s, x) => s + (x.value || 0), 0) || 1;

  let acc = 0;
  const rings = (segments || []).map(seg => {
    const len = (seg.value || 0) / total * circ;
    const ring = '<circle cx="' + c + '" cy="' + c + '" r="' + r.toFixed(2) + '" fill="none" ' +
      'stroke="' + seg.color + '" stroke-width="' + thickness + '" ' +
      'stroke-dasharray="' + len.toFixed(2) + ' ' + (circ - len).toFixed(2) + '" ' +
      'stroke-dashoffset="' + (-acc).toFixed(2) + '"/>';
    acc += len;
    return ring;
  }).join('');

  const center = opts.center
    ? '<text x="' + c + '" y="' + (c - 2) + '" text-anchor="middle" fill="var(--text)" ' +
        'font-size="' + (opts.centerSize || 19) + '" font-weight="900">' + opts.center + '</text>'
    : '';
  const sub = opts.sub
    ? '<text x="' + c + '" y="' + (c + 14) + '" text-anchor="middle" fill="var(--muted)" ' +
        'font-size="9" font-weight="800" letter-spacing="1.4">' + opts.sub + '</text>'
    : '';

  return '<svg class="ui-donut" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true">' +
    '<g transform="rotate(-90 ' + c + ' ' + c + ')">' +
      '<circle cx="' + c + '" cy="' + c + '" r="' + r.toFixed(2) + '" fill="none" stroke="var(--track)" stroke-width="' + thickness + '"/>' +
      rings +
    '</g>' + center + sub +
  '</svg>';
}

/* Percentual de cada fatia, já arredondado e somando 100. */
export function shares(values) {
  const total = values.reduce((s, v) => s + v, 0) || 1;
  return values.map(v => Math.round(v / total * 100));
}

/* Paleta das fatias — só dourados do design system, do mais claro ao mais fosco. */
export const PIE = ['#C9A227', '#EBD27C', '#8A7423', '#6B5613', '#4A4030'];
