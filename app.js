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
let customSubs = JSON.parse(localStorage.getItem('aic_custom') || '[]');

function t(en, zh) { return currentLang === 'zh' ? zh : en; }
function fmt(n) { return currentLang === 'zh' ? ('\u00a5' + (n * 7.2).toFixed(0)) : ('$' + n.toFixed(0)); }
function fmtP(n) { return currentLang === 'zh' ? ('\u00a5' + (n * 7.2).toFixed(2)) : ('$' + n.toFixed(2)); }

// ===== HASH ROUTER =====
// Routes: #/audit  #/models  #/zh/audit  #/zh/models
const ROUTE_MAP = {
  'audit': 'stack',
  'models': 'models',
};
const ROUTE_NAMES = { 'stack': 'audit', 'models': 'models' };

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
  if (document.querySelector('.tab[data-tab="models"]')) mpRender();
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
  if (tabId === 'stack') renderSubs();
  if (tabId === 'models') mpInit();
}

function switchTab(tabId) {
  switchTabSilent(tabId);
  updateHash(currentLang, tabId, true);
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

var mpData = null, mpSortKey = 'cost', mpSortDir = 1, mpTier = 'all';

function mpInit() {
  // Wire up event listeners (only once)
  if (!document.getElementById('mpPrompts').dataset.bound) {
    ['mpPrompts','mpInput','mpOutput','mpDays'].forEach(function(id){
      var el = document.getElementById(id);
      if (el) { el.addEventListener('input', mpRender); el.dataset.bound = '1'; }
    });
    var search = document.getElementById('mpSearch');
    if (search) { search.addEventListener('input', mpRender); search.dataset.bound = '1'; }
  }
  // Fetch data if not cached
  if (mpData) {
    mpRender();
  } else {
    mpFetchData();
  }
}

function mpFetchData() {
  var summary = document.getElementById('mpSummary');
  var table = document.getElementById('mpTable');
  if (summary) summary.innerHTML = '<span style="color:var(--text-dim)">' + t('Loading model data from OpenRouter...', '正在从 OpenRouter 加载模型数据...') + '</span>';
  if (table) table.innerHTML = '';

  fetch('https://openrouter.ai/api/v1/models')
    .then(function(r) { return r.json(); })
    .then(function(json) {
      var models = (json.data || []).filter(function(m) {
        var p = m.pricing || {};
        var inp = parseFloat(p.prompt) || -1;
        var out = parseFloat(p.completion) || -1;
        return inp > 0 && out > 0;   // only paid text models
      }).map(function(m) {
        var p = m.pricing || {};
        var inp = parseFloat(p.prompt) * 1e6;
        var out = parseFloat(p.completion) * 1e6;
        var ctx = m.context_length || 0;
        var provider = (m.id || '').split('/')[0] || '';
        var tier = mpClassifyTier(inp, out, provider, m.id || '');
        return {
          id: m.id,
          name: m.name || m.id,
          provider: provider,
          inp: inp,
          out: out,
          ctx: ctx,
          tier: tier,
        };
      });
      mpData = models;
      mpRender();
    })
    .catch(function(err) {
      // Fallback: use hardcoded API_PRICING
      mpData = Object.keys(API_PRICING).map(function(k) {
        var m = API_PRICING[k];
        var combined = m.in + m.out;
        return {
          id: k, name: m.name, provider: 'builtin',
          inp: m.in, out: m.out, ctx: 200000,
          tier: combined < 2 ? 'budget' : combined < 20 ? 'mid' : 'flagship',
        };
      });
      if (summary) summary.innerHTML = '<span style="color:#f85149">' + t('Could not reach OpenRouter API. Showing cached data.', '无法连接 OpenRouter API，显示缓存数据。') + '</span>';
      mpRender();
    });
}

function mpClassifyTier(inp, out, provider, id) {
  var combined = inp + out;
  var idLow = id.toLowerCase();
  // Flagship: premium models
  if (/opus|gpt-5(?!.*mini)(?!.*nano)|pro$|fable|grok-4|sonnet|gemini.*pro/.test(idLow)) {
    if (combined > 5) return 'flagship';
  }
  if (combined > 15) return 'flagship';
  // Budget: very cheap
  if (combined < 1) return 'budget';
  // Mid-tier: everything else
  return 'mid';
}

function mpFilterTier(tier) {
  mpTier = tier;
  document.querySelectorAll('.mp-filter').forEach(function(b) { b.classList.remove('active'); });
  var btn = document.querySelector('.mp-filter[data-tier="' + tier + '"]');
  if (btn) btn.classList.add('active');
  mpRender();
}

function mpGetUsage() {
  var prompts = parseInt(document.getElementById('mpPrompts') ? document.getElementById('mpPrompts').value : 50);
  var inpTok = parseInt(document.getElementById('mpInput') ? document.getElementById('mpInput').value : 2000);
  var outTok = parseInt(document.getElementById('mpOutput') ? document.getElementById('mpOutput').value : 500);
  var days = parseInt(document.getElementById('mpDays') ? document.getElementById('mpDays').value : 22);
  return { prompts: prompts, inpTok: inpTok, outTok: outTok, days: days };
}

function mpRender() {
  if (!mpData) return;
  var u = mpGetUsage();
  var search = (document.getElementById('mpSearch') ? document.getElementById('mpSearch').value : '').toLowerCase();
  var isZh = currentLang === 'zh';

  // Build list with cost calc
  var list = mpData.filter(function(m) {
    if (mpTier !== 'all' && m.tier !== mpTier) return false;
    if (search && m.id.toLowerCase().indexOf(search) < 0 && m.name.toLowerCase().indexOf(search) < 0) return false;
    return true;
  }).map(function(m) {
    var monthlyInTokens = u.prompts * u.inpTok * u.days;
    var monthlyOutTokens = u.prompts * u.outTok * u.days;
    var cost = (monthlyInTokens * m.inp + monthlyOutTokens * m.out) / 1e6;
    return Object.assign({}, m, { cost: cost, totalTok: monthlyInTokens + monthlyOutTokens });
  });

  // Sort
  list.sort(function(a, b) {
    var va = a[mpSortKey], vb = b[mpSortKey];
    if (typeof va === 'string') { va = va.toLowerCase(); vb = (vb||'').toLowerCase(); }
    return (va < vb ? -1 : va > vb ? 1 : 0) * mpSortDir;
  });

  // Limit to top 40
  var display = list.slice(0, 40);
  var minCost = list.length ? list.reduce(function(min, m) { return Math.min(min, m.cost); }, Infinity) : 0;
  var maxCost = list.length ? list.reduce(function(max, m) { return Math.max(max, m.cost); }, 0) : 0;

  // Summary
  var summary = document.getElementById('mpSummary');
  if (summary) {
    var cheapest = list.length ? list.reduce(function(c,m){ return m.cost < c.cost ? m : c; }, list[0]) : null;
    var mostExp = list.length ? list.reduce(function(c,m){ return m.cost > c.cost ? m : c; }, list[0]) : null;
    var cheapestName = cheapest ? cheapest.name.replace(/\s*\(.*\)/,'') : '-';
    var expName = mostExp ? mostExp.name.replace(/\s*\(.*\)/,'') : '-';
    var range = cheapest && mostExp && cheapest.cost > 0 ? Math.round(mostExp.cost / cheapest.cost) : 0;
    summary.innerHTML =
      '<div style="font-size:.85rem;color:var(--text-dim);margin-bottom:.3rem">' + t('Estimated Monthly Cost', '预计月成本') + '</div>' +
      '<div style="display:flex;gap:1.5rem;flex-wrap:wrap;align-items:baseline;">' +
        '<span style="font-size:.78rem;color:var(--text-dim)">' + t('Cheapest: ', '最便宜: ') + '<strong style="color:#3fb950">' + cheapestName + ' ' + fmtP(cheapest ? cheapest.cost : 0) + '</strong></span>' +
        '<span style="font-size:.78rem;color:var(--text-dim)">' + t('Most expensive: ', '最贵: ') + '<strong style="color:#f85149">' + expName + ' ' + fmtP(mostExp ? mostExp.cost : 0) + '</strong></span>' +
        (range > 1 ? '<span style="font-size:.78rem;color:var(--text-dim)">x' + range + t(' difference', ' 倍差距') + '</span>' : '') +
      '</div>' +
      '<div style="font-size:.72rem;color:var(--text-dim);margin-top:.3rem">' +
        (u.prompts * u.days) + t(' prompts/mo, ', ' 次提示/月, ') +
        ((u.prompts * (u.inpTok + u.outTok) * u.days) / 1e6).toFixed(1) + 'M tokens/mo' +
      '</div>';
  }

  // Table
  var table = document.getElementById('mpTable');
  if (!table) return;

  var cols = [
    { key: 'name',   labelEn: 'Model',         labelZh: '模型',     cls: 'mp-name' },
    { key: 'provider', labelEn: 'Provider',    labelZh: '提供商',  cls: 'mp-provider' },
    { key: 'inp',    labelEn: 'Input $/1M',    labelZh: '输入 $/1M', cls: 'mp-price' },
    { key: 'out',    labelEn: 'Output $/1M',   labelZh: '输出 $/1M', cls: 'mp-price' },
    { key: 'ctx',    labelEn: 'Context',       labelZh: '上下文',   cls: 'mp-price' },
    { key: 'cost',   labelEn: 'Est. Cost/mo',  labelZh: '预计月费',  cls: 'mp-cost' },
  ];

  var html = '<thead><tr>';
  cols.forEach(function(c) {
    var arrow = mpSortKey === c.key ? (mpSortDir > 0 ? ' \u25B2' : ' \u25BC') : '';
    html += '<th onclick="mpSort(\'' + c.key + '\')">' + t(c.labelEn, c.labelZh) + '<span class="sort-arrow">' + arrow + '</span></th>';
  });
  html += '</tr></thead><tbody>';

  display.forEach(function(m) {
    var costClass = m.cost <= minCost * 1.5 ? 'mp-cheapest' :
                    m.cost <= minCost * 5 ? 'mp-cheap' :
                    m.cost >= maxCost * 0.5 ? 'mp-expensive' : 'mp-mid';
    var ctxStr = m.ctx >= 1e6 ? (m.ctx / 1e6) + 'M' : m.ctx >= 1000 ? Math.round(m.ctx / 1000) + 'K' : '' + m.ctx;
    var providerTag = '<span class="mp-provider-tag">' + m.provider + '</span>';
    var costStr = isZh ? ('\u00a5' + (m.cost * 7.2).toFixed(2)) : ('$' + m.cost.toFixed(2));

    html += '<tr>' +
      '<td class="mp-name">' + m.name + '</td>' +
      '<td class="mp-provider">' + providerTag + '</td>' +
      '<td class="mp-price">$' + m.inp.toFixed(2) + '</td>' +
      '<td class="mp-price">$' + m.out.toFixed(2) + '</td>' +
      '<td class="mp-price">' + ctxStr + '</td>' +
      '<td class="mp-cost ' + costClass + '">' + costStr + '</td>' +
    '</tr>';
  });
  html += '</tbody>';
  table.innerHTML = html;

  // Footer
  var footer = document.getElementById('mpFooter');
  if (footer) {
    footer.innerHTML = t(
      'Showing ' + display.length + ' of ' + list.length + ' models. Data from OpenRouter API.',
      '显示 ' + display.length + ' / ' + list.length + ' 个模型。数据来自 OpenRouter API。'
    );
  }
}

function mpSort(key) {
  if (mpSortKey === key) {
    mpSortDir *= -1;
  } else {
    mpSortKey = key;
    mpSortDir = 1;
  }
  mpRender();
}

document.addEventListener('DOMContentLoaded', function() {
  if (currentLang === 'zh') document.documentElement.lang = 'zh-CN';
  applyStaticI18n();

  var st = document.getElementById('auditTeam');
  if (st) st.addEventListener('input', recalcSubs);
  var search = document.getElementById('subSearch');
  if (search) search.addEventListener('input', filterSubs);

  // Slider value display
  var at = document.getElementById('auditTeam');
  if (at) {
    var atv = document.getElementById('auditTeamVal');
    if (atv) at.addEventListener('input', function() { atv.textContent = at.value; });
  }

  // Initial render
  renderSubs();

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
