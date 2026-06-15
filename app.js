// v7 - complete rewrite with i18n, localStorage, search, team sizing, fixed comparison logic
// ===== PRICING DATA (as of June 2026) =====

const TOOLS = {
  claudeCode: { name: "Claude Code", icon: "CC", subPlans: [{ name: "Pro", price: 20 }, { name: "Max 5x", price: 100 }, { name: "Max 20x", price: 200 }] },
  cursor: { name: "Cursor", icon: "Cu", subPlans: [{ name: "Free", price: 0 }, { name: "Pro", price: 20 }, { name: "Business", price: 40 }] },
  copilot: { name: "GitHub Copilot", icon: "Co", subPlans: [{ name: "Individual", price: 10 }, { name: "Business", price: 19 }, { name: "Enterprise", price: 39 }] },
  windsurf: { name: "Windsurf", icon: "Ws", subPlans: [{ name: "Free", price: 0 }, { name: "Pro", price: 15 }] },
  codex: { name: "OpenAI Codex", icon: "Cx", subPlans: [{ name: "Plus (ChatGPT)", price: 20 }, { name: "Pro (ChatGPT)", price: 200 }] },
  cline: { name: "Cline (BYOK)", icon: "Cl", subPlans: [{ name: "Free (API costs)", price: 0 }] },
  supermaven: { name: "Supermaven", icon: "Sm", subPlans: [{ name: "Free", price: 0 }, { name: "Pro", price: 10 }] },
};

const AI_SUBS = [
  { name: "ChatGPT Plus", price: 20, cat: "LLM" },
  { name: "ChatGPT Pro", price: 200, cat: "LLM" },
  { name: "ChatGPT Team", price: 25, cat: "LLM" },
  { name: "Claude Pro", price: 20, cat: "LLM" },
  { name: "Claude Max 5x", price: 100, cat: "LLM" },
  { name: "Claude Max 20x", price: 200, cat: "LLM" },
  { name: "Claude Team", price: 30, cat: "LLM" },
  { name: "Gemini Advanced", price: 20, cat: "LLM" },
  { name: "Google One AI Premium", price: 20, cat: "LLM" },
  { name: "Perplexity Pro", price: 20, cat: "LLM" },
  { name: "Poe Subscription", price: 20, cat: "LLM" },
  { name: "You.com Pro", price: 20, cat: "LLM" },
  { name: "Phind Pro", price: 17, cat: "LLM" },
  { name: "Grok (X Premium+)", price: 16, cat: "LLM" },
  { name: "GLM Coding Plan", price: 20, cat: "LLM" },
  { name: "Kimi", price: 16, cat: "LLM" },
  { name: "Qwen Plus", price: 10, cat: "LLM" },
  { name: "Cursor Pro", price: 20, cat: "Coding" },
  { name: "Cursor Business", price: 40, cat: "Coding" },
  { name: "GitHub Copilot", price: 10, cat: "Coding" },
  { name: "GitHub Copilot Business", price: 19, cat: "Coding" },
  { name: "Windsurf Pro", price: 15, cat: "Coding" },
  { name: "Supermaven Pro", price: 10, cat: "Coding" },
  { name: "Replit Core", price: 20, cat: "Coding" },
  { name: "Tabnine Pro", price: 12, cat: "Coding" },
  { name: "Sourcegraph Cody Pro", price: 9, cat: "Coding" },
  { name: "v0 by Vercel", price: 20, cat: "Coding" },
  { name: "Bolt.new Pro", price: 20, cat: "Coding" },
  { name: "Lovable Pro", price: 25, cat: "Coding" },
  { name: "Midjourney Basic", price: 10, cat: "Image" },
  { name: "Midjourney Standard", price: 30, cat: "Image" },
  { name: "Adobe Firefly", price: 10, cat: "Image" },
  { name: "Leonardo.ai Pro", price: 12, cat: "Image" },
  { name: "Ideogram Pro", price: 8, cat: "Image" },
  { name: "Stability AI Pro", price: 10, cat: "Image" },
  { name: "Magnific AI Relax", price: 39, cat: "Image" },
  { name: "Krea Pro", price: 10, cat: "Image" },
  { name: "Canva Pro (AI)", price: 13, cat: "Image" },
  { name: "Suno Pro", price: 10, cat: "Audio" },
  { name: "Suno Premier", price: 30, cat: "Audio" },
  { name: "ElevenLabs Starter", price: 5, cat: "Audio" },
  { name: "ElevenLabs Creator", price: 22, cat: "Audio" },
  { name: "Udio Standard", price: 10, cat: "Audio" },
  { name: "Murf.ai Pro", price: 19, cat: "Audio" },
  { name: "Runway Standard", price: 15, cat: "Video" },
  { name: "Pika Pro", price: 35, cat: "Video" },
  { name: "HeyGen Creator", price: 29, cat: "Video" },
  { name: "Descript Hobbyist", price: 12, cat: "Video" },
  { name: "Synthesia Starter", price: 29, cat: "Video" },
  { name: "Jasper Creator", price: 39, cat: "Writing" },
  { name: "Copy.ai Starter", price: 36, cat: "Writing" },
  { name: "Writesonic Individual", price: 13, cat: "Writing" },
  { name: "Rytr Unlimited", price: 9, cat: "Writing" },
  { name: "Surfer SEO Essential", price: 89, cat: "Writing" },
  { name: "DeepL Pro Starter", price: 9, cat: "Writing" },
  { name: "Otter.ai Pro", price: 17, cat: "Meeting" },
  { name: "Fireflies.ai Pro", price: 10, cat: "Meeting" },
  { name: "Fathom Pro", price: 19, cat: "Meeting" },
  { name: "tl;dv Pro", price: 20, cat: "Meeting" },
  { name: "Notion AI", price: 10, cat: "Productivity" },
  { name: "Superhuman", price: 30, cat: "Productivity" },
  { name: "Grammarly Pro", price: 12, cat: "Productivity" },
  { name: "Mem Pro", price: 15, cat: "Productivity" },
  { name: "Hugging Face Pro", price: 9, cat: "Platform" },
];

