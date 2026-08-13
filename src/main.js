import * as THREE from 'three';
window.THREE = THREE;

/* =========================================================
   DADOS
   ========================================================= */
const USD = 5.45;

const CAT = ['Dress','Diver','Chronograph','GMT','Field','Sport','Fun','Vintage'];

const WATCHES = [
  {id:'w1', brand:'Rolex', model:'Submariner Date', ref:'126610LN', year:2021, cat:'Diver', paid:62000, date:'2021-03-14',
   mkt:78500, dial:'#0B0B0D', bezel:'#111114', metal:'#B9BCC2', strap:'metal', papers:true, img:'/watches/w1.png',
   pt:'O Submariner Date de 2020 em diante trouxe caixa de 41 mm e o calibre 3235, com 70 horas de reserva. É o relógio que definiu o que um mergulhador deveria ser: em 1953 a Rolex apresentou o primeiro relógio de pulso garantido a 100 metros, e a linguagem visual — bezel graduado, ponteiros Mercedes, índices luminosos generosos — virou gramática comum de toda a indústria. Esta referência corrigiu a queixa mais ouvida sobre a geração anterior: as alças finalmente ficaram proporcionais à caixa.',
   en:'From 2020 onward the Submariner Date grew to a 41 mm case and the 3235 calibre, with 70 hours of reserve. This is the watch that defined what a diver should be: in 1953 Rolex introduced the first wristwatch guaranteed to 100 metres, and its visual language — graduated bezel, Mercedes hands, generous lume — became the common grammar of the whole industry. This reference fixed the loudest complaint about the previous generation: the lugs are finally proportional to the case.'},

  {id:'w2', brand:'Omega', model:'Speedmaster Professional', ref:'310.30.42', year:2019, cat:'Chronograph', paid:32000, date:'2019-08-02',
   mkt:41900, dial:'#0A0A0C', bezel:'#131318', metal:'#B4B7BD', strap:'metal', papers:true, img:'/watches/w2.png',
   pt:'Certificado pela NASA para todas as missões tripuladas em 1965 e no pulso de Buzz Aldrin quando ele desceu à superfície lunar. O que quase ninguém comenta é que o cronógrafo foi usado como instrumento de emergência na Apollo 13: sem computador de bordo, a tripulação cronometrou manualmente uma queima de 14 segundos que corrigiu a rota de reentrada. O movimento continua de corda manual, com roda de colunas — uma decisão de projeto que a Omega se recusa a abandonar.',
   en:'NASA-qualified for all manned missions in 1965 and on Buzz Aldrin\'s wrist on the lunar surface. What rarely gets mentioned is that the chronograph served as an emergency instrument on Apollo 13: with the guidance computer down, the crew manually timed a 14-second burn that corrected their re-entry path. The movement is still hand-wound, with a column wheel — a design decision Omega refuses to abandon.'},

  {id:'w3', brand:'Tudor', model:'Black Bay Fifty-Eight', ref:'79030N', year:2022, cat:'Diver', paid:28500, date:'2022-11-20',
   mkt:31200, dial:'#0C0C0F', bezel:'#101014', metal:'#AFB2B8', strap:'metal', papers:false, img:'/watches/w3.png',
   pt:'O 58 do nome é 1958, ano da referência 7924, o primeiro Tudor com 200 metros de estanqueidade. A caixa de 39 mm e 11,9 mm de espessura foi a resposta direta ao público que achava a linha Black Bay grande demais — e virou o relógio que reposicionou a marca inteira. O calibre MT5402 é próprio, com espiral em silício e certificação COSC. É o argumento mais forte de que herança e preço acessível podem coexistir.',
   en:'The 58 stands for 1958, the year of reference 7924, the first Tudor waterproof to 200 metres. The 39 mm case, 11.9 mm thick, answered everyone who found the Black Bay line too large — and became the watch that repositioned the entire brand. The MT5402 is in-house, with a silicon hairspring and COSC certification. It is the strongest argument that heritage and accessible pricing can coexist.'},

  {id:'w4', brand:'Cartier', model:'Tank Must', ref:'WSTA0041', year:2023, cat:'Dress', paid:19800, date:'2023-05-09',
   mkt:21400, dial:'#EFEDE6', bezel:'#C9C6BE', metal:'#C6C3BB', strap:'leather', strapColor:'#1A1A1D', papers:true, img:'/watches/w4.png',
   pt:'Louis Cartier desenhou o Tank em 1917 inspirado na vista superior dos tanques Renault FT que cruzavam a frente ocidental: as brancards laterais são as esteiras, o mostrador é o compartimento da tripulação. Foi um dos primeiros relógios de pulso pensados como objeto de design, não como instrumento reduzido. O Must nasceu nos anos 1970 como a porta de entrada da marca, e a versão atual mantém os algarismos romanos, o trilho ferroviário dos minutos e a cabochão azul na coroa.',
   en:'Louis Cartier drew the Tank in 1917 after the overhead view of the Renault FT tanks crossing the Western Front: the side brancards are the treads, the dial is the crew compartment. It was among the first wristwatches conceived as a design object rather than a shrunken instrument. The Must line began in the 1970s as the brand\'s entry point, and today\'s version keeps the Roman numerals, the railway minute track and the blue cabochon on the crown.'},

  {id:'w5', brand:'Seiko', model:'SKX007', ref:'7S26-0020', year:1998, cat:'Diver', paid:1900, date:'2018-02-11',
   mkt:3600, dial:'#0A0A0C', bezel:'#131317', metal:'#A9ACB2', strap:'rubber', strapColor:'#151518', papers:false, img:'/watches/w5.png',
   pt:'Descontinuado em 2019, e foi justamente aí que o preço subiu. O SKX é o relógio que ensinou uma geração inteira a gostar de relojoaria mecânica: 200 metros reais, certificação ISO de mergulho, calibre 7S26 sem corda manual nem parada de segundos — bruto de propósito. É provavelmente a peça mais modificada da história: existe uma indústria inteira de mostradores, bezéis e cristais de safira feitos só para ele.',
   en:'Discontinued in 2019, which is exactly when prices climbed. The SKX taught a whole generation to love mechanical watches: a real 200 metres, ISO dive certification, and the 7S26 calibre with no handwinding and no hacking — deliberately crude. It is probably the most modified watch in history: an entire industry of dials, bezels and sapphire crystals exists only for this reference.'},

  {id:'w6', brand:'Tissot', model:'PRX Powermatic 80', ref:'T137.407', year:2023, cat:'Sport', paid:4200, date:'2023-09-01',
   mkt:4050, dial:'#12315E', bezel:'#B9BCC2', metal:'#BCBFC5', strap:'metal', papers:true, img:'/watches/w6.png',
   pt:'O desenho vem de 1978, quando a Tissot lançou um quartzo de caixa e pulseira integradas na esteira do Royal Oak e do Nautilus. O relançamento de 2021 acertou algo que a indústria vinha errando: entregou a estética integrada com 80 horas de reserva de marcha por um preço de quatro dígitos. É o relógio que mais aparece como primeira compra mecânica de quem entra no hobby hoje.',
   en:'The design dates to 1978, when Tissot released an integrated-bracelet quartz in the wake of the Royal Oak and the Nautilus. The 2021 revival got something the industry kept missing: integrated looks with 80 hours of power reserve at a four-figure price. It is the watch that most often shows up as a newcomer\'s first mechanical purchase.'},

  {id:'w7', brand:'Omega', model:'Seamaster 300', ref:'165.024', year:1966, cat:'Vintage', paid:24000, date:'2020-06-18',
   mkt:39000, dial:'#141013', bezel:'#1A1418', metal:'#AEB0B4', strap:'leather', strapColor:'#4A3520', papers:false, img:'/watches/w7.png',
   pt:'A geração 165.024 é a que foi entregue ao Serviço Aéreo Especial britânico, com marcações de emissão militar nas peças originais. O mostrador desta unidade envelheceu para um marrom tropical, resultado de décadas de luz sobre um verniz de base preta — um defeito de conservação que o mercado passou a tratar como valorização. Calibre 552, sem data, com ponteiros espada preenchidos de material luminoso que hoje aparece bege.',
   en:'The 165.024 generation is the one issued to the British Special Air Service, with military markings on original examples. This dial has aged to tropical brown, the result of decades of light on a black lacquer base — a conservation flaw the market decided to treat as an asset. Calibre 552, no date, with sword hands filled with lume that now reads bege.'},

  {id:'w8', brand:'Orient', model:'Bambino V4', ref:'FAC08', year:2024, cat:'Dress', paid:1450, date:'2024-01-27',
   mkt:1500, dial:'#F3EFE4', bezel:'#C8B98E', metal:'#C8B98E', strap:'leather', strapColor:'#5A3A22', papers:true, img:'/watches/w8.png',
   pt:'A Orient é subsidiária da Seiko desde 2017 e opera como o laboratório de mecânica acessível do grupo. A quarta geração do Bambino trocou o mostrador aplicado por índices finos e reduziu a caixa para 40,5 mm. O calibre F6724 é automático com corda manual e parada de segundos — recursos que faltam em relógios que custam três vezes mais. Existe para provar que mostrador domado e cristal abaulado não precisam ser caros.',
   en:'Orient has been a Seiko subsidiary since 2017 and works as the group\'s accessible-mechanics lab. The fourth-generation Bambino swapped applied markers for thin indices and trimmed the case to 40.5 mm. The F6724 calibre is automatic with handwinding and hacking — features missing from watches costing three times as much. It exists to prove that a restrained dial and a domed crystal need not be expensive.'}
];

const CATALOG = [
  {brand:'Patek Philippe', model:'Nautilus 5711/1A', mkt:6200000, cat:'Sport', img:'/watches/cat1.webp'},
  {brand:'Audemars Piguet', model:'Royal Oak 15510ST', mkt:1450000, cat:'Sport', img:'/watches/cat2.webp'},
  {brand:'Rolex', model:'Daytona 126500LN', mkt:280000, cat:'Chronograph', img:'/watches/cat3.webp'},
  {brand:'Rolex', model:'GMT-Master II 126710BLRO', mkt:195000, cat:'GMT', img:'/watches/cat4.webp'},
  {brand:'Omega', model:'Seamaster Diver 300M', mkt:38000, cat:'Diver', img:'/watches/cat5.webp'},
  {brand:'Grand Seiko', model:'SBGA211 Snowflake', mkt:42000, cat:'Dress', img:'/watches/cat6.webp'},
  {brand:'IWC', model:'Mark XX', mkt:36000, cat:'Field', img:'/watches/cat7.webp'},
  {brand:'Cartier', model:'Santos de Cartier', mkt:52000, cat:'Dress', img:'/watches/cat8.webp'},
  {brand:'Swatch x Omega', model:'MoonSwatch Mission to the Moon', mkt:2400, cat:'Fun', img:'/watches/cat9.webp'},
  {brand:'Casio', model:'G-Shock GA-2100', mkt:800, cat:'Fun', img:'/watches/cat10.webp'},
  {brand:'Tudor', model:'Pelagos 39', mkt:33000, cat:'Diver', img:'/watches/cat11.webp'},
  {brand:'Seiko', model:'Alpinist SPB121', mkt:6900, cat:'Field', img:'/watches/cat12.webp'}
];

