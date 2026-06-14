// ===== PRICING DATA (as of mid-2025) =====
const TOOLS = {
  claudeCode: { name: "Claude Code", icon: "🤖", subPlans: [{ name: "Pro", price: 20 }, { name: "Max 5x", price: 100 }, { name: "Max 20x", price: 200 }] },
  cursor: { name: "Cursor", icon: "📝", subPlans: [{ name: "Free", price: 0 }, { name: "Pro", price: 20 }, { name: "Business", price: 40 }] },
  copilot: { name: "GitHub Copilot", icon: "🐙", subPlans: [{ name: "Individual", price: 10 }, { name: "Business", price: 19 }, { name: "Enterprise", price: 39 }] },
  windsurf: { name: "Windsurf", icon: "🏄", subPlans: [{ name: "Free", price: 0 }, { name: "Pro", price: 15 }] },
  windsurfPro: { name: "Windsurf Pro", icon: "🏄", subPlans: [{ name: "Pro", price: 15 }] },
  codex: { name: "OpenAI Codex", icon: "🧬", subPlans: [{ name: "Plus (ChatGPT)", price: 20 }, { name: "Pro (ChatGPT)", price: 200 }] },
  cline: { name: "Cline (BYOK)", icon: "📐", subPlans: [{ name: "Free (API costs)", price: 0 }] },
  aide: { name: "Aide", icon: "💡", subPlans: [{ name: "Free", price: 0 }, { name: "Pro", price: 20 }] },
  continue: { name: "Continue (BYOK)", icon: "▶️", subPlans: [{ name: "Free (API costs)", price: 0 }] },
  supermaven: { name: "Supermaven", icon: "⚡", subPlans: [{ name: "Free", price: 0 }, { name: "Pro", price: 10 }] },
};

// All standalone AI subscriptions for the stack calculator
const AI_SUBS = [
  // LLM / Chat
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
  // Coding
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
  // Image / Design
  { name: "Midjourney Basic", price: 10, cat: "Image" },
  { name: "Midjourney Standard", price: 30, cat: "Image" },
  { name: "Adobe Firefly", price: 10, cat: "Image" },
  { name: "Leonardo.ai Pro", price: 12, cat: "Image" },
  { name: "Ideogram Pro", price: 8, cat: "Image" },
  { name: "Stability AI Pro", price: 10, cat: "Image" },
  { name: "Magnific AI Relax", price: 39, cat: "Image" },
  { name: "Krea Pro", price: 10, cat: "Image" },
  { name: "Canva Pro (AI)", price: 13, cat: "Image" },
  // Audio / Voice
  { name: "Suno Pro", price: 10, cat: "Audio" },
  { name: "Suno Premier", price: 30, cat: "Audio" },
  { name: "ElevenLabs Starter", price: 5, cat: "Audio" },
  { name: "ElevenLabs Creator", price: 22, cat: "Audio" },
  { name: "Udio Standard", price: 10, cat: "Audio" },
  { name: "Murf.ai Pro", price: 19, cat: "Audio" },
  // Video
  { name: "Runway Standard", price: 15, cat: "Video" },
  { name: "Pika Pro", price: 35, cat: "Video" },
  { name: "HeyGen Creator", price: 29, cat: "Video" },
  { name: "Descript Hobbyist", price: 12, cat: "Video" },
  { name: "Synthesia Starter", price: 29, cat: "Video" },
  // Writing / SEO
  { name: "Jasper Creator", price: 39, cat: "Writing" },
  { name: "Copy.ai Starter", price: 36, cat: "Writing" },
  { name: "Writesonic Individual", price: 13, cat: "Writing" },
  { name: "Rytr Unlimited", price: 9, cat: "Writing" },
  { name: "Surfer SEO Essential", price: 89, cat: "Writing" },
  { name: "DeepL Pro Starter", price: 9, cat: "Writing" },
  // Meeting / Notes
  { name: "Otter.ai Pro", price: 17, cat: "Meeting" },
  { name: "Fireflies.ai Pro", price: 10, cat: "Meeting" },
  { name: "Fathom Pro", price: 19, cat: "Meeting" },
  { name: "tl;dv Pro", price: 20, cat: "Meeting" },
  // Productivity
  { name: "Notion AI", price: 10, cat: "Productivity" },
  { name: "Superhuman", price: 30, cat: "Productivity" },
  { name: "Grammarly Pro", price: 12, cat: "Productivity" },
  { name: "Mem Pro", price: 15, cat: "Productivity" },
  // Platform / Dev
  { name: "Hugging Face Pro", price: 9, cat: "Platform" },
];