const API_PRICING = {
  claude_sonnet: { name: "Claude Sonnet 4", in: 3, out: 15 },
  claude_haiku: { name: "Claude Haiku 3.5", in: 0.8, out: 4 },
  gpt5: { name: "GPT-5", in: 5, out: 15 },
  gpt4o: { name: "GPT-4o", in: 2.5, out: 10 },
  gpt4o_mini: { name: "GPT-4o mini", in: 0.15, out: 0.6 },
  deepseek: { name: "DeepSeek V4", in: 0.27, out: 1.1 },
  gemini_pro: { name: "Gemini 2.5 Pro", in: 1.25, out: 10 },
  llama: { name: "Llama 4 Scout", in: 0.23, out: 0.4 },
  glm: { name: "GLM-4.6", in: 0.6, out: 2.2 },
  qwen: { name: "Qwen Max", in: 1.6, out: 6.4 },
  kimi: { name: "Moonshot (Kimi)", in: 3.3, out: 3.3 },
};

// ===== STATE =====
let currentLang = localStorage.getItem('aic_lang') || 'en';
let savedSubs = JSON.parse(localStorage.getItem('aic_subs') || '[]');
let savedPrices = JSON.parse(localStorage.getItem('aic_prices') || '{}');
let savedCmpPrices = JSON.parse(localStorage.getItem('aic_cmp_prices') || '{}');
let customSubs = JSON.parse(localStorage.getItem('aic_custom') || '[]');

function t(en, zh) { return currentLang === 'zh' ? zh : en; }
function fmt(n) { return currentLang === 'zh' ? ('\u00a5' + (n * 7.2).toFixed(0)) : ('$' + n.toFixed(0)); }
function fmtP(n) { return currentLang === 'zh' ? ('\u00a5' + (n * 7.2).toFixed(2)) : ('$' + n.toFixed(2)); }

// ===== HASH ROUTER =====
// Routes: #/audit  #/compare  #/api  #/zh/audit  #/zh/compare  #/zh/api
const ROUTE_MAP = {
  'audit': 'stack',
  'compare': 'compare',
  'api': 'breakEven',
};
const ROUTE_NAMES = { 'stack': 'audit', 'compare': 'compare', 'breakEven': 'api' };