let GRAILS = [
  {brand:'Rolex', model:'Daytona 126500LN', mkt:280000, img:'/watches/cat3.webp'},
  {brand:'Audemars Piguet', model:'Royal Oak 15510ST', mkt:1450000, img:'/watches/cat2.webp'}
];

const NEWS = [
  {
    id: 'n1',
    tag: 'Lançamento',
    title: 'Rolex divulga novidades e atualizações em modelos icônicos',
    desc: 'A marca apresentou variações em ligas metálicas exclusivas e novos mostradores para a temporada.',
    source: 'Hodinkee',
    time: 'Há 2 horas'
  },
  {
    id: 'n2',
    tag: 'Mercado',
    title: 'Alta demanda impulsiona valorização de relógios clássicos',
    desc: 'Relatórios recentes mostram aumento significativo na procura por peças vintage dos anos 60 e 70.',
    source: 'Revolution Watch',
    time: 'Há 5 horas'
  },
  {
    id: 'n3',
    tag: 'Inovação',
    title: 'Avanços em calibres automáticos aumentam reserva de marcha',
    desc: 'Mecanismos modernos priorizam maior autonomia e resistência a campos magnéticos intensos.',
    source: 'Fratello Watches',
    time: 'Há 1 dia'
  }
];

const MEMBERS = [
  {u:'@leo.horology', n:'Leonardo M.', i:'LM', g:'#EBD27C,#8A7423', priv:false,
   owns:['w1','w2','w3','w4','w7'], city:'São Paulo'},
  {u:'@vintage.sp', n:'Marina T.', i:'MT', g:'#9BB7D4,#3B5876', priv:true,
   owns:['w7','w5','w2'], city:'Campinas'},
  {u:'@carioca.time', n:'Diego P.', i:'DP', g:'#D9A08C,#7A4636', priv:false,
   owns:['w6','w8','w3','w1'], city:'Rio de Janeiro'},
  {u:'@seiko.club.br', n:'Ana R.', i:'AR', g:'#A8C9A0,#456B47', priv:false,
   owns:['w5','w6','w8'], city:'Natal'},
  {u:'@tropical.dials', n:'Bruno L.', i:'BL', g:'#C9A6D4,#5A3B67', priv:false,
   owns:['w7','w2','w1','w5'], city:'Recife'},
  {u:'@quartz.era', n:'Helena F.', i:'HF', g:'#D4C39B,#6B5A2E', priv:true,
   owns:['w6','w8'], city:'Porto Alegre'}
];
const ownedBy = m => m.owns.map(id=>WATCHES.find(w=>w.id===id)).filter(Boolean);

const REVIEWS = [
  {u:'@leo.horology', w:'Tudor Black Bay 58', s:5,
   pt:'Seis meses de uso diário e nenhum arranhão preocupante. A pulseira é o ponto fraco: sem micro-ajuste, num dia quente ela fica curta. Fora isso, é o tamanho que eu queria que o Submariner tivesse.',
   en:'Six months of daily wear and no scratch worth worrying about. The bracelet is the weak point: no micro-adjust, so on a hot day it runs short. Otherwise it is the size I wish the Submariner were.'},
  {u:'@vintage.sp', w:'Omega Seamaster 300 165.024', s:4,
   pt:'Comprei sem papéis e levei para revisão antes de usar. Adiantava 12 segundos por dia; depois do ajuste, três. Mostrador tropical é lindo mas some com o contraste dos ponteiros à noite.',
   en:'Bought without papers and serviced it before wearing. It ran 12 seconds fast per day; after regulation, three. The tropical dial is beautiful but it kills hand contrast at night.'},
  {u:'@seiko.club.br', w:'Seiko SKX007', s:5,
   pt:'Meu primeiro automático, comprei em 2016 e nunca abri. Já caiu no chão duas vezes. Continua funcionando. Não é preciso, é indestrutível — e para o preço da época, era roubo.',
   en:'My first automatic, bought in 2016 and never opened. It has hit the floor twice. Still running. It is not accurate, it is indestructible — and at the price back then it was a steal.'}
];

/* =========================================================
   ESTADO + i18n
   ========================================================= */
let S = {lang:'pt', cur:'BRL', priv:false, demo:true, sort:'recent', year:2023, hidden:new Set(), friends:new Set(), filter:null,
         req:{}, viewing:null};

/* logo — caixa isométrica em linha, igual à identidade da marca */
/* marca oficial em PNG, fundo transparente; o wordmark segue em texto */
const LOGO_BOX = 'data:image/png;base64,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';
const LOGO_SVG = `<img class="logo-box" src="${LOGO_BOX}" alt="">`;

const T = {
 pt:{searchPh:'Buscar relógios no catálogo',kPieces:'Peças',kMarket:'Valor de mercado',heroT:'Abrir minha caixa',
  heroS:'Veja a coleção em 3D',secGrails:'Grails',secGrailsSub:'Ver seus grails',secSpend:'Gastos por mês',tabHome:'Home',tabColl:'Coleção',
  tabComm:'Comunidade',tabProf:'Perfil',cMembers:'Colecionadores',cReviews:'Reviews',secPrefs:'Preferências',
  prefLang:'Idioma',prefLangS:'Interface do app',prefCur:'Moeda principal',prefCurS:'A outra aparece abaixo',
  prefPriv:'Modo privacidade',prefPrivS:'Esconde valores no seu perfil público',prefDemo:'Coleção de demonstração',
  prefDemoS:'Desligue para ver o app vazio',resetView:'Reposicionar',openDrawer:'Abrir gaveta',closeDrawer:'Fechar gaveta',
  seeDetails:'Ver detalhes',catTitle:'Catálogo',scanHint:'Centralize o relógio no círculo',scanNow:'Identificar relógio',
  juliosRole:'Curador da sua coleção',juliosPh:'Pergunte ao Julios sobre sua coleção',
  memberSince:'Membro desde março de 2021',bio:'Colecionador em Natal. Gosto de mergulhadores dos anos 60 e de qualquer coisa com mostrador tropical. Troco, não vendo.',
  hiddenNote:'Peças ocultas continuam no total e no valor da coleção, mas não aparecem na caixa 3D.',
  protoNote:'Protótipo local. Nada é enviado para servidor — o login com idioma, usuário, e-mail e senha entra na versão com sincronização.',
  paid:'Pago',market:'Mercado',cats:'categorias',recent:'Recentes',value:'Valor',brand:'Marca',oldest:'Mais antigos',
  detRef:'Referência',detYear:'Ano',detCat:'Categoria',detPaid:'Valor pago',detDate:'Data da compra',detPapers:'Caixa e documentos',
  yes:'Declarado pelo dono',no:'Não informado',secStory:'A história',secPerf:'Desempenho',secModel:'Modelo 3D',
  modelSlot:'Espaço do modelo Sketchfab',addGrail:'Adicionar aos Grails',hideW:'Ocultar da caixa',showW:'Mostrar na caixa',
  identified:'Identificado',conf:'confiança',notSure:'Não é este relógio?',editRef:'Informar a referência manualmente',
  addToColl:'Adicionar à coleção',scanning:'Lendo a caixa e o mostrador…',noData:'Sem dados de mercado para esta referência',
  noDataSub:'Nossa equipe vai analisar as fotos e atualizar o catálogo. Você recebe um aviso quando o histórico estiver disponível.',
  emptyT:'Sua caixa está vazia',emptyS:'Escaneie o primeiro relógio para começar a montar a coleção.',
  emptyGrails:'Sua lista de Grails está vazia.',
  scanFirst:'Escanear meu primeiro relógio',tapEmpty:'Toque num espaço vazio para escanear',
  drag:'Arraste para girar · toque num relógio',mkt12:'Mercado nos últimos 12 meses',since:'desde a compra',
  friendAdd:'Adicionar',friendOk:'Amigos',pieces:'peças',ownerOf:'Coleção de',added:'Adicionado aos Grails',removed:'Removido dos Grails',
  hidden:'Relógio oculto da caixa',shown:'Relógio de volta na caixa',confirmQ:'Julios quer fazer isso:',
  yesDo:'Confirmar',noDo:'Agora não',done:'Feito',
  secProfile:'Perfil da coleção',secAdded:'Peças adicionadas por mês',secActivity:'Atividade recente',secNews:'Notícias da Relojoaria',
  spotCat:'Categoria com mais peças',spotBrand:'Marca com mais peças',seeWatches:'Ver relógios',
  ofColl:'da coleção',tieNote:'desempate pelo maior valor',clearFilter:'Limpar filtro',
  filtering:'Mostrando',addedIn:'em',pieceIn:'peça adicionada',piecesIn:'peças adicionadas',
  actAdded:'entrou na coleção',actUp:'subiu no mercado',actGrail:'virou Grail',actFriend:'começou a seguir você',
  noAct:'Nada por aqui ainda. A primeira peça escaneada abre esta linha do tempo.',
  goColl:'Ir pra minha coleção',owned:'Na coleção',catEmpty:'Nenhum relógio encontrado com esse nome.',seeHistory:'Ver histórico',histTitle:'Histórico de atividade',
  pinch:'Pinça para aproximar · arraste para girar',
  findPh:'Buscar colecionador por nome ou @',noMember:'Nenhum colecionador com esse nome.',
  askAccess:'Pedir acesso',pending:'Aguardando',seeColl:'Ver coleção',
  nowFriends:'Amigo adicionado',reqSent:'Pedido enviado ao dono da coleção',
  reqOk:'Acesso liberado. A coleção já pode ser vista.',
  openTheirBox:'Abrir a caixa dele em 3D',privOn:'Este colecionador mantém os valores privados. As peças aparecem, os preços não.',welcome:'Oi, Rafa. Sua coleção tem 8 peças e valorizou 26% desde a compra. Posso separar por categoria, avaliar uma peça ou sugerir a próxima compra dentro de uma faixa de preço.'},
 en:{searchPh:'Search watches in the catalogue',kPieces:'Pieces',kMarket:'Market value',heroT:'Open my box',
  heroS:'See the collection in 3D',secGrails:'Grails',secGrailsSub:'See your grails',secSpend:'Spending by month',tabHome:'Home',tabColl:'Collection',
  tabComm:'Community',tabProf:'Profile',cMembers:'Collectors',cReviews:'Reviews',secPrefs:'Preferences',
  prefLang:'Language',prefLangS:'App interface',prefCur:'Main currency',prefCurS:'The other one shows below',
  prefPriv:'Privacy mode',prefPrivS:'Hides values on your public profile',prefDemo:'Demo collection',
  prefDemoS:'Turn off to see the empty app',resetView:'Reset view',openDrawer:'Open drawer',closeDrawer:'Close drawer',
  seeDetails:'See details',catTitle:'Catalogue',scanHint:'Centre the watch in the circle',scanNow:'Identify watch',
  juliosRole:'Curator of your collection',juliosPh:'Ask Julios about your collection',
  memberSince:'Member since March 2021',bio:'Collector in Natal, Brazil. Into 1960s divers and anything with a tropical dial. I trade, I do not sell.',
  hiddenNote:'Hidden pieces still count towards your total and value, but they do not appear in the 3D box.',
  protoNote:'Local prototype. Nothing leaves your device — the language, username, e-mail and password sign-in arrives with cloud sync.',
  paid:'Paid',market:'Market',cats:'categories',recent:'Recent',value:'Value',brand:'Brand',oldest:'Oldest',
  detRef:'Reference',detYear:'Year',detCat:'Category',detPaid:'Price paid',detDate:'Purchase date',detPapers:'Box and papers',
  yes:'Declared by the owner',no:'Not provided',secStory:'The story',secPerf:'Performance',secModel:'3D model',
  modelSlot:'Sketchfab model slot',addGrail:'Add to Grails',hideW:'Hide from box',showW:'Show in box',
  identified:'Identified',conf:'confidence',notSure:'Not this watch?',editRef:'Enter the reference manually',
  addToColl:'Add to collection',scanning:'Reading the case and dial…',noData:'No market data for this reference',
  noDataSub:'Our team will review your photos and update the catalogue. You will be notified when the history is ready.',
  emptyT:'Your box is empty',emptyS:'Scan your first watch to start building the collection.',
  emptyGrails:'Your Grails list is empty.',
  scanFirst:'Scan my first watch',tapEmpty:'Tap an empty slot to scan',
  drag:'Drag to rotate · tap a watch',mkt12:'Market over the last 12 months',since:'since purchase',
  friendAdd:'Add',friendOk:'Friends',pieces:'pieces',ownerOf:'Collection of',added:'Added to Grails',removed:'Removed from Grails',
  hidden:'Watch hidden from the box',shown:'Watch back in the box',confirmQ:'Julios wants to do this:',
  yesDo:'Confirm',noDo:'Not now',done:'Done',
  secProfile:'Collection profile',secAdded:'Pieces added by month',secActivity:'Recent activity',secNews:'Watch News',
  spotCat:'Category with most pieces',spotBrand:'Brand with most pieces',seeWatches:'See watches',
  ofColl:'of the collection',tieNote:'ties broken by highest value',clearFilter:'Clear filter',
  filtering:'Showing',addedIn:'in',pieceIn:'piece added',piecesIn:'pieces added',
  actAdded:'joined the collection',actUp:'climbed on the market',actGrail:'became a Grail',actFriend:'started following you',
  noAct:'Nothing here yet. Your first scan opens this timeline.',
  goColl:'Go to my collection',owned:'Owned',catEmpty:'No watch found with that name.',seeHistory:'See history',histTitle:'Activity history',
  pinch:'Pinch to zoom · drag to rotate',
  findPh:'Find a collector by name or @',noMember:'No collector by that name.',
  askAccess:'Ask for access',pending:'Waiting',seeColl:'See collection',
  nowFriends:'Friend added',reqSent:'Request sent to the collection owner',
  reqOk:'Access granted. The collection is open.',
  openTheirBox:'Open their box in 3D',privOn:'This collector keeps values private. The pieces show, the prices do not.',welcome:'Hi Rafa. Your collection holds 8 pieces and is up 26% since purchase. I can sort by category, value a piece, or suggest your next buy within a price range.'}
};
const t = k => (T[S.lang][k] ?? k);