// API pricing per million tokens (input/output)
const API_PRICING = {
  claude_sonnet: { name: "Claude Sonnet 4", in: 3, out: 15 },
  claude_haiku: { name: "Claude Haiku 3.5", in: 0.8, out: 4 },
  gpt4o: { name: "GPT-4o", in: 2.5, out: 10 },
  gpt4o_mini: { name: "GPT-4o mini", in: 0.15, out: 0.6 },
  deepseek: { name: "DeepSeek V3", in: 0.27, out: 1.1 },
  gemini_pro: { name: "Gemini 2.0 Pro", in: 1.25, out: 5 },
  llama: { name: "Llama 3.3 70B", in: 0.23, out: 0.4 },
};

// ===== TAB SWITCHING =====
function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pane').forEach(p => p.classList.remove('active'));
  const btn = document.querySelector(`.tab[data-tab="${tabId}"]`);
  const pane = document.getElementById('tab-' + tabId);
  if (btn) btn.classList.add('active');
  if (pane) pane.classList.add('active');
  // Recalculate on switch
  if (tabId === 'compare') calcCompare();
  if (tabId === 'stack') renderSubs();
  if (tabId === 'breakEven') calcBreakEven();
}

// ===== TAB 1: AI CODING TOOL COMPARISON =====
function calcCompare() {
  const hours = parseFloat(document.getElementById('cmpHours')?.value) || 4;
  const complexity = document.getElementById('cmpComplexity')?.value || 'medium';
  const workDays = parseFloat(document.getElementById('cmpDays')?.value) || 20;

  // Estimated tokens per hour based on complexity
  const tokensPerHour = { light: 8000, medium: 25000, heavy: 80000 };
  const tph = tokensPerHour[complexity];
  const totalTokens = tph * hours * workDays;
  const inputRatio = 0.7;
  const outputRatio = 0.3;
  const inputTokens = totalTokens * inputRatio;
  const outputTokens = totalTokens * outputRatio;

  // Calculate cost for each tool (subscription or API-equivalent)
  const results = [
    { key: 'claudeCode', plan: 'Max 5x', subPrice: 100, apiModel: 'claude_sonnet', desc: 'Agentic coding, full Claude power' },
    { key: 'cursor', plan: 'Pro', subPrice: 20, apiModel: 'claude_sonnet', desc: 'IDE with AI, fast autocomplete' },
    { key: 'copilot', plan: 'Individual', subPrice: 10, apiModel: 'gpt4o_mini', desc: 'Inline completion + chat' },
    { key: 'windsurf', plan: 'Pro', subPrice: 15, apiModel: 'claude_sonnet', desc: 'Cascade agent, multi-file edits' },
    { key: 'codex', plan: 'Plus', subPrice: 20, apiModel: 'gpt4o', desc: 'Cloud coding agent by OpenAI' },
    { key: 'cline', plan: 'BYOK', subPrice: 0, apiModel: 'claude_sonnet', desc: 'Open-source, you pay API directly' },
    { key: 'supermaven', plan: 'Pro', subPrice: 10, apiModel: 'gpt4o_mini', desc: 'Ultra-fast autocomplete' },
  ];

  results.forEach(r => {
    const api = API_PRICING[r.apiModel];
    const apiCost = (inputTokens / 1e6 * api.in) + (outputTokens / 1e6 * api.out);
    r.apiCost = apiCost;
    r.totalCost = r.subPrice + apiCost; // subscription + overage if applicable
    r.effectiveMonthly = r.subPrice > 0 ? r.subPrice : apiCost;
  });

  results.sort((a, b) => a.effectiveMonthly - b.effectiveMonthly);
  const minCost = results[0].effectiveMonthly;
  const maxCost = results[results.length - 1].effectiveMonthly;

  // Render compare cards
  const grid = document.getElementById('compareGrid');
  if (!grid) return;
  grid.innerHTML = results.map(r => {
    const isBest = r.effectiveMonthly === minCost;
    const isWorst = r.effectiveMonthly === maxCost;
    const tool = TOOLS[r.key] || { icon: '🔧', name: r.key };
    return `<div class="compare-card ${isBest ? 'best' : ''}">
      ${isBest ? '<div class="badge best">Cheapest</div>' : ''}
      ${isWorst && maxCost > minCost * 2 ? '<div class="badge worst">Costliest</div>' : ''}
      <div class="b-icon">${tool.icon}</div>
      <div class="b-name">${tool.name}</div>
      <div class="b-price">$${r.effectiveMonthly.toFixed(0)}<span style="font-size:.7rem;color:var(--text-dim)">/mo</span></div>
      <div class="b-desc">${r.desc}</div>
      <div class="b-detail">${r.subPrice > 0 ? `Sub: $${r.subPrice}/mo` : 'No sub (API only)'}${r.apiCost > 0 && r.subPrice > 0 ? `<br>Est. API overage: $${r.apiCost.toFixed(0)}` : ''}${r.subPrice === 0 ? `<br>Est. API cost: $${r.apiCost.toFixed(0)}` : ''}</div>
    </div>`;
  }).join('');

  // Render bar chart
  const chart = document.getElementById('compareChart');
  if (chart) {
    chart.innerHTML = results.map(r => {
      const pct = maxCost > 0 ? (r.effectiveMonthly / maxCost) * 100 : 0;
      const color = r.effectiveMonthly === minCost ? 'var(--accent)' : r.effectiveMonthly === maxCost ? 'var(--red)' : 'var(--blue)';
      return `<div class="bar-row">
        <div class="b-name">${(TOOLS[r.key]||{}).name || r.key}</div>
        <div class="b-track"><div class="b-fill" style="width:${pct}%;background:${color}">${r.effectiveMonthly > maxCost*0.15 ? '$'+r.effectiveMonthly.toFixed(0) : ''}</div></div>
        <div class="b-val">$${r.effectiveMonthly.toFixed(0)}</div>
      </div>`;
    }).join('');
  }

  // Summary
  const summary = document.getElementById('compareSummary');
  if (summary) {
    const savings = maxCost - minCost;
    summary.innerHTML = `Based on <strong>${hours} hrs/day</strong> × ${workDays} days, <strong>${complexity}</strong> complexity (~${(totalTokens/1e6).toFixed(1)}M tokens/month):
    Cheapest option is <strong style="color:var(--accent)">${(TOOLS[results[0].key]||{}).name}</strong> at $${minCost.toFixed(0)}/mo.
    Most expensive is <strong style="color:var(--red)">${(TOOLS[results[results.length-1].key]||{}).name}</strong> at $${maxCost.toFixed(0)}/mo.
    You could save up to <strong style="color:var(--accent)">$${savings.toFixed(0)}/mo</strong> ($${(savings*12).toFixed(0)}/yr).`;
  }
}