function parseHash() {
  var hash = location.hash.replace(/^#\/?/, '');
  var parts = hash.split('/');
  var lang = null, tab = null;
  parts.forEach(function(p) {
    if (p === 'zh' || p === 'en') lang = p;
    else if (ROUTE_MAP[p]) tab = ROUTE_MAP[p];
  });
  return { lang: lang, tab: tab };
}

function updateHash(lang, tab, push) {
  var routeName = ROUTE_NAMES[tab] || 'audit';
  var langPrefix = (lang === 'zh') ? 'zh/' : '';
  var newHash = '#/' + langPrefix + routeName;
  if (location.hash !== newHash) {
    if (push) history.pushState(null, '', newHash);
    else history.replaceState(null, '', newHash);
  }
}

function applyRoute() {
  var r = parseHash();
  var newLang = r.lang || 'en';  // URL is source of truth; no prefix = English
  var newTab = r.tab || 'stack';
  // Apply lang if changed
  if (newLang !== currentLang) {
    currentLang = newLang;
    localStorage.setItem('aic_lang', newLang);
    document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    var btn = document.getElementById('lang' + newLang.charAt(0).toUpperCase() + newLang.slice(1));
    if (btn) btn.classList.add('active');
    applyStaticI18n();
  }
  // Apply tab
  switchTabSilent(newTab);
  // Sync URL (in case hash was partial like just #/zh)
  updateHash(currentLang, newTab);
}

// ===== LANG SWITCH =====
function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('aic_lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  var btn = document.getElementById('lang' + lang.charAt(0).toUpperCase() + lang.slice(1));
  if (btn) btn.classList.add('active');
  applyStaticI18n();
  renderSubs();
  calcCompare();
  calcBreakEven();
  updateHash(lang, getActiveTab(), true);
}

function applyStaticI18n() {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = t(el.dataset.en, el.dataset.zh);
  });
  document.querySelectorAll('[data-en-ph]').forEach(el => {
    el.placeholder = t(el.dataset.enPh, el.dataset.zhPh);
  });
}

// ===== TAB SWITCHING =====
function getActiveTab() {
  var active = document.querySelector('.tab.active');
  return active ? active.dataset.tab : 'stack';
}

function switchTabSilent(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.pane').forEach(p => p.classList.remove('active'));
  var btn = document.querySelector('.tab[data-tab="' + tabId + '"]');
  var pane = document.getElementById('tab-' + tabId);
  if (btn) btn.classList.add('active');
  if (pane) pane.classList.add('active');
  if (tabId === 'compare') calcCompare();
  if (tabId === 'stack') renderSubs();
  if (tabId === 'breakEven') calcBreakEven();
}

function switchTab(tabId) {
  switchTabSilent(tabId);
  updateHash(currentLang, tabId, true);
}