/* =========================================================
   HELPERS
   ========================================================= */
const active = () => S.demo ? WATCHES : [];
const visible = () => S.viewing ? ownedBy(S.viewing) : active().filter(w=>!S.hidden.has(w.id));

function money(brl, forcePrimary){
  if(S.priv && !forcePrimary) return '••••';
  if(S.cur==='BRL') return 'R$ ' + brl.toLocaleString('pt-BR',{maximumFractionDigits:0});
  return 'US$ ' + Math.round(brl/USD).toLocaleString('en-US');
}
function moneyAlt(brl){
  if(S.priv) return '';
  if(S.cur==='BRL') return 'US$ ' + Math.round(brl/USD).toLocaleString('en-US');
  return 'R$ ' + brl.toLocaleString('pt-BR',{maximumFractionDigits:0});
}
const totalPaid = () => active().reduce((s,w)=>s+w.paid,0);
const totalMkt  = () => active().reduce((s,w)=>s+w.mkt,0);

function toast(msg){ const e=document.getElementById('toast'); e.textContent=msg; e.classList.add('on');
  clearTimeout(e._t); e._t=setTimeout(()=>e.classList.remove('on'),1900); }

/* histórico de mercado determinístico (36 meses) */
function history(w){
  const out=[]; let seed = (w.ref||w.model).split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  const rnd = ()=> (seed = (seed*9301+49297)%233280)/233280;
  const growth = Math.pow((w.mkt||1000)/(w.paid||1000), 1/36);
  let v = w.paid||w.mkt||1000;
  for(let i=0;i<36;i++){ v = v*growth*(0.985+rnd()*0.03); out.push(v); }
  out[35]=w.mkt||v; return out;
}

/* miniatura com fallback SVG embutido */
function pic(w, size){
  const s = size || 52;
  const svg = getSvgPic(w, s);
  if(w && w.img){
    return `<div style="position:relative;width:${s}px;height:${s}px;display:flex;align-items:center;justify-content:center;">
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">${svg}</div>
      <img src="${w.img}" alt="${w.model||''}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:transparent;border-radius:12px;" onerror="this.style.display='none';">
    </div>`;
  }
  return svg;
}