// ===== TAB 2: AI SUBSCRIPTION STACK CALCULATOR =====
function renderSubs() {
  const container = document.getElementById('subList');
  if (!container) return;
  if (container.children.length > 0) { recalcSubs(); return; } // already rendered

  const categories = {};
  AI_SUBS.forEach(s => { if (!categories[s.cat]) categories[s.cat] = []; categories[s.cat].push(s); });

  let html = '';
  Object.entries(categories).forEach(([cat, subs]) => {
    html += `<div style="font-size:.75rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.5px;margin:10px 0 6px;font-weight:700">${cat}</div>`;
    subs.forEach((s, i) => {
      const id = `sub_${cat}_${i}`;
      html += `<div class="sub-item" data-price="${s.price}" data-name="${s.name}" onclick="toggleSub(this)">
        <div class="left">
          <div class="cb"></div>
          <div class="name">${s.name}</div>
        </div>
        <div class="price">$${s.price}/mo</div>
      </div>`;
    });
  });
  container.innerHTML = html;
}

function toggleSub(el) {
  el.classList.toggle('checked');
  recalcSubs();
}

function toggleAllOff() {
  document.querySelectorAll('.sub-item.checked').forEach(el => el.classList.remove('checked'));
  recalcSubs();
}

function recalcSubs() {
  const checked = document.querySelectorAll('.sub-item.checked');
  let monthly = 0;
  let items = [];
  checked.forEach(el => {
    monthly += parseFloat(el.dataset.price);
    items.push({ name: el.dataset.name, price: parseFloat(el.dataset.price) });
  });
  const yearly = monthly * 12;
  const weekly = monthly / 4.33;
  const daily = monthly / 30;

  const elM = document.getElementById('subMonthly');
  const elY = document.getElementById('subYearly');
  const elD = document.getElementById('subDaily');
  const elW = document.getElementById('subWeekly');
  const elCount = document.getElementById('subCount');
  const elMsg = document.getElementById('subMsg');
  const elBreakdown = document.getElementById('subBreakdown');

  if (elM) elM.textContent = `$${monthly.toFixed(0)}`;
  if (elM) elM.classList.toggle('red', monthly > 100);
  if (elY) elY.textContent = `$${yearly.toFixed(0)}`;
  if (elD) elD.textContent = `$${daily.toFixed(2)}`;
  if (elW) elW.textContent = `$${weekly.toFixed(0)}`;
  if (elCount) elCount.textContent = checked.length;

  if (elMsg) {
    if (monthly === 0) {
      elMsg.innerHTML = '<div class="tip"><strong>👆 Check the boxes above</strong> to see your total AI spending.</div>';
    } else if (monthly < 40) {
      elMsg.innerHTML = `<div class="tip">You're spending <strong>$${monthly.toFixed(0)}/mo</strong> — that's reasonable. At $${yearly.toFixed(0)}/year, consider annual plans for 10-20% savings.</div>`;
    } else if (monthly < 100) {
      elMsg.innerHTML = `<div class="warn"><strong>⚠️ $${monthly.toFixed(0)}/mo is getting up there.</strong> That's <strong>$${yearly.toFixed(0)}/year</strong>. Many people overlap ChatGPT + Claude + Cursor — you might be paying for redundant capabilities. See if you can consolidate to 1 LLM + 1 coding tool.</div>`;
    } else {
      elMsg.innerHTML = `<div class="warn"><strong>🚨 $${monthly.toFixed(0)}/mo?! That's $${yearly.toFixed(0)}/year.</strong> You're in the top tier of AI spenders. Seriously consider: (1) Dropping duplicate LLM subscriptions, (2) Switching to API-only for low-usage tools, (3) Using BYOK tools like Cline or Continue to pay per-use instead of flat subscriptions.</div>`;
    }
  }

  if (elBreakdown && items.length > 0) {
    items.sort((a, b) => b.price - a.price);
    elBreakdown.innerHTML = '<div style="font-size:.8rem;color:var(--text-dim);margin-bottom:6px">Cost breakdown (most expensive first):</div>' +
      items.map(i => `<div style="display:flex;justify-content:space-between;font-size:.82rem;padding:3px 0;border-bottom:1px solid var(--border)"><span>${i.name}</span><span>$${i.price}/mo</span></div>`).join('');
  } else if (elBreakdown) {
    elBreakdown.innerHTML = '';
  }
}