// ===== TAB 1: COMPARISON =====
function calcCompare() {
  const hours = parseFloat(document.getElementById('cmpHours') ? document.getElementById('cmpHours').value : 4);
  const complexity = document.getElementById('cmpComplexity') ? document.getElementById('cmpComplexity').value : 'medium';
  const workDays = parseFloat(document.getElementById('cmpDays') ? document.getElementById('cmpDays').value : 20);
  const teamSize = parseInt(document.getElementById('cmpTeam') ? document.getElementById('cmpTeam').value : 1);

  const cdata = {
    light:  { tph: 8000,  inR: 0.6,  outR: 0.4 },
    medium: { tph: 25000, inR: 0.75, outR: 0.25 },
    heavy:  { tph: 80000, inR: 0.85, outR: 0.15 },
  };
  const cd = cdata[complexity];
  const totalTokens = cd.tph * hours * workDays;
  const inputTokens = totalTokens * cd.inR;
  const outputTokens = totalTokens * cd.outR;

  const toolDefs = [
      { key: 'claudeCode', plan: 'Max 5x', subPrice: 100, model: 'claude_sonnet', quota: Infinity,
        dEn: 'Agentic coding, full Claude power', dZh: 'Agent编程，Claude全力' },
      { key: 'cursor', plan: 'Pro', subPrice: 20, model: 'claude_sonnet', quota: 500000,
        dEn: 'IDE with AI, fast autocomplete', dZh: 'AI IDE，快速补全' },
      { key: 'copilot', plan: 'Individual', subPrice: 10, model: 'gpt4o_mini', quota: 300000,
        dEn: 'Inline completion + chat', dZh: '行内补全 + 对话' },
      { key: 'windsurf', plan: 'Pro', subPrice: 15, model: 'claude_sonnet', quota: 400000,
        dEn: 'Cascade agent, multi-file edits', dZh: 'Cascade Agent，多文件编辑' },
      { key: 'codex', plan: 'Plus', subPrice: 20, model: 'gpt5', quota: 600000,
        dEn: 'Cloud coding agent by OpenAI', dZh: 'OpenAI 云端编程 Agent' },
      { key: 'cline', plan: 'BYOK', subPrice: 0, model: 'claude_sonnet', quota: 0,
        dEn: 'Open-source, you pay API directly', dZh: '开源，API 按量付费' },
      { key: 'supermaven', plan: 'Pro', subPrice: 10, model: 'gpt4o_mini', quota: 250000,
        dEn: 'Ultra-fast autocomplete', dZh: '超快自动补全' },
    ].map(function(d) { d.subPrice = savedCmpPrices[d.key] !== undefined ? savedCmpPrices[d.key] : d.subPrice; return d; });

  const results = toolDefs.map(r => {
    const api = API_PRICING[r.model];
    const fullApiCost = (inputTokens / 1e6 * api.in) + (outputTokens / 1e6 * api.out);
    let totalCost, overage = 0;
    if (r.subPrice === 0) {
      totalCost = fullApiCost;
    } else if (totalTokens <= r.quota) {
      totalCost = r.subPrice;
    } else {
      const over = totalTokens - r.quota;
      overage = (over * cd.inR / 1e6 * api.in) + (over * cd.outR / 1e6 * api.out);
      totalCost = r.subPrice + overage;
    }
    return { ...r, apiCost: fullApiCost, overage, perPerson: totalCost, effectiveMonthly: totalCost * teamSize };
  });

  results.sort((a, b) => a.effectiveMonthly - b.effectiveMonthly);
  const minCost = results[0].effectiveMonthly;
  const maxCost = results[results.length - 1].effectiveMonthly;

  const grid = document.getElementById('compareGrid');
  if (!grid) return;
  grid.innerHTML = results.map(r => {
    const isBest = r.effectiveMonthly === minCost;
    const isWorst = r.effectiveMonthly === maxCost && maxCost > minCost * 1.5;
    const tool = TOOLS[r.key] || { icon: '?', name: r.key };
    const desc = t(r.dEn, r.dZh);
    let detailParts = [];
    if (r.subPrice > 0) {
      var isEdited = savedCmpPrices[r.key] !== undefined;
      detailParts.push(t('Sub', '订阅') + ': <span class="cmp-price-edit' + (isEdited ? ' edited' : '') + '" onclick="editCmpPrice(this,event)" data-key="' + r.key + '" style="cursor:pointer;color:' + (isEdited ? 'var(--accent);font-weight:600' : 'inherit') + '">' + fmt(r.subPrice) + '/mo ✎</span>');
      if (r.overage > 0) detailParts.push(t('Overage', '超额') + ': ' + fmt(r.overage));
    } else {
      detailParts.push(t('API cost', 'API成本') + ': ' + fmt(r.apiCost));
    }
    if (teamSize > 1) detailParts.push(fmt(r.perPerson) + t('/person', '/人'));
    return '<div class="compare-card ' + (isBest ? 'best' : '') + '">' +
      (isBest ? '<div class="badge best">' + t('Cheapest', '最便宜') + '</div>' : '') +
      (isWorst ? '<div class="badge worst">' + t('Costliest', '最贵') + '</div>' : '') +
      '<div class="b-badge-icon">' + tool.icon + '</div>' +
      '<div class="b-name">' + tool.name + '</div>' +
      '<div class="b-price">' + fmt(r.effectiveMonthly) + '<span style="font-size:.7rem;color:var(--text-dim)">/mo</span></div>' +
      '<div class="b-desc">' + desc + '</div>' +
      '<div class="b-detail">' + detailParts.join('<br>') + '</div></div>';
  }).join('');

  const chart = document.getElementById('compareChart');
  if (chart) {
    chart.innerHTML = results.map(r => {
      const pct = maxCost > 0 ? (r.effectiveMonthly / maxCost) * 100 : 0;
      const color = r.effectiveMonthly === minCost ? 'var(--accent)' : r.effectiveMonthly === maxCost ? 'var(--red)' : 'var(--blue)';
      return '<div class="bar-row"><div class="b-name">' + ((TOOLS[r.key]||{}).name||r.key) + '</div>' +
        '<div class="b-track"><div class="b-fill" style="width:' + pct + '%;background:' + color + '">' + (r.effectiveMonthly > maxCost*0.15 ? fmt(r.effectiveMonthly) : '') + '</div></div>' +
        '<div class="b-val">' + fmt(r.effectiveMonthly) + '</div></div>';
    }).join('');
  }

  const summary = document.getElementById('compareSummary');
  if (summary) {
    const savings = maxCost - minCost;
    const cheapestName = (TOOLS[results[0].key]||{}).name;
    const expensiveName = (TOOLS[results[results.length-1].key]||{}).name;
    const teamNote = teamSize > 1 ? ' (' + teamSize + t(' people', '人') + ')' : '';
    if (currentLang === 'zh') {
      const cm = {light:'轻度',medium:'中度',heavy:'重度'}[complexity];
      summary.innerHTML = '基于 <strong>' + hours + ' 小时/天</strong> x ' + workDays + ' 天，<strong>' + cm + '</strong>复杂度(~' + (totalTokens/1e6).toFixed(1) + 'M tokens/月)' + teamNote + '：最便宜 <strong style="color:var(--accent)">' + cheapestName + '</strong>(' + fmt(minCost) + '/月)，最贵 <strong style="color:var(--red)">' + expensiveName + '</strong>(' + fmt(maxCost) + '/月)，月省 <strong style="color:var(--accent)">' + fmt(savings) + '</strong>(年省' + fmt(savings*12) + ')。';
    } else {
      summary.innerHTML = 'Based on <strong>' + hours + ' hrs/day</strong> x ' + workDays + ' days, <strong>' + complexity + '</strong> (~' + (totalTokens/1e6).toFixed(1) + 'M tokens/mo)' + teamNote + ': Cheapest <strong style="color:var(--accent)">' + cheapestName + '</strong> at ' + fmt(minCost) + '/mo. Most expensive <strong style="color:var(--red)">' + expensiveName + '</strong> at ' + fmt(maxCost) + '/mo. Save up to <strong style="color:var(--accent)">' + fmt(savings) + '/mo</strong> (' + fmt(savings*12) + '/yr).';
    }
  }
}