function getSvgPic(w, s){
  const isRect = ((w&&w.model)||'').includes('Tank');
  const dialC = (w&&w.dial) || '#0B0B0D';
  const metalC = (w&&w.metal) || '#B9BCC2';
  const bezelC = (w&&w.bezel) || '#111114';
  const face = isRect
    ? `<rect x="17" y="12" width="26" height="36" rx="5" fill="${dialC}" stroke="${metalC}" stroke-width="2.4"/>`
    : `<circle cx="30" cy="30" r="17" fill="${dialC}" stroke="${metalC}" stroke-width="2.6"/>
       <circle cx="30" cy="30" r="20" fill="none" stroke="${bezelC}" stroke-width="3.6"/>`;
  const band = (w&&w.strap==='metal') ? metalC : ((w&&w.strapColor)||'#3A2A1C');
  const dark = dialC.match(/^#[0-9A-F]{2}/i) && parseInt(dialC.slice(1,3),16) < 120;
  const hand = dark ? '#EDEDF0' : '#1A1A1E';
  return `<svg viewBox="0 0 60 60" width="${s}" height="${s}">
    <rect x="24" y="1" width="12" height="12" rx="3" fill="${band}"/>
    <rect x="24" y="47" width="12" height="12" rx="3" fill="${band}"/>
    ${face}
    <line x1="30" y1="30" x2="30" y2="20" stroke="${hand}" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="30" y1="30" x2="37" y2="34" stroke="${hand}" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="30" cy="30" r="1.6" fill="${bezelC==='#C9C6BE'?'#8A7423':'#C9A227'}"/>
    <rect x="47" y="27" width="4" height="6" rx="1.6" fill="${metalC}"/>
  </svg>`;
}

/* =========================================================
   RENDER
   ========================================================= */
function applyLang(){
  document.querySelectorAll('[data-i]').forEach(e=>{
    const k=e.dataset.i, v=t(k);
    if(e.tagName==='INPUT') e.placeholder=v; else e.textContent=v;
  });
  document.getElementById('juliosPh').textContent=t('juliosPh');
  document.getElementById('chatIn').placeholder=t('juliosPh');
  document.getElementById('memberSince').textContent=t('memberSince');
  document.getElementById('bioTxt').textContent=t('bio');
  document.getElementById('drawerBtn').textContent = drawerOpen? t('closeDrawer') : t('openDrawer');
  document.getElementById('lgpt').classList.toggle('on',S.lang==='pt');
  document.getElementById('lgen').classList.toggle('on',S.lang==='en');
  renderAll();
}

function renderAll(){ 
  renderHome(); 
  renderColl(); 
  renderComm();
  if(document.getElementById('grailsSheet').classList.contains('on')){
    renderGrailSheet();
  }
}

function renderHome(){
  const A=active();
  document.getElementById('kQty').textContent = A.length;
  document.getElementById('kCats').textContent = new Set(A.map(w=>w.cat)).size + ' ' + t('cats');
  document.getElementById('kMkt').textContent = A.length? money(totalMkt(),true) : '—';
  const d = A.length? (totalMkt()-totalPaid())/totalPaid()*100 : 0;
  const dl=document.getElementById('kDelta');
  dl.className='sub '+(d>=0?'up':'down');
  dl.textContent = A.length? (d>=0?'+':'')+d.toFixed(1)+'% '+t('since') : '—';

  renderBars(); renderSpots(); renderAdded(); renderFeed(); renderNews();
}

/* categoria e marca dominantes — empate resolvido pela peça de maior valor */
function dominant(key){
  const A=active(); if(!A.length) return null;
  const g={};
  A.forEach(w=>{ (g[w[key]]=g[w[key]]||[]).push(w); });
  return Object.entries(g).sort((a,b)=>{
    if(b[1].length!==a[1].length) return b[1].length-a[1].length;
    return Math.max(...b[1].map(w=>w.mkt)) - Math.max(...a[1].map(w=>w.mkt));
  })[0];
}

function renderSpots(){
  const A=active(), box=document.getElementById('spots');
  if(!A.length){ box.innerHTML=`<div class="card hint">${t('emptyS')}</div>`; return; }
  const c=dominant('cat'), b=dominant('brand');
  const card=(lab,name,list,type)=>`
    <div class="spot">
      <div style="flex:1;min-width:0">
        <div class="lab">${lab}</div>
        <b class="big">${name}</b>
        <span class="sub">${list.length} ${t('pieces')} · ${Math.round(list.length/A.length*100)}% ${t('ofColl')}</span>
      </div>
      <button class="go" onclick="filterBy('${type}','${name}')">${t('seeWatches')}</button>
    </div>`;
  box.innerHTML = card(t('spotCat'),c[0],c[1],'cat') + card(t('spotBrand'),b[0],b[1],'brand')
    + `<p class="hint" style="margin:4px 2px 0">${t('tieNote')}.</p>`;
}

function filterBy(type,value){
  S.filter={type,value}; go('coll'); renderColl();
  document.getElementById('s-coll').scrollTop=0;
}
function clearFilter(){ S.filter=null; renderColl(); }

function renderAdded(){
  const A=active();
  const M = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const counts=new Array(12).fill(0);
  A.forEach(w=>{ const [y,m]=w.date.split('-').map(Number); if(y===S.year) counts[m-1]++; });
  const max=Math.max(...counts,1);
  document.getElementById('cbars').innerHTML = counts.map(v=>
    `<div class="bar ${v===max&&v>0?'top':''}" style="height:${v?Math.max(14,v/max*100):5}%"></div>`).join('');
  document.getElementById('cblabs').innerHTML = M.map(m=>`<div class="blab">${m}</div>`).join('');
  const tot=counts.reduce((a,b)=>a+b,0);
  document.getElementById('addedTotal').textContent = tot+' '+(tot===1?t('pieceIn'):t('piecesIn'));
  document.getElementById('addedSub').textContent = t('addedIn')+' '+S.year;
}

/* CARROSSEL DE NOTÍCIAS */
let newsIndex = 0;
let newsTimer = null;

function renderNews(){
  const container = document.getElementById('newsCarousel');
  const dots = document.getElementById('newsDots');
  if(!container || !dots) return;

  container.innerHTML = NEWS.map(item => `
    <div class="news-card">
      <div class="news-tag">${item.tag}</div>
      <b>${item.title}</b>
      <p>${item.desc}</p>
      <div class="news-meta">${item.source} · ${item.time}</div>
    </div>`).join('');

  dots.innerHTML = NEWS.map((_, i) => `
    <button class="news-dot ${i===newsIndex?'on':''}" onclick="setNewsIndex(${i})"></button>
  `).join('');

  container.style.transform = `translateX(-${newsIndex * 100}%)`;
}

function setNewsIndex(i){
  newsIndex = i;
  renderNews();
  startNewsAutoScroll();
}

function startNewsAutoScroll(){
  if(newsTimer) clearInterval(newsTimer);
  newsTimer = setInterval(() => {
    newsIndex = (newsIndex + 1) % NEWS.length;
    renderNews();
  }, 4500);
}

/* historico completo da atividade, em ordem cronologica inversa */
function activityLog(){
  const A=active(); if(!A.length) return [];
  const out=[];
  A.forEach(w=>{
    out.push({d:w.date, kind:'add', b:`${w.brand} ${w.model}`, s:t('actAdded')});
    const up=(w.mkt-w.paid)/w.paid*100;
    if(up>=12){
      const d=new Date(w.date); d.setMonth(d.getMonth()+Math.min(18,Math.round(up/6)));
      out.push({d:d.toISOString().slice(0,10), kind:'up',
                b:`${w.brand} ${w.model}`, s:`${t('actUp')} +${up.toFixed(0)}% ${t('since')}`});
    }
  });
  GRAILS.forEach((g,i)=>out.push({d:`2024-0${Math.min(9,i+3)}-12`, kind:'grail', b:g.model, s:t('actGrail')}));
  MEMBERS.slice(0,3).forEach((m,i)=>out.push({d:`2024-0${Math.min(9,i+2)}-0${i+4}`, kind:'friend',
                                              b:m.u, s:t('actFriend')}));
  return out.sort((a,b)=>b.d.localeCompare(a.d));
}

const fmtDate=d=>new Date(d).toLocaleDateString(S.lang==='pt'?'pt-BR':'en-GB',
  {day:'2-digit',month:'short',year:'numeric'});

function renderFeed(){
  const f=document.getElementById('feed');
  const btn=document.getElementById('feedMore');
  const log=activityLog();
  if(!log.length){
    f.innerHTML=`<span class="hint">${t('noAct')}</span>`; f.style.paddingLeft='0';
    if(btn) btn.style.display='none'; return;
  }
  f.style.paddingLeft='26px';
  if(btn) btn.style.display = log.length>4 ? '' : 'none';
  f.innerHTML=log.slice(0,4).map((i,n)=>
    `<div class="act-item ${n===0?'hot':''}"><b>${i.b}</b><span>${i.s} · ${fmtDate(i.d)}</span></div>`
  ).join('');
}

/* folha com o historico completo */
function openActivity(){
  const log=activityLog();
  const byYear={};
  log.forEach(i=>{ const y=i.d.slice(0,4); (byYear[y]=byYear[y]||[]).push(i); });
  document.getElementById('actTitle').textContent=t('histTitle');
  document.getElementById('actBody').innerHTML =
    Object.keys(byYear).sort((a,b)=>b.localeCompare(a)).map(y=>`
      <h2 class="sec">${y}</h2>
      <div class="card"><div class="feed" style="padding-left:26px">
        ${byYear[y].map(i=>`<div class="act-item ${i.kind==='add'?'hot':''}">
          <b>${i.b}</b><span>${i.s} · ${fmtDate(i.d)}</span></div>`).join('')}
      </div></div>`).join('')
    || `<div class="card hint">${t('noAct')}</div>`;
  document.getElementById('activity').classList.add('on');
}

function renderBars(){
  const M = S.lang==='pt' ? ['J','F','M','A','M','J','J','A','S','O','N','D'] : ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const vals = new Array(12).fill(0);
  active().forEach(w=>{ const [y,m]=w.date.split('-').map(Number); if(y===S.year) vals[m-1]+=w.paid; });
  const max = Math.max(...vals,1);
  document.getElementById('bars').innerHTML = vals.map(v=>
    `<div class="bar ${v===max&&v>0?'top':''}" style="height:${v?Math.max(8,v/max*100):4}%"></div>`).join('');
  document.getElementById('blabs').innerHTML = M.map(m=>`<div class="blab">${m}</div>`).join('');
  const tot = vals.reduce((a,b)=>a+b,0);
  document.getElementById('spendTotal').textContent = tot? money(tot,true) : '—';
  document.getElementById('y2023').classList.toggle('on',S.year===2023);
  document.getElementById('y2024').classList.toggle('on',S.year===2024);
}
function setYear(y){ S.year=y; renderBars(); }

function renderColl(){
  const sorts=[['recent',t('recent')],['value',t('value')],['brand',t('brand')],['oldest',t('oldest')]];
  document.getElementById('sortChips').innerHTML = sorts.map(([k,l])=>
    `<button class="chip ${S.sort===k?'on':''}" onclick="setSort('${k}')">${l}</button>`).join('');

  const fb=document.getElementById('collFilter');
  if(S.filter){
    fb.innerHTML=`<div class="spot" style="margin-bottom:14px">
      <div style="flex:1"><div class="lab">${t('filtering')}</div><b class="big">${S.filter.value}</b></div>
      <button class="go" onclick="clearFilter()">${t('clearFilter')}</button></div>`;
  } else fb.innerHTML='';

  let L=[...active()];
  if(S.filter) L=L.filter(w=>w[S.filter.type]===S.filter.value);
  if(S.sort==='recent') L.sort((a,b)=>b.date.localeCompare(a.date));
  if(S.sort==='oldest') L.sort((a,b)=>a.year-b.year);
  if(S.sort==='value')  L.sort((a,b)=>b.mkt-a.mkt);
  if(S.sort==='brand')  L.sort((a,b)=>a.brand.localeCompare(b.brand));

  const box=document.getElementById('collList');
  if(!L.length){
    box.innerHTML=`<div class="card" style="text-align:center;padding:36px 20px">
      <b style="font-size:17px;font-weight:900;display:block">${t('emptyT')}</b>
      <p class="hint" style="margin:10px 0 18px">${t('emptyS')}</p>
      <button class="btn" onclick="openScan()">${t('scanFirst')}</button></div>`;
    return;
  }
  box.innerHTML = L.map(w=>{
    const up = w.mkt>=w.paid;
    return `<button class="wrow" onclick="openDetail('${w.id}')">
      <div class="wpic">${pic(w)}</div>
      <div class="n"><b>${w.brand} ${w.model}</b><span>${w.ref} · ${w.year}</span>
        <div class="tag">${w.cat}${S.hidden.has(w.id)?' · '+t('hideW'):''}</div></div>
      <div class="v"><b>${money(w.mkt,true)}</b>
        <span class="${up?'up':'down'}">${up?'+':''}${((w.mkt-w.paid)/w.paid*100).toFixed(0)}%</span></div>
    </button>`;
  }).join('');
}
function setSort(k){ S.sort=k; renderColl(); }

function renderComm(){
  const q=((document.getElementById('commSearch')||{}).value||'').trim().toLowerCase();
  const L=MEMBERS.filter(m=>(m.n+' '+m.u+' '+m.city).toLowerCase().includes(q));

  document.getElementById('commA').innerHTML = L.length? L.map(m=>{
    const f=S.friends.has(m.u), st=S.req[m.u]||'none';
    const val = m.priv? '••••' : money(ownedBy(m).reduce((s,w)=>s+w.mkt,0),true);
    let action;
    if(!f) action=`<button class="addbtn" onclick="friend('${m.u}')">${t('friendAdd')}</button>`;
    else if(st==='none') action=`<button class="addbtn" onclick="askAccess('${m.u}')">${t('askAccess')}</button>`;
    else if(st==='pending') action=`<button class="addbtn" style="opacity:.55" disabled>${t('pending')}</button>`;
    else action=`<button class="addbtn on" onclick="openFriend('${m.u}')">${t('seeColl')}</button>`;
    return `<div class="member">
      <div class="ava" style="background:linear-gradient(140deg,${m.g})">${m.i}</div>
      <div class="m"><b>${m.n} ${f?'<span style="color:var(--gold);font-size:11px">✓</span>':''}</b>
        <span>${m.u} · ${m.owns.length} ${t('pieces')} · ${val}</span>
        <span style="display:block;font-size:11.5px;margin-top:1px">${m.city}</span></div>
      ${action}
    </div>`;
  }).join('') : `<div class="card hint">${t('noMember')}</div>`;

  document.getElementById('commB').innerHTML = REVIEWS.map(r=>`
    <div class="review"><div class="h">
      <b>${r.w}</b><div class="stars">${'★'.repeat(r.s)}${'☆'.repeat(5-r.s)}</div>
      </div><div style="font-size:12px;color:var(--muted);font-weight:700;margin-bottom:8px">${r.u}</div>
      <p>${S.lang==='pt'?r.pt:r.en}</p></div>`).join('');
}

function friend(u){
  S.friends.add(u); renderComm();
  toast(t('nowFriends'));
}

function askAccess(u){
  S.req[u]='pending'; renderComm(); toast(t('reqSent'));
  setTimeout(()=>{ S.req[u]='ok'; renderComm(); toast(t('reqOk')); }, 2600);
}

function openFriend(u){
  const m=MEMBERS.find(x=>x.u===u); if(!m)return;
  const L=ownedBy(m), tot=L.reduce((s,w)=>s+w.mkt,0);
  document.getElementById('fsTitle').textContent=m.n;
  document.getElementById('fsBody').innerHTML=`
    <div class="card" style="display:flex;gap:14px;align-items:center">
      <div class="ava" style="width:54px;height:54px;font-size:18px;background:linear-gradient(140deg,${m.g})">${m.i}</div>
      <div style="flex:1"><b style="font-size:16px;font-weight:900;display:block">${m.u}</b>
        <span style="font-size:12.5px;color:var(--muted);font-weight:600">${m.city} · ${L.length} ${t('pieces')}</span></div>
    </div>
    ${m.priv? `<p class="hint" style="margin:12px 2px">${t('privOn')}</p>`
            : `<div class="kpis" style="margin-top:12px">
                 <div class="kpi"><div class="lab">${t('kMarket')}</div><div class="val sm">${money(tot,true)}</div>
                   <div class="sub" style="color:var(--muted)">${moneyAlt(tot)}</div></div>
                 <div class="kpi"><div class="lab">${t('kPieces')}</div><div class="val">${L.length}</div>
                   <div class="sub" style="color:var(--muted)">${new Set(L.map(w=>w.cat)).size} ${t('cats')}</div></div>
               </div>`}
    <button class="btn" style="margin-top:16px" onclick="openFriendBox('${m.u}')">${t('openTheirBox')}</button>
    <h2 class="sec">${t('tabColl')}</h2>
    ${L.map(w=>`<div class="wrow" style="cursor:default">
      <div class="wpic">${pic(w)}</div>
      <div class="n"><b>${w.brand} ${w.model}</b><span>${w.ref} · ${w.year}</span>
        <div class="tag">${w.cat}</div></div>
      ${m.priv?'':`<div class="v"><b>${money(w.mkt,true)}</b></div>`}
    </div>`).join('')}`;
  document.getElementById('friendSheet').classList.add('on');
}

function openFriendBox(u){
  S.viewing=MEMBERS.find(x=>x.u===u);
  document.getElementById('boxOwner').textContent=S.viewing.u.replace('@','').toUpperCase();
  openBox(); buildBox(); fitCamera(true);
}
function commTab(n){
  document.getElementById('cTab1').classList.toggle('on',n===1);
  document.getElementById('cTab2').classList.toggle('on',n===2);
  document.getElementById('commA').style.display=n===1?'':'none';
  document.getElementById('commB').style.display=n===2?'':'none';
}

/* navegação */
function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));
  document.getElementById('s-'+id).classList.add('on');
  document.querySelectorAll('.tab').forEach((b,i)=>b.classList.toggle('on',['home','coll','comm','prof'][i]===id));
  const dock = document.getElementById('dock');
  if(dock) dock.classList.remove('mini');
}
const close_ = id => { document.getElementById(id).classList.remove('on');
  if(id==='detail') disposeMini(); };