// ===== TAB 3: SUBSCRIPTION VS API BREAK-EVEN =====
function calcBreakEven() {
  const sessions = parseFloat(document.getElementById('beSessions')?.value) || 30;
  const avgInput = parseFloat(document.getElementById('beInputTokens')?.value) || 50000;
  const avgOutput = parseFloat(document.getElementById('beOutputTokens')?.value) || 10000;
  const model = document.getElementById('beModel')?.value || 'claude_sonnet';

  const api = API_PRICING[model];
  const monthlyTokens = sessions * (avgInput + avgOutput);
  const inputCost = sessions * avgInput / 1e6 * api.in;
  const outputCost = sessions * avgOutput / 1e6 * api.out;
  const apiMonthly = inputCost + outputCost;

  const sub5x = 100;
  const sub20x = 200;

  // Recommendation
  const elApi = document.getElementById('beApiCost');
  const elApiT = document.getElementById('beApiTokens');
  const elRec = document.getElementById('beRecommendation');
  const elChart = document.getElementById('beChart');
  const elSavings = document.getElementById('beSavings');

  if (elApi) elApi.textContent = `$${apiMonthly.toFixed(2)}`;
  if (elApiT) elApiT.textContent = `${(monthlyTokens/1e6).toFixed(1)}M`;

  if (elRec) {
    let rec = '';
    if (apiMonthly < 20) {
      rec = `<div class="tip"><strong>✅ Use API (pay-per-use).</strong> At $${apiMonthly.toFixed(2)}/mo, you're way below any subscription. Even ChatGPT Plus ($20) would be overpaying. Use a BYOK tool like Cline or Continue with ${api.name} API.</div>`;
    } else if (apiMonthly < 60) {
      rec = `<div class="tip"><strong>✅ Use API.</strong> At $${apiMonthly.toFixed(2)}/mo, API is still cheaper than Claude Code Max 5x ($100). You'd save $${(100-apiMonthly).toFixed(0)}/mo. Consider Cursor Pro ($20) if you also need autocomplete.</div>`;
    } else if (apiMonthly < 100) {
      rec = `<div class="warn"><strong>🤔 It's close.</strong> At $${apiMonthly.toFixed(2)}/mo, you're approaching Claude Code Max 5x ($100). If your usage is consistent, subscribe. If it varies a lot month-to-month, stick with API.</div>`;
    } else if (apiMonthly < 200) {
      rec = `<div class="warn"><strong>✅ Subscribe to Claude Code Max 5x ($100).</strong> Your API cost would be $${apiMonthly.toFixed(2)}/mo — the $100 plan saves you $${(apiMonthly-100).toFixed(0)}/mo. But watch out: if you hit the 5x rate limit, you'd need Max 20x ($200).</div>`;
    } else {
      rec = `<div class="warn"><strong>✅ Subscribe to Claude Code Max 20x ($200).</strong> Your API cost would be $${apiMonthly.toFixed(2)}/mo — way over the $200 plan. You'd save $${(apiMonthly-200).toFixed(0)}/mo. Unless you need absolute unlimited, the subscription is clearly better at this volume.</div>`;
    }
    elRec.innerHTML = rec;
  }

  // Bar chart
  if (elChart) {
    const data = [
      { name: 'API (' + api.name + ')', cost: apiMonthly, color: 'var(--blue)' },
      { name: 'Claude Code Max 5x', cost: sub5x, color: apiMonthly > sub5x ? 'var(--accent)' : 'var(--text-dim)' },
      { name: 'Claude Code Max 20x', cost: sub20x, color: apiMonthly > sub20x ? 'var(--accent)' : 'var(--text-dim)' },
      { name: 'Cursor Pro', cost: 20, color: 'var(--text-dim)' },
      { name: 'Copilot', cost: 10, color: 'var(--text-dim)' },
    ];
    const maxC = Math.max(...data.map(d => d.cost), 1);
    elChart.innerHTML = data.map(d => {
      const pct = (d.cost / maxC) * 100;
      return `<div class="bar-row">
        <div class="b-name">${d.name}</div>
        <div class="b-track"><div class="b-fill" style="width:${pct}%;background:${d.color}">${d.cost/maxC > 0.2 ? '$'+d.cost.toFixed(0) : ''}</div></div>
        <div class="b-val">$${d.cost.toFixed(0)}</div>
      </div>`;
    }).join('');
  }

  if (elSavings) {
    const cheapest = Math.min(apiMonthly, sub5x, sub20x);
    const mostExpensive = Math.max(apiMonthly, sub20x);
    const savings = mostExpensive - cheapest;
    elSavings.innerHTML = `Choosing the right plan saves you up to <strong style="color:var(--accent)">$${savings.toFixed(0)}/mo</strong> ($${(savings*12).toFixed(0)}/year).`;
  }
}

// ===== FAQ TOGGLE =====
function toggleFAQ(el) {
  el.classList.toggle('open');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Auto-calc on input change
  ['cmpHours', 'cmpComplexity', 'cmpDays'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcCompare);
  });
  ['beSessions', 'beInputTokens', 'beOutputTokens', 'beModel'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcBreakEven);
  });
  // Initial calc
  renderSubs();
  calcCompare();
  calcBreakEven();
});