// ===== TAB 2: SUBSCRIPTION STACK =====
function renderSubs() {
  const container = document.getElementById('subList');
  if (!container) return;
  const searchTerm = (document.getElementById('subSearch') ? document.getElementById('subSearch').value : '').toLowerCase();
  const allSubs = AI_SUBS.concat(customSubs);
  const categories = {};
  allSubs.forEach(function(s) {
    if (searchTerm && s.name.toLowerCase().indexOf(searchTerm) < 0) return;
    if (!categories[s.cat]) categories[s.cat] = [];
    categories[s.cat].push(s);
  });
  let html = '';
  Object.keys(categories).forEach(function(cat) {
    if (categories[cat].length === 0) return;
    html += '<div class="cat-label">' + cat + '</div>';
    categories[cat].forEach(function(s, idx) {
      var id = 'sub_' + cat + '_' + idx;
      var isChecked = savedSubs.indexOf(s.name) >= 0;
      var customPrice = savedPrices[s.name];
      var displayPrice = customPrice !== undefined ? customPrice : s.price;
      var isCustom = customSubs.indexOf(s) >= 0;
            var isEdited = customPrice !== undefined;
            html += '<div class="sub-item ' + (isChecked ? 'checked' : '') + '" data-price="' + displayPrice + '" data-name="' + s.name + '" onclick="toggleSub(this)">';
            html += '<div class="left"><div class="cb"></div>';
            html += '<div class="name">' + s.name + (isCustom ? ' <span class="custom-tag">custom</span>' : '') + '</div></div>';
            html += '<div class="price' + (isEdited ? ' edited' : '') + '" onclick="editPrice(this,event)">' + fmt(displayPrice) + '/mo<span class="edit-icon">✎</span></div></div>';
    });
  });
  if (html === '') html = '<div style="text-align:center;color:var(--text-dim);padding:20px">' + t('No results', '无结果') + '</div>';
  container.innerHTML = html;
  recalcSubs();
}

function toggleSub(el) {
  el.classList.toggle('checked');
  var name = el.dataset.name;
  if (el.classList.contains('checked')) {
    if (savedSubs.indexOf(name) < 0) savedSubs.push(name);
  } else {
    savedSubs = savedSubs.filter(function(s) { return s !== name; });
  }
  localStorage.setItem('aic_subs', JSON.stringify(savedSubs));
  recalcSubs();
}

function toggleAllOff() {
  document.querySelectorAll('.sub-item.checked').forEach(function(el) { el.classList.remove('checked'); });
  savedSubs = [];
  localStorage.setItem('aic_subs', JSON.stringify(savedSubs));
  recalcSubs();
}

function editPrice(el, e) {
  e.stopPropagation();
  var item = el.closest('.sub-item');
  var name = item.dataset.name;
  var oldPrice = parseFloat(item.dataset.price);
  var input = document.createElement('input');
  input.type = 'number';
  input.value = oldPrice;
  input.step = '0.5';
  input.style.cssText = 'width:60px;background:var(--bg);border:1px solid var(--accent);color:var(--text);border-radius:4px;padding:2px 4px;font-size:.85rem;text-align:right';
  el.replaceWith(input);
  input.focus(); input.select();
  var done = false;
  var commit = function() {
    if (done) return; done = true;
    var newPrice = parseFloat(input.value);
    if (!isNaN(newPrice) && newPrice >= 0) {
      savedPrices[name] = newPrice;
      localStorage.setItem('aic_prices', JSON.stringify(savedPrices));
    }
    renderSubs(); recalcSubs();
  };
  input.addEventListener('blur', commit);
  input.addEventListener('keydown', function(ev) { if (ev.key === 'Enter') commit(); });
}