/* preferências */
function setLang(l){ S.lang=l; applyLang(); }
function setCur(c){ S.cur=c;
  document.getElementById('cbrl').classList.toggle('on',c==='BRL');
  document.getElementById('cusd').classList.toggle('on',c==='USD'); renderAll(); }
function togglePriv(){ S.priv=!S.priv; document.getElementById('swPriv').classList.toggle('on',S.priv); renderAll(); }
function toggleDemo(){ S.demo=!S.demo; document.getElementById('swDemo').classList.toggle('on',S.demo); renderAll(); buildBox(); }

/* =========================================================
   GRAILS (Gerenciamento + Tela Dedicada)
   ========================================================= */
function openGrails(){
  document.getElementById('grailsSheet').classList.add('on');
  renderGrailSheet();
}

function renderGrailSheet(){
  const box = document.getElementById('grailSheetList');
  if(!GRAILS.length){
    box.innerHTML = `<div class="card" style="text-align:center;padding:36px 20px">
      <b style="font-size:16px;font-weight:900;display:block;margin-bottom:8px">${t('emptyGrails')}</b>
      <button class="btn" style="margin-top:12px" onclick="openCatalog()">${t('catTitle')}</button>
    </div>`;
    return;
  }
  
  box.innerHTML = GRAILS.map(g => {
    const safeModel = g.model.replace(/'/g, "\\'");
    return `<div class="wrow" onclick="openDetailByModel('${safeModel}')">
      <div class="wpic" style="background:#0F0E0A">${pic({model:g.model,dial:'#0B0B0D',bezel:'#111114',metal:'#C9A227',strap:'metal',img:g.img})}</div>
      <div class="n"><b>${g.model}</b><span>${g.brand}</span></div>
      <div style="text-align:right">
        <b style="font-size:13.5px;font-weight:800;display:block;margin-bottom:6px">${money(g.mkt,true)}</b>
        <button class="addbtn on" onclick="event.stopPropagation(); toggleGrail('${safeModel}')">Remover</button>
      </div>
    </div>`;
  }).join('');
}

function toggleGrail(model){
  const idx = GRAILS.findIndex(g=>g.model.toLowerCase() === model.toLowerCase());
  if(idx >= 0){
    GRAILS.splice(idx, 1);
    toast(t('removed'));
  } else {
    const c = CATALOG.find(x=>x.model.toLowerCase() === model.toLowerCase()) || 
              WATCHES.find(x=>x.model.toLowerCase() === model.toLowerCase());
    if(c){
      GRAILS.push({brand:c.brand, model:c.model, mkt:c.mkt, img:c.img});
      toast(t('added'));
    }
  }
  renderAll();
  renderCatalog();
}

/* =========================================================
   DETALHE
   ========================================================= */
let curW=null;

function openDetailByModel(modelName){
  let w = WATCHES.find(x => x.model.toLowerCase() === modelName.toLowerCase() || (x.brand + ' ' + x.model).toLowerCase() === modelName.toLowerCase());
  if(!w){
    let c = CATALOG.find(x => x.model.toLowerCase() === modelName.toLowerCase());
    if(c){
      w = {
        id: 'cat_' + c.model,
        brand: c.brand,
        model: c.model,
        ref: c.model,
        year: 2024,
        cat: c.cat,
        paid: Math.round(c.mkt * 0.85),
        mkt: c.mkt,
        date: '2024-01-01',
        dial: '#0B0B0D',
        bezel: '#111114',
        metal: '#C9A227',
        strap: 'metal',
        papers: true,
        img: c.img,
        pt: 'Modelo presente no catálogo oficial de Grails e desejos de relojoaria.',
        en: 'Official model listed in the global watch catalogue.'
      };
    }
  }
  if(w) openDetail(w.id, w);
}

function openDetail(id, overrideObj){
  const w = overrideObj || WATCHES.find(x=>x.id===id); 
  if(!w) return;
  curW=w;
  document.getElementById('dTitle').textContent = w.brand+' '+w.model;
  const h=history(w), up=w.mkt>=w.paid, delta=((w.mkt-w.paid)/w.paid*100).toFixed(1);
  const isOwned = WATCHES.some(x=>x.id===w.id);

  document.getElementById('dBody').innerHTML = `
    <div class="slot"><canvas id="detC"></canvas><div class="slotlab">${t('modelSlot')}</div></div>

    <div class="kpis" style="margin-top:16px">
      <div class="kpi"><div class="lab">${t('paid')}</div><div class="val sm">${money(w.paid,true)}</div>
        <div class="sub" style="color:var(--muted)">${moneyAlt(w.paid)}</div></div>
      <div class="kpi"><div class="lab">${t('market')}</div><div class="val sm">${money(w.mkt,true)}</div>
        <div class="sub ${up?'up':'down'}">${up?'+':''}${delta}%</div></div>
    </div>

    <h2 class="sec">${t('mkt12')}</h2>
    <div class="card"><canvas id="lineC" style="width:100%;height:150px"></canvas></div>

    <h2 class="sec">${t('secStory')}</h2>
    <div class="prose"><p>${S.lang==='pt'?w.pt:w.en}</p></div>

    <h2 class="sec">${t('detRef')}</h2>
    <div class="card" style="padding:2px 18px">
      <div class="kv"><span>${t('detRef')}</span><b>${w.ref}</b></div>
      <div class="kv"><span>${t('detYear')}</span><b>${w.year}</b></div>
      <div class="kv"><span>${t('detCat')}</span><b>${w.cat}</b></div>
      <div class="kv"><span>${t('detDate')}</span><b>${new Date(w.date).toLocaleDateString(S.lang==='pt'?'pt-BR':'en-GB')}</b></div>
      <div class="kv" style="border:0"><span>${t('detPapers')}</span><b>${w.papers?t('yes'):t('no')}</b></div>
    </div>

    ${isOwned ? `<button class="btn sec" style="margin-top:18px" onclick="toggleHide('${w.id}')">
      ${S.hidden.has(w.id)?t('showW'):t('hideW')}</button>` : ''}`;

  document.getElementById('detail').classList.add('on');
  requestAnimationFrame(()=>{ drawLine(h); miniScene(document.getElementById('detC'), w); });
}

function toggleHide(id){
  S.hidden.has(id)?S.hidden.delete(id):S.hidden.add(id);
  toast(S.hidden.has(id)?t('hidden'):t('shown'));
  renderColl(); buildBox(); openDetail(id);
}

function openDetailFromBox(){ 
  if(!focused) return;
  const id = focused.userData.id;
  openDetail(id); 
}

function drawLine(h){
  const c=document.getElementById('lineC'); if(!c)return;
  const dpr=devicePixelRatio||1, W=c.clientWidth, H=150;
  c.width=W*dpr; c.height=H*dpr; const x=c.getContext('2d'); if(!x) return; x.scale(dpr,dpr);
  const min=Math.min(...h), max=Math.max(...h), pad=14;
  const px=i=>pad+i/(h.length-1)*(W-pad*2), py=v=>H-pad-(v-min)/(max-min||1)*(H-pad*2);
  const g=x.createLinearGradient(0,0,0,H); g.addColorStop(0,'rgba(201,162,39,.28)'); g.addColorStop(1,'rgba(201,162,39,0)');
  x.beginPath(); x.moveTo(px(0),py(h[0])); h.forEach((v,i)=>x.lineTo(px(i),py(v)));
  x.lineTo(px(h.length-1),H); x.lineTo(px(0),H); x.closePath(); x.fillStyle=g; x.fill();
  x.beginPath(); h.forEach((v,i)=>i?x.lineTo(px(i),py(v)):x.moveTo(px(i),py(v)));
  x.strokeStyle='#C9A227'; x.lineWidth=2.2; x.lineJoin='round'; x.stroke();
  x.beginPath(); x.arc(px(h.length-1),py(h[h.length-1]),4.2,0,7); x.fillStyle='#EBD27C'; x.fill();
}

/* =========================================================
   CATÁLOGO
   ========================================================= */
function openCatalog(){ document.getElementById('catalog').classList.add('on'); renderCatalog(); }

/* catalogo unificado: o acervo do usuario entra junto com o catalogo geral,
   sem duplicar quando o mesmo modelo existe nos dois */
function fullCatalog(){
  const out = active().map(w=>({
    brand:w.brand, model:w.model, ref:w.ref, mkt:w.mkt, cat:w.cat, img:w.img,
    dial:w.dial, bezel:w.bezel, metal:w.metal, strap:w.strap, strapColor:w.strapColor,
    owned:true
  }));
  const tem = m => out.some(o=>o.model.toLowerCase()===m.toLowerCase());
  CATALOG.forEach(c=>{ if(!tem(c.model)) out.push(Object.assign({owned:false}, c)); });
  return out.sort((a,b)=>b.mkt-a.mkt);
}

function renderCatalog(){
  const q=(document.getElementById('catInput').value||'').toLowerCase().trim();
  const L=fullCatalog().filter(c=>
    (c.brand+' '+c.model+' '+(c.ref||'')+' '+c.cat).toLowerCase().includes(q));

  if(!L.length){
    document.getElementById('catList').innerHTML=`<div class="card hint">${t('catEmpty')}</div>`;
    return;
  }
  document.getElementById('catList').innerHTML = L.map(c=>{
    const has=GRAILS.some(g=>g.model.toLowerCase()===c.model.toLowerCase());
    const safeModel = c.model.replace(/'/g, "\\'");
    const acao = c.owned
      ? `<span class="ownedtag">${t('owned')}</span>`
      : `<button class="addbtn ${has?'on':''}" style="margin-top:6px" onclick="event.stopPropagation(); toggleGrail('${safeModel}')">${has?'★ Grail':'+ Grail'}</button>`;
    return `<div class="wrow" onclick="openDetailByModel('${safeModel}')">
      <div class="wpic">${pic({model:c.model,
        dial:c.dial||'#0B0B0D', bezel:c.bezel||'#111114', metal:c.metal||'#B9BCC2',
        strap:c.strap||'metal', strapColor:c.strapColor, img:c.img})}</div>
      <div class="n"><b>${c.model}</b><span>${c.brand}${c.ref&&c.ref!==c.model?' · '+c.ref:''}</span>
        <div class="tag">${c.cat}</div></div>
      <div style="text-align:right">
        <b style="font-size:13.5px;font-weight:800;display:block">${money(c.mkt,true)}</b>
        ${acao}
      </div>
    </div>`;
  }).join('');
}

function addGrail(model){
  toggleGrail(model);
}

/* =========================================================
   SCANNER (identificação simulada)
   ========================================================= */
let stream=null;
async function openScan(){
  document.getElementById('scan').classList.add('on');
  document.getElementById('scanResult').innerHTML='';
  document.getElementById('scanBtn').style.display='';
  try{
    stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});
    document.getElementById('cam').srcObject=stream;
  }catch(e){ document.getElementById('scanmsg').textContent = t('scanHint'); }
}
function closeScan(){
  document.getElementById('scan').classList.remove('on');
  if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; }
}
function doScan(){
  const btn=document.getElementById('scanBtn'), res=document.getElementById('scanResult');
  btn.style.display='none';
  res.innerHTML=`<div class="card" style="text-align:center;margin-bottom:14px"><span class="hint">${t('scanning')}</span></div>`;
  setTimeout(()=>{
    const w = WATCHES[Math.floor(Math.random()*WATCHES.length)];
    res.innerHTML = `
      <div class="card" style="margin-bottom:12px;display:flex;gap:14px;align-items:center">
        <div class="wpic">${pic(w)}</div>
        <div style="flex:1"><div style="font-size:10.5px;font-weight:800;letter-spacing:.1em;color:var(--gold)">${t('identified').toUpperCase()} · 87% ${t('conf')}</div>
        <b style="font-size:15px;font-weight:900;display:block;margin-top:3px">${w.brand} ${w.model}</b>
        <span style="font-size:12.5px;color:var(--muted);font-weight:600">${w.ref} · ${w.year}</span></div>
      </div>
      <p class="hint" style="margin:0 0 12px">${t('notSure')} <b style="color:var(--gold)">${t('editRef')}</b></p>
      <button class="btn" onclick="closeScan();toast('${t('done')}')">${t('addToColl')}</button>`;
  },1900);
}

/* =========================================================
   CAIXA 3D  —  maquete cinza, three.js r128
   ========================================================= */
let renderer,scene,cam3,pivot,boxGroup,drawerGroup,raycaster,pointer,slotsMesh=[],watchMeshes=[];
let drawerOpen=false, focused=null, focusAnim=0, rotX=-0.78, rotY=-0.30, dragging=false, lastX=0,lastY=0;
let camDist=15, zoom=1, camNow=0, focusZoom = 1.0;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

const GREY = {tray:0x8E9096, wall:0x74767C, cushion:0xA8AAB0, floor:0x5C5E64};

function initBox(){
  const canvas=document.getElementById('c3d');
  if(typeof disposeMini==='function') disposeMini();
  try{
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  }catch(err){
    renderer=null;
    const sub=document.getElementById('boxSub');
    if(sub) sub.textContent='3D indisponivel neste ambiente';
    console.warn('WebGL indisponivel:',err.message);
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  canvas.addEventListener('webglcontextlost',e=>e.preventDefault(),false);
  canvas.addEventListener('webglcontextrestored',()=>{ buildBox(); sizeBox(); },false);
  scene=new THREE.Scene();
  scene.fog=new THREE.Fog(0x050506,22,44);
  cam3=new THREE.PerspectiveCamera(38,1,0.1,100);

  const LIGHT = 1;
  scene.add(new THREE.HemisphereLight(0xC8CCD4,0x0A0A0C,1.05*LIGHT));
  const key=new THREE.DirectionalLight(0xFFF3D6,1.5*LIGHT); key.position.set(6,12,8); scene.add(key);
  const rim=new THREE.DirectionalLight(0xC9A227,0.65*LIGHT); rim.position.set(-8,4,-7); scene.add(rim);

  pivot=new THREE.Group(); scene.add(pivot);
  raycaster=new THREE.Raycaster(); pointer=new THREE.Vector2();
  buildBox(); sizeBox(); animate();

  const pts = new Map();
  let pinch0 = 0, zoom0 = 1, downX = 0, downY = 0;

  canvas.addEventListener('pointerdown', e => {
    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragging = true;
    downX = e.clientX;
    downY = e.clientY;
    lastX = e.clientX;
    lastY = e.clientY;
    
    if (pts.size === 2) {
      pinch0 = spread();
      zoom0 = focused ? focusZoom : zoom;
    }
  });

  canvas.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pts.size >= 2) {
      const d = spread();
      if (pinch0 > 0) {
        if (focused) {
          focusZoom = clamp(zoom0 * (d / pinch0), 0.5, 2.5);
        } else {
          zoom = clamp(zoom0 * (pinch0 / d), 0.32, 3.2);
        }
      }
      return;
    }

    const dx = (e.clientX - lastX) / 130;
    const dy = (e.clientY - lastY) / 140;
    lastX = e.clientX;
    lastY = e.clientY;

    if (focused) {
      focused.rotation.y += dx * 1.5;
      focused.rotation.x = clamp(focused.rotation.x + dy * 1.2, -1.45, 1.45);
    } else {
      rotY += dx;
      rotX = clamp(rotX + dy, -1.48, 0.72);
    }
  });

  const up = e => {
    const had = pts.size;
    pts.delete(e.pointerId);
    try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}

    if (pts.size < 2) pinch0 = 0;

    if (pts.size === 0) {
      dragging = false;
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (had === 1 && dist < 8 && !focused) {
        pick(downX, downY);
      }
    }
  };

  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('pointerleave', up);

  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    if (focused) {
      focusZoom = clamp(focusZoom * (1 - e.deltaY * 0.0015), 0.5, 2.5);
    } else {
      zoom = clamp(zoom * (1 + e.deltaY * 0.0014), 0.32, 3.2);
    }
  }, { passive: false });

  function spread(){ const a=[...pts.values()]; return Math.hypot(a[0].x-a[1].x, a[0].y-a[1].y)||1; }
  addEventListener('resize',sizeBox);
}

function mat(c,rough){ return new THREE.MeshStandardMaterial({color:c,roughness:rough??0.92,metalness:0.05}); }

function makeCushion(){
  const g=new THREE.Group();
  const body=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.42,1.5,20,1,false), mat(GREY.cushion,0.98));
  body.rotation.z=Math.PI/2; body.position.y=0.42; g.add(body);
  const cap1=new THREE.Mesh(new THREE.SphereGeometry(0.42,16,12), mat(GREY.cushion,0.98));
  cap1.position.set(0.75,0.42,0); g.add(cap1);
  const cap2=cap1.clone(); cap2.position.x=-0.75; g.add(cap2);
  const base=new THREE.Mesh(new THREE.BoxGeometry(2.05,0.14,1.35), mat(GREY.wall,0.95));
  base.position.y=0.07; g.add(base);
  return g;
}

function makeWatch(w){
  const g=new THREE.Group();
  const caseC=new THREE.Color(w.metal), dialC=new THREE.Color(w.dial), bezC=new THREE.Color(w.bezel);
  const isRect = w.model.includes('Tank');

  let body, dial;
  if(isRect){
    body=new THREE.Mesh(new THREE.BoxGeometry(0.72,0.2,0.92), new THREE.MeshStandardMaterial({color:caseC,roughness:0.28,metalness:0.85}));
    dial=new THREE.Mesh(new THREE.BoxGeometry(0.54,0.06,0.74), new THREE.MeshStandardMaterial({color:dialC,roughness:0.5,metalness:0.1}));
  }else{
    body=new THREE.Mesh(new THREE.CylinderGeometry(0.44,0.42,0.2,32), new THREE.MeshStandardMaterial({color:caseC,roughness:0.26,metalness:0.88}));
    dial=new THREE.Mesh(new THREE.CylinderGeometry(0.33,0.33,0.06,32), new THREE.MeshStandardMaterial({color:dialC,roughness:0.45,metalness:0.12}));
    const bez=new THREE.Mesh(new THREE.TorusGeometry(0.395,0.055,10,40), new THREE.MeshStandardMaterial({color:bezC,roughness:0.35,metalness:0.7}));
    bez.rotation.x=Math.PI/2; bez.position.y=0.1; g.add(bez);
  }
  dial.position.y=0.11; g.add(body); g.add(dial);

  const crys=new THREE.Mesh(isRect?new THREE.BoxGeometry(0.56,0.04,0.76):new THREE.CylinderGeometry(0.34,0.34,0.04,32),
    new THREE.MeshStandardMaterial({color:0xE6EAF0,roughness:0.06,metalness:0.1,transparent:true,opacity:0.22}));
  crys.position.y=0.15; g.add(crys);

  const light = parseInt(w.dial.slice(1,3),16) > 120;
  const hm=new THREE.MeshStandardMaterial({color:light?0x1A1A1E:0xE8E8EE,roughness:0.3,metalness:0.5});
  const h1=new THREE.Mesh(new THREE.BoxGeometry(0.035,0.02,0.2),hm); h1.position.set(0,0.145,-0.08); g.add(h1);
  const h2=new THREE.Mesh(new THREE.BoxGeometry(0.028,0.02,0.28),hm); h2.position.set(0.06,0.145,0.08); h2.rotation.y=0.9; g.add(h2);

  if(w.cat==='Chronograph'){
    [[-0.15,0],[0.15,0],[0,0.16]].forEach(([x,z])=>{
      const sd=new THREE.Mesh(new THREE.CylinderGeometry(0.075,0.075,0.02,18),
        new THREE.MeshStandardMaterial({color:light?0xC8C8CC:0x2A2A30,roughness:0.6}));
      sd.position.set(x,0.145,z); g.add(sd);
    });
  }

  const cr=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,0.09,14), new THREE.MeshStandardMaterial({color:caseC,roughness:0.3,metalness:0.85}));
  cr.rotation.z=Math.PI/2; cr.position.set(isRect?0.4:0.47,0.06,0); g.add(cr);

  const bandC = w.strap==='metal' ? new THREE.Color(w.metal) : new THREE.Color(w.strapColor||0x2A1E14);
  const bandM = new THREE.MeshStandardMaterial({color:bandC,roughness:w.strap==='metal'?0.32:0.9,metalness:w.strap==='metal'?0.8:0.05});
  [1,-1].forEach(s=>{
    const a=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.09,0.42),bandM);
    a.position.set(0,0.02,s*0.55); a.rotation.x=s*0.55; g.add(a);
    const b=new THREE.Mesh(new THREE.BoxGeometry(0.40,0.08,0.5),bandM);
    b.position.set(0,-0.28,s*0.86); b.rotation.x=s*1.05; g.add(b);
  });

  g.userData={id:w.id,name:w.brand+' '+w.model,ref:w.ref+' · '+w.year};
  return g;
}