function editCmpPrice(el, e) {
  e.stopPropagation();
  var key = el.dataset.key;
  var oldPrice = parseFloat(el.textContent.replace(/[^0-9.]/g, '')) || 0;
  var input = document.createElement('input');
  input.type = 'number';
  input.value = oldPrice;
  input.step = '0.5';
  input.style.cssText = 'width:55px;background:var(--bg);border:1px solid var(--accent);color:var(--text);border-radius:4px;padding:1px 3px;font-size:.75rem;text-align:right;display:inline';
  el.replaceWith(input);
  input.focus(); input.select();
  var done = false;
  var commit = function() {
    if (done) return; done = true;
    var newPrice = parseFloat(input.value);
    if (!isNaN(newPrice) && newPrice >= 0) {
      savedCmpPrices[key] = newPrice;
      localStorage.setItem('aic_cmp_prices', JSON.stringify(savedCmpPrices));
    }
    calcCompare();
  };
  input.addEventListener('blur', commit);
  input.addEventListener('keydown', function(ev) { if (ev.key === 'Enter') commit(); });
}

function addCustomSub() {
  var nameInput = document.getElementById('customSubName');
  var priceInput = document.getElementById('customSubPrice');
  var name = nameInput.value.trim();
  var price = parseFloat(priceInput.value);
  if (!name || isNaN(price) || price < 0) return;
  customSubs.push({ name: name, price: price, cat: 'Custom' });
  localStorage.setItem('aic_custom', JSON.stringify(customSubs));
  if (savedSubs.indexOf(name) < 0) savedSubs.push(name);
  localStorage.setItem('aic_subs', JSON.stringify(savedSubs));
  nameInput.value = ''; priceInput.value = '';
  renderSubs(); recalcSubs();
}

function filterSubs() { renderSubs(); }

function recalcSubs() {
  var teamSize = parseInt(document.getElementById('auditTeam') ? document.getElementById('auditTeam').value : 1);
  var checked = document.querySelectorAll('.sub-item.checked');
  var monthlyPer = 0;
  var items = [];
  checked.forEach(function(el) {
    var p = parseFloat(el.dataset.price);
    monthlyPer += p;
    items.push({ name: el.dataset.name, price: p });
  });
  var monthly = monthlyPer * teamSize;
  var yearly = monthly * 12;
  var weekly = monthly / 4.33;
  var daily = monthly / 30;

  var elM = document.getElementById('subMonthly');
  var elY = document.getElementById('subYearly');
  var elD = document.getElementById('subDaily');
  var elW = document.getElementById('subWeekly');
  var elCount = document.getElementById('subCount');
  var elMsg = document.getElementById('subMsg');
  var elBd = document.getElementById('subBreakdown');

  if (elM) { elM.textContent = fmt(monthly); elM.classList.toggle('red', monthlyPer > 100); }
  if (elY) elY.textContent = fmt(yearly);
  if (elD) elD.textContent = fmtP(daily);
  if (elW) elW.textContent = fmt(weekly);
  if (elCount) elCount.textContent = checked.length;

  if (elMsg) {
    var m = fmt(monthlyPer), y = fmt(yearly);
    if (monthlyPer === 0) {
      elMsg.innerHTML = '<div class="tip">' + t('Check boxes above to see your total.', '勾选上方选项查看总支出。') + '</div>';
    } else if (monthlyPer < 40) {
      elMsg.innerHTML = '<div class="tip"><strong>' + m + '/mo</strong> - ' + t('reasonable. At ' + y + '/yr, consider annual plans.', '合理。年度 ' + y + '，可考虑年付。') + '</div>';
    } else if (monthlyPer < 100) {
      elMsg.innerHTML = '<div class="warn"><strong>' + m + '/mo</strong> - ' + t('getting up there (' + y + '/yr). Consider consolidating.', '偏高了(' + y + '/年)。建议合并重复订阅。') + '</div>';
    } else {
      elMsg.innerHTML = '<div class="warn"><strong>' + m + '/mo?! (' + y + '/yr)</strong> ' + t('Top tier spender. Drop duplicates, use API-only for low-use tools.', '高消费。去掉重复、低频改API。') + '</div>';
    }
  }

  if (elBd && items.length > 0) {
    items.sort(function(a, b) { return b.price - a.price; });
    elBd.innerHTML = '<div style="font-size:.8rem;color:var(--text-dim);margin-bottom:6px">' + t('Cost breakdown:', '成本明细：') + '</div>' +
      items.map(function(i) {
        return '<div style="display:flex;justify-content:space-between;font-size:.82rem;padding:3px 0;border-bottom:1px solid var(--border)"><span>' + i.name + '</span><span>' + fmt(i.price * teamSize) + '/mo</span></div>';
      }).join('');
  } else if (elBd) {
    elBd.innerHTML = '';
  }
}