function makeTray(items,slotCount){
  const g=new THREE.Group();
  const cols=Math.min(3,Math.max(1,slotCount)), rows=Math.ceil(slotCount/3);
  const W=cols*2.5+0.7, D=rows*1.85+0.7;

  const floor=new THREE.Mesh(new THREE.BoxGeometry(W,0.2,D), mat(GREY.floor,0.96));
  g.add(floor);
  [[0,(D/2-0.09)],[0,-(D/2-0.09)]].forEach(([x,z])=>{
    const w1=new THREE.Mesh(new THREE.BoxGeometry(W,1.15,0.18), mat(GREY.wall,0.9));
    w1.position.set(x,0.57,z); g.add(w1);
  });
  [[(W/2-0.09),0],[-(W/2-0.09)]].forEach(([x,z])=>{
    const w2=new THREE.Mesh(new THREE.BoxGeometry(0.18,1.15,D), mat(GREY.wall,0.9));
    w2.position.set(x,0.57,z); g.add(w2);
  });

  for(let i=0;i<slotCount;i++){
    const r=Math.floor(i/cols), c=i%cols;
    const x=(c-(cols-1)/2)*2.5, z=(r-(rows-1)/2)*1.85;
    const cu=makeCushion(); cu.position.set(x,0.1,z); cu.rotation.y=Math.PI/2;
    cu.userData.slot=i; cu.children.forEach(m=>m.userData.slot=i);
    g.add(cu); slotsMesh.push(cu);

    const w=items[i];
    if(w){
      const wm=makeWatch(w); wm.position.set(x,0.98,z);
      wm.userData.home=new THREE.Vector3(x,0.98,z);
      g.add(wm); watchMeshes.push(wm);
    }
  }
  g.userData={W,D};
  return g;
}

function buildBox(){
  if(!pivot)return;
  while(pivot.children.length) pivot.remove(pivot.children[0]);
  slotsMesh=[]; watchMeshes=[]; focused=null; drawerOpen=false;
  const V=visible();

  if(!V.length){ boxGroup=null; document.getElementById('boxSub').textContent=t('emptyT'); return; }

  const trays=[]; for(let i=0;i<V.length;i+=6) trays.push(V.slice(i,i+6));
  const first=trays[0];

  boxGroup=new THREE.Group();
  const t0 = V.length<=5 ? makeTrayRow(first) : makeTray(first,6);
  boxGroup.add(t0);
  const dims=t0.userData;

  const shell=new THREE.Mesh(new THREE.BoxGeometry(dims.W+0.5,1.5,dims.D+0.5), mat(0x6A6C72,0.94));
  shell.position.y=0.35; boxGroup.add(shell);
  t0.position.y=0.35;

  const lid=new THREE.Group();
  const frame=new THREE.Mesh(new THREE.BoxGeometry(dims.W+0.5,0.14,dims.D+0.5), mat(0x6A6C72,0.9));
  const glass=new THREE.Mesh(new THREE.BoxGeometry(dims.W-0.4,0.05,dims.D-0.4),
    new THREE.MeshStandardMaterial({color:0xBFC6D0,roughness:0.05,metalness:0.2,transparent:true,opacity:0.16}));
  glass.position.y=0.08; lid.add(frame); lid.add(glass);
  lid.position.set(0,1.1,-(dims.D/2+0.25)); lid.rotation.x=-1.15;
  boxGroup.add(lid);

  drawerGroup=null;
  if(trays[1]){
    drawerGroup=new THREE.Group();
    const dt=makeTray(trays[1],6);
    const dd=dt.userData;
    const dshell=new THREE.Mesh(new THREE.BoxGeometry(dd.W+0.5,1.45,dd.D+0.5), mat(0x5F6167,0.94));
    dshell.position.y=0.32; drawerGroup.add(dshell); dt.position.y=0.32;
    drawerGroup.add(dt);
    const knob=new THREE.Mesh(new THREE.SphereGeometry(0.14,14,10), new THREE.MeshStandardMaterial({color:0xC9A227,roughness:0.3,metalness:0.85}));
    knob.position.set(0,0.5,dd.D/2+0.3); drawerGroup.add(knob);
    drawerGroup.userData.D = dd.D*0.86;
    drawerGroup.position.set(0,-1.55,0);
    boxGroup.add(drawerGroup);
  }
  document.getElementById('drawerBtn').style.display = 'none';

  boxGroup.position.y = drawerGroup? 0.7 : 0;
  pivot.add(boxGroup);

  const rx=pivot.rotation.x, ry=pivot.rotation.y;
  pivot.rotation.set(0, 0, 0); 
  pivot.updateMatrixWorld(true);

  const ctr = new THREE.Box3().setFromObject(boxGroup).getCenter(new THREE.Vector3());
  ctr.x = 0;
  boxGroup.position.sub(ctr);

  pivot.updateMatrixWorld(true);

  const span=g=>{ const s=new THREE.Vector3(); new THREE.Box3().setFromObject(g).getSize(s);
                  return 0.5*Math.hypot(s.x,s.y,s.z); };
  FIT.closed=span(boxGroup);
  if(drawerGroup){
    drawerGroup.position.z=drawerGroup.userData.D;
    pivot.updateMatrixWorld(true);
    FIT.open=span(boxGroup);
    drawerGroup.position.z=0;
  } else FIT.open=FIT.closed;

  pivot.rotation.set(rx,ry,0); pivot.updateMatrixWorld(true);

  fitCamera(true);
  document.getElementById('boxSub').textContent =
    `${V.length} ${t('pieces')} · ${t('pinch')}`;
}

function makeTrayRow(items){
  const n=items.length, W=n*2.5+0.7, D=1.85+0.7;
  const g=new THREE.Group();
  g.add(new THREE.Mesh(new THREE.BoxGeometry(W,0.2,D), mat(GREY.floor,0.96)));
  [[0,D/2-0.09],[0,-(D/2-0.09)]].forEach(([x,z])=>{
    const m=new THREE.Mesh(new THREE.BoxGeometry(W,1.15,0.18), mat(GREY.wall,0.9)); m.position.set(x,0.57,z); g.add(m); });
  [[W/2-0.09,0],[-(W/2-0.09),0]].forEach(([x,z])=>{
    const m=new THREE.Mesh(new THREE.BoxGeometry(0.18,1.15,D), mat(GREY.wall,0.9)); m.position.set(x,0.57,z); g.add(m); });
  items.forEach((w,i)=>{
    const x=(i-(n-1)/2)*2.5;
    const cu=makeCushion(); cu.position.set(x,0.1,0); cu.rotation.y=Math.PI/2;
    cu.userData.slot=i; cu.children.forEach(m=>m.userData.slot=i); g.add(cu); slotsMesh.push(cu);
    const wm=makeWatch(w); wm.position.set(x,0.98,0); wm.userData.home=new THREE.Vector3(x,0.98,0);
    g.add(wm); watchMeshes.push(wm);
  });
  g.userData={W,D};
  return g;
}

const PAD={side:20};
const FIT={closed:0, open:0};

function fitCamera(snap){
  if(!FIT.closed || !cam3 || !renderer){ camDist=15; return; }
  const W=renderer.domElement.clientWidth;
  const fracW=(W-PAD.side*2)/W;
  const vh=Math.tan(cam3.fov*Math.PI/360), hh=vh*cam3.aspect;
  const R = drawerOpen? FIT.open : FIT.closed;
  camDist = Math.max(R/(hh*fracW), R/vh)*1.04;
  if(snap||!camNow) camNow=camDist;
  scene.fog.near = camDist*0.8;
  scene.fog.far  = camDist*2.8;
}

function sizeBox(){
  if(!renderer)return;
  const w=document.getElementById('phone').clientWidth, h=document.getElementById('phone').clientHeight;
  renderer.setSize(w,h,false); cam3.aspect=w/h; cam3.updateProjectionMatrix(); fitCamera();
}

function pick(clientX, clientY) {
  const r = renderer.domElement.getBoundingClientRect();
  pointer.x = ((clientX - r.left) / r.width) * 2 - 1;
  pointer.y = -((clientY - r.top) / r.height) * 2 + 1;

  raycaster.setFromCamera(pointer, cam3);

  const hitW = raycaster.intersectObjects(watchMeshes, true);
  if (hitW.length) {
    let o = hitW[0].object;
    while (o && !o.userData?.id) {
      o = o.parent;
    }
    if (o && o.userData?.id) {
      focus(o);
      return;
    }
  }

  if (drawerGroup) {
    const hitD = raycaster.intersectObject(drawerGroup, true);
    if (hitD.length) {
      toggleDrawer();
      return;
    }
  }

  const hitS = raycaster.intersectObjects(slotsMesh, true);
  if (hitS.length && !S.viewing) {
    openScan();
  }
}

function focus(obj) {
  focused = obj;
  focusAnim = 0;
  focusZoom = 1.0;
  obj.userData.startPos = obj.position.clone();
  obj.userData.startRot = obj.rotation.clone();
  document.getElementById('fName').textContent = obj.userData.name;
  document.getElementById('fRef').textContent = obj.userData.ref;
  document.getElementById('focuscard').classList.add('on');
}
function unfocus(){
  if(!focused)return;
  const o=focused; focused=null;
  document.getElementById('focuscard').classList.remove('on');
  o.userData.returning=1;
}
function resetView(){ rotX=-0.78; rotY=-0.30; zoom=1; unfocus(); fitCamera(); }
function toggleDrawer(){
  if(!drawerGroup)return;
  drawerOpen=!drawerOpen;
  document.getElementById('drawerBtn').textContent = drawerOpen? t('closeDrawer') : t('openDrawer');
  fitCamera();
}

function animate() {
  requestAnimationFrame(animate);
  if (!renderer) return;

  pivot.rotation.y += (rotY - pivot.rotation.y) * 0.12;
  pivot.rotation.x += (rotX - pivot.rotation.x) * 0.12;

  if (drawerGroup) {
    const tz = drawerOpen ? drawerGroup.userData.D : 0;
    drawerGroup.position.z += (tz - drawerGroup.position.z) * 0.12;
  }

  const target = focused ? (camDist * 1.18) : (camDist * zoom);
  camNow += (target - camNow) * 0.16;
  cam3.position.set(0, camNow * 0.50, camNow * 0.87);
  cam3.lookAt(0, 0, 0);

  watchMeshes.forEach(o => {
    if (o === focused) {
      focusAnim = Math.min(1, focusAnim + 0.07);
      const k = focusAnim * focusAnim * (3 - 2 * focusAnim);

      const world = new THREE.Vector3(0, camNow * 0.50 * 0.40, camNow * 0.87 * 0.40);
      const local = o.parent.worldToLocal(world.clone());
      o.position.lerp(local, 0.14);

      const baseScale = 1 + 0.55 * k;
      const sc = baseScale * focusZoom; 
      o.scale.set(sc, sc, sc);
    } else if (o.userData.returning) {
      o.position.lerp(o.userData.home, 0.16);
      o.scale.lerp(new THREE.Vector3(1, 1, 1), 0.16);
      o.rotation.x += (0 - o.rotation.x) * 0.16;
      o.rotation.y += (0 - o.rotation.y) * 0.16;
      if (o.position.distanceTo(o.userData.home) < 0.02) o.userData.returning = 0;
    }
  });

  const opa = focused ? 0.16 : 1;
  pivot.traverse(m => {
    if (m.isMesh && !isChildOf(m, focused)) {
      if (!m.material._o) { m.material._o = m.material.opacity; m.material._tr = m.material.transparent; }
      const tgt = focused ? Math.min(m.material._o, 0.14) : m.material._o;
      m.material.transparent = focused ? true : m.material._tr;
      m.material.opacity += (tgt - m.material.opacity) * 0.12;
    }
  });

  renderer.render(scene, cam3);
}
function isChildOf(m,p){ if(!p)return false; let o=m; while(o){ if(o===p)return true; o=o.parent; } return false; }

function openBox(){
  document.getElementById('boxwrap').classList.add('on');
  zoom=1; rotX=-0.78; rotY=-0.30;
  if(!renderer){ initBox(); }
  else { sizeBox(); buildBox(); }
  requestAnimationFrame(()=>{ sizeBox(); fitCamera(true); });
}
function closeBox(){
  unfocus();
  document.getElementById('boxwrap').classList.remove('on');
  if(S.viewing){
    S.viewing=null;
    document.getElementById('boxOwner').textContent='RAFA.COLLECTS';
    buildBox();
  }
}

let miniR=null, miniToken=0;
function disposeMini(){
  if(!miniR)return;
  try{ miniR.forceContextLoss(); }catch(e){}
  try{ miniR.dispose(); }catch(e){}
  miniR=null;
}

function miniScene(canvas,w){
  if(!canvas)return;
  disposeMini();
  const my=++miniToken;
  try{ miniR=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true}); }
  catch(err){ console.warn('mini 3D indisponivel:',err.message); return; }
  const r=miniR;
  r.setPixelRatio(Math.min(devicePixelRatio,2));
  const sc=new THREE.Scene(), c=new THREE.PerspectiveCamera(34,canvas.clientWidth/230,0.1,50);
  sc.add(new THREE.HemisphereLight(0xCED3DB,0x101014,1.1));
  const d=new THREE.DirectionalLight(0xFFF4DC,1.6); d.position.set(4,8,6); sc.add(d);
  const g=makeWatch(w); g.scale.set(2.4,2.4,2.4); sc.add(g);
  c.position.set(0,2.6,3.6); c.lookAt(0,0,0);
  r.setSize(canvas.clientWidth,230,false);
  let dragL=false,lx=0,ly=0,spin=true;
  canvas.addEventListener('pointerdown',e=>{dragL=true;spin=false;lx=e.clientX;ly=e.clientY;canvas.setPointerCapture(e.pointerId)});
  canvas.addEventListener('pointermove',e=>{ if(!dragL)return;
    g.rotation.y+=(e.clientX-lx)/120; g.rotation.x=Math.max(-1.2,Math.min(1.2,g.rotation.x+(e.clientY-ly)/150));
    lx=e.clientX; ly=e.clientY; });
  canvas.addEventListener('pointerup',()=>dragL=false);
  (function loop(){
    if(my!==miniToken) return;
    if(!document.getElementById('detail').classList.contains('on')){ disposeMini(); return; }
    requestAnimationFrame(loop); if(spin) g.rotation.y+=0.006; r.render(sc,c); })();
}

/* =========================================================
   JULIOS
   ========================================================= */
let chatHistory=[];
function openChat(){
  document.getElementById('chat').classList.add('on');
  if(!chatHistory.length){ push('ai', t('welcome')); }
  setTimeout(()=>document.getElementById('chatIn').focus(),250);
}
function closeChat(){ document.getElementById('chat').classList.remove('on'); }

function push(who,txt){
  const m=document.createElement('div'); m.className='msg '+(who==='me'?'me':'ai'); m.textContent=txt;
  document.getElementById('msgs').appendChild(m);
  document.getElementById('msgs').scrollTop=1e6;
  return m;
}

function collectionContext(){
  return active().map(w=>({
    id:w.id, marca:w.brand, modelo:w.model, ref:w.ref, ano:w.year, categoria:w.cat,
    pago_brl:w.paid, mercado_brl:w.mkt, comprado_em:w.date,
    variacao_pct:+(((w.mkt-w.paid)/w.paid)*100).toFixed(1),
    oculto:S.hidden.has(w.id)
  }));
}

async function sendMsg(){
  const input=document.getElementById('chatIn'); const q=input.value.trim(); if(!q)return;
  input.value=''; push('me',q); chatHistory.push({role:'user',content:q});
  const wait=push('ai',''); wait.innerHTML='<span class="dots"><span></span><span></span><span></span></span>';

  const sys = `Você é Julios, curador de relojoaria dentro do app Community Watches.
Responda em ${S.lang==='pt'?'português do Brasil':'English'}. Tom: direto, conhecedor, sem bajulação. Máximo 5 frases, salvo se pedirem listas.
Você conhece APENAS os dados abaixo sobre a coleção do usuário — nunca invente peças, preços ou datas que não estejam aqui.
Você também pode responder sobre relojoaria em geral (história, mecânica, marcas) usando seu conhecimento.
Moeda principal do usuário: ${S.cur}. Cotação: 1 USD = R$ ${USD}.
Categorias válidas: ${CAT.join(', ')}.
Catálogo disponível para recomendações: ${JSON.stringify(CATALOG)}
Coleção do usuário: ${JSON.stringify(collectionContext())}
Grails atuais: ${JSON.stringify(GRAILS)}

Se o usuário pedir uma AÇÃO que altere o app (adicionar aos Grails, ocultar um relógio, mostrar de novo, reordenar a coleção), NÃO execute: proponha.
Responda SEMPRE em JSON puro, sem markdown, sem crase, neste formato:
{"reply":"sua resposta em texto","action":null}
ou, quando houver ação a propor:
{"reply":"texto curto","action":{"type":"grail|hide|show|sort","value":"nome do modelo ou id do relógio ou recent|value|brand|oldest","label":"descrição curta da ação para o usuário confirmar"}}`;

  try{
    const res=await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000,
        system:sys, messages:chatHistory.slice(-10) })
    });
    const data=await res.json();
    let txt=(data.content||[]).map(i=>i.text||'').join('').trim();
    txt=txt.replace(/```json|```/g,'').trim();
    let parsed; try{ parsed=JSON.parse(txt); }catch(e){ parsed={reply:txt,action:null}; }
    wait.textContent=parsed.reply||'';
    chatHistory.push({role:'assistant',content:JSON.stringify(parsed)});
    if(parsed.action) renderAction(parsed.action);
  }catch(err){
    wait.textContent = S.lang==='pt'
      ? 'Não consegui responder agora. Tente de novo em instantes.'
      : 'I could not answer just now. Try again in a moment.';
  }
  document.getElementById('msgs').scrollTop=1e6;
}

function renderAction(a){
  const box=document.createElement('div'); box.className='act';
  box.innerHTML=`<p>${t('confirmQ')}<br><span style="color:var(--gold)">${a.label||a.type}</span></p>
    <div class="r"><button class="y">${t('yesDo')}</button><button class="n">${t('noDo')}</button></div>`;
  document.getElementById('msgs').appendChild(box);
  box.querySelector('.n').onclick=()=>box.remove();
  box.querySelector('.y').onclick=()=>{ runAction(a); box.remove(); push('ai',t('done')); };
  document.getElementById('msgs').scrollTop=1e6;
}
function runAction(a){
  if(a.type==='grail'){
    toggleGrail(String(a.value));
  }
  if(a.type==='hide'||a.type==='show'){
    const w=WATCHES.find(x=>x.id===a.value || (x.brand+' '+x.model).toLowerCase().includes(String(a.value).toLowerCase()));
    if(w){ a.type==='hide'?S.hidden.add(w.id):S.hidden.delete(w.id); renderColl(); buildBox(); }
  }
  if(a.type==='sort'){ S.sort=a.value; renderColl(); }
  renderHome();
}

/* =========================================================
   DOCK SCROLL BEHAVIOR
   ========================================================= */
function initDockScroll(){
  const dock=document.getElementById('dock');
  if(!dock) return;
  const last=new WeakMap();
  const set=on=>dock.classList.toggle('mini',on);

  document.querySelectorAll('.screen').forEach(sc=>{
    last.set(sc,0);
    sc.addEventListener('scroll',()=>{
      if(!sc.classList.contains('on'))return;
      const y=sc.scrollTop, prev=last.get(sc)||0;
      if(y<48) set(false);          // topo: sempre expandida
      else if(y>prev+5) set(true);  // descendo: compacta
      else if(y<prev-5) set(false); // subindo: expande
      last.set(sc,y);
    },{passive:true});
  });

  document.querySelectorAll('#tabs .tab').forEach(b=>
    b.addEventListener('click',()=>set(false)));
}

/* =========================================================
   BOOT
   ========================================================= */
(function boot(){
  document.getElementById('logoSm').innerHTML = LOGO_SVG + `<div class="wm">Community Watches</div>`;
  const mark=document.createElement('div');
  mark.className='logoBig'; mark.style.opacity='.5'; mark.style.marginTop='34px';
  mark.innerHTML = LOGO_SVG + `<div class="wm">Community Watches</div>`;
  document.getElementById('s-prof').appendChild(mark);

  /* botao dourado dentro do card "Peças", criado por JS para nao mexer no HTML */
  const pecasCard = document.getElementById('kQty')?.closest('.kpi');
  if(pecasCard && !pecasCard.querySelector('.kpibtn')){
    const b=document.createElement('button');
    b.className='kpibtn';
    b.dataset.i='goColl';
    b.textContent=t('goColl');
    b.addEventListener('click',()=>go('coll'));
    pecasCard.appendChild(b);
  }

  document.getElementById('cbrl').classList.add('on');
  commTab(1); setYear(2023); applyLang(); initDockScroll(); renderNews(); startNewsAutoScroll();

  /* animacao das almofadas girando, usada nos cards "Abrir minha caixa" e "Grails" */
  function heroAnim(canvas, phase){
    if(!canvas) return;
    canvas.width=340; canvas.height=240;
    const x=canvas.getContext('2d'); if(!x) return;
    let a=phase||0;
    (function tick(){ requestAnimationFrame(tick); a+=0.006;
      x.clearRect(0,0,340,240); x.save(); x.translate(170,130);
      for(let i=0;i<6;i++){
        const px=(i%3-1)*54, pz=(Math.floor(i/3)-.5)*44;
        const sx=px*Math.cos(a)-pz*Math.sin(a), sy=(px*Math.sin(a)+pz*Math.cos(a))*0.42;
        x.beginPath(); x.ellipse(sx,sy,20,10,0,0,7);
        x.fillStyle= i<3?'rgba(201,162,39,.75)':'rgba(160,163,170,.55)'; x.fill();
      }
      x.restore();
    })();
  }

  heroAnim(document.getElementById('heroC'));

  /* o card de Grails nao tem canvas no HTML: e criado aqui, com defasagem
     para os dois nao girarem em sincronia */
  const grailBtn = document.querySelector('.hero [data-i="secGrails"]')?.closest('.hero');
  if(grailBtn && !grailBtn.querySelector('canvas')){
    const gc=document.createElement('canvas');
    gc.id='grailC';
    grailBtn.insertBefore(gc, grailBtn.firstChild);
    heroAnim(gc, Math.PI*0.6);
  }

  Object.assign(window, {
    go,
    openActivity,
    openBox,
    closeBox,
    resetView,
    toggleDrawer,
    unfocus,
    openDetailFromBox,
    openDetail,
    openDetailByModel,
    close_,
    openCatalog,
    renderCatalog,
    openGrails,
    renderGrailSheet,
    toggleGrail,
    addGrail,
    setNewsIndex,
    openScan,
    closeScan,
    doScan,
    openChat,
    closeChat,
    sendMsg,
    setYear,
    setLang,
    setCur,
    togglePriv,
    toggleDemo,
    toggleHide,
    setSort,
    filterBy,
    clearFilter,
    commTab,
    friend,
    askAccess,
    openFriend,
    openFriendBox
  });
})();