// ===== TAB 3: BREAK-EVEN =====
function calcBreakEven() {
  var sessions = parseFloat(document.getElementById('beSessions') ? document.getElementById('beSessions').value : 30);
  var avgInput = parseFloat(document.getElementById('beInputTokens') ? document.getElementById('beInputTokens').value : 50000);
  var avgOutput = parseFloat(document.getElementById('beOutputTokens') ? document.getElementById('beOutputTokens').value : 10000);
  var avgCache = parseFloat(document.getElementById('beCache') ? document.getElementById('beCache').value : 0);
  var model = document.getElementById('beModel') ? document.getElementById('beModel').value : 'claude_sonnet';

  var api = API_PRICING[model];
  var inputCost = sessions * avgInput / 1e6 * api.in;
  var outputCost = sessions * avgOutput / 1e6 * api.out;
  var cacheCost = sessions * avgCache / 1e6 * api.in * 0.1;
  var apiMonthly = inputCost + outputCost + cacheCost;
  var monthlyTokens = sessions * (avgInput + avgOutput + avgCache);
  var sub5x = 100, sub20x = 200;

  var elApi = document.getElementById('beApiCost');
  var elApiT = document.getElementById('beApiTokens');
  var elRec = document.getElementById('beRecommendation');
  var elChart = document.getElementById('beChart');
  var elSav = document.getElementById('beSavings');

  if (elApi) elApi.textContent = fmtP(apiMonthly);
  if (elApiT) elApiT.textContent = (monthlyTokens / 1e6).toFixed(1) + 'M';

  if (elRec) {
    var rec = '';
    if (apiMonthly < 20) {
      rec = '<div class="tip"><strong>' + t('Use API.', '用 API。') + '</strong> ' + t(fmtP(apiMonthly) + '/mo - below any subscription.', fmtP(apiMonthly) + '/月 - 远低于任何订阅。') + '</div>';
    } else if (apiMonthly < 60) {
      rec = '<div class="tip"><strong>' + t('Use API.', '用 API。') + '</strong> ' + t(fmtP(apiMonthly) + '/mo, cheaper than Max 5x by ' + fmt(100 - apiMonthly) + '/mo.', fmtP(apiMonthly) + '/月，比 Max 5x 月省 ' + fmt(100 - apiMonthly) + '。') + '</div>';
    } else if (apiMonthly < 100) {
      rec = '<div class="warn"><strong>' + t("It's close.", '接近平衡。') + '</strong> ' + t(fmtP(apiMonthly) + '/mo approaching Max 5x ($100).', fmtP(apiMonthly) + '/月接近 Max 5x ($100)。') + '</div>';
    } else if (apiMonthly < 200) {
      rec = '<div class="warn"><strong>' + t('Subscribe Max 5x ($100).', '订阅 Max 5x ($100)。') + '</strong> ' + t('API would be ' + fmtP(apiMonthly) + ' - saves ' + fmt(apiMonthly - 100) + '/mo.', 'API需 ' + fmtP(apiMonthly) + ' - 月省 ' + fmt(apiMonthly - 100) + '。') + '</div>';
    } else {
      rec = '<div class="warn"><strong>' + t('Subscribe Max 20x ($200).', '订阅 Max 20x ($200)。') + '</strong> ' + t('API would be ' + fmtP(apiMonthly) + ' - saves ' + fmt(apiMonthly - 200) + '/mo.', 'API需 ' + fmtP(apiMonthly) + ' - 月省 ' + fmt(apiMonthly - 200) + '。') + '</div>';
    }
    elRec.innerHTML = rec;
  }

  if (elChart) {
    var data = [
      { name: 'API (' + api.name + ')', cost: apiMonthly, color: 'var(--blue)' },
      { name: 'Claude Code Max 5x', cost: sub5x, color: apiMonthly > sub5x ? 'var(--accent)' : 'var(--text-dim)' },
      { name: 'Claude Code Max 20x', cost: sub20x, color: apiMonthly > sub20x ? 'var(--accent)' : 'var(--text-dim)' },
      { name: 'Cursor Pro', cost: 20, color: 'var(--text-dim)' },
      { name: 'Copilot', cost: 10, color: 'var(--text-dim)' },
    ];
    var maxC = Math.max.apply(null, data.map(function(d) { return d.cost; }).concat([1]));
    elChart.innerHTML = data.map(function(d) {
      var pct = (d.cost / maxC) * 100;
      return '<div class="bar-row"><div class="b-name">' + d.name + '</div>' +
        '<div class="b-track"><div class="b-fill" style="width:' + pct + '%;background:' + d.color + '">' + (d.cost/maxC > 0.2 ? fmt(d.cost) : '') + '</div></div>' +
        '<div class="b-val">' + fmt(d.cost) + '</div></div>';
    }).join('');
  }

  if (elSav) {
    var cheapest = Math.min(apiMonthly, sub5x, sub20x);
    var mostExpensive = Math.max(apiMonthly, sub20x);
    var savings = mostExpensive - cheapest;
    elSav.innerHTML = t('Right plan saves up to <strong style="color:var(--accent)">' + fmt(savings) + '/mo</strong> (' + fmt(savings * 12) + '/yr).',
      '选对方案月省 <strong style="color:var(--accent)">' + fmt(savings) + '</strong>(年省' + fmt(savings * 12) + ')。');
  }
}

function toggleFAQ(el) { el.classList.toggle('open'); }

function exportResult() {
  var checked = document.querySelectorAll('.sub-item.checked');
  var monthlyPer = 0;
  var items = [];
  checked.forEach(function(el) {
    var p = parseFloat(el.dataset.price);
    monthlyPer += p;
    items.push({ name: el.dataset.name, price: p });
  });
  var zh = currentLang === 'zh';
  var text = (zh ? 'AI 订阅成本报告' : 'AI Subscription Cost Report') + '\\n================================\\n\\n';
  text += (zh ? '月度: ' : 'Monthly: ') + fmt(monthlyPer) + '\\n';
  text += (zh ? '年度: ' : 'Yearly: ') + fmt(monthlyPer * 12) + '\\n';
  text += (zh ? '订阅数: ' : 'Subscriptions: ') + items.length + '\\n\\n';
  text += (zh ? '明细:\\n' : 'Breakdown:\\n');
  items.sort(function(a,b){return b.price-a.price;}).forEach(function(i) {
    text += '  ' + i.name + ': ' + fmt(i.price) + '/mo\\n';
  });
  text += '\\n' + (zh ? '生成自 aicosts.bmaster.cn' : 'Generated from aicosts.bmaster.cn');
  var blob = new Blob([text], { type: 'text/plain' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = zh ? 'AI成本报告.txt' : 'AI-cost-report.txt';
  a.click();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
  if (currentLang === 'zh') document.documentElement.lang = 'zh-CN';
  applyStaticI18n();

  ['cmpHours', 'cmpComplexity', 'cmpDays', 'cmpTeam'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', calcCompare);
  });
  ['beSessions', 'beInputTokens', 'beOutputTokens', 'beCache', 'beModel'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', calcBreakEven);
  });
  var st = document.getElementById('auditTeam');
  if (st) st.addEventListener('input', recalcSubs);
  var search = document.getElementById('subSearch');
  if (search) search.addEventListener('input', filterSubs);

  // Slider value displays
  var ct = document.getElementById('cmpTeam');
  if (ct) {
    var ctv = document.getElementById('cmpTeamVal');
    if (ctv) ct.addEventListener('input', function() { ctv.textContent = ct.value; });
  }
  var at = document.getElementById('auditTeam');
  if (at) {
    var atv = document.getElementById('auditTeamVal');
    if (atv) at.addEventListener('input', function() { atv.textContent = at.value; });
  }

  // Initial render of all data
  renderSubs();
  calcCompare();
  calcBreakEven();

  // First visit with no hash: redirect to saved language preference
  if (!location.hash) {
    var savedLang = localStorage.getItem('aic_lang') || 'en';
    var prefix = savedLang === 'zh' ? 'zh/' : '';
    history.replaceState(null, '', '#/' + prefix + 'audit');
  }
  // Apply route from URL hash, then listen for hash changes
  applyRoute();
  window.addEventListener('hashchange', applyRoute);
  window.addEventListener('popstate', applyRoute);
});
