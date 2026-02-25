// ============================================
// BuyMeAd — Store Page JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initFilters();
});

// ── Product Data ──
const STORE_PRODUCTS = [
    {
        id: 1,
        name: 'UI Kit Pro Bundle',
        icon: '📄',
        category: 'template',
        price: 29,
        desc: '200+ components, 50+ screens. Complete design system for Figma & Sketch.',
        bgGradient: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(99,46,190,0.1) 100%)',
        sales: 148,
        hasAds: true,
        hasSurvey: false,
    },
    {
        id: 2,
        name: 'Dashboard Templates',
        icon: '📊',
        category: 'template',
        price: 15,
        desc: '25 dashboard layouts with charts, tables, and data visualization components.',
        bgGradient: 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(190,24,93,0.1) 100%)',
        sales: 89,
        hasAds: true,
        hasSurvey: true,
    },
    {
        id: 3,
        name: 'Design Handbook',
        icon: '📘',
        category: 'ebook',
        price: 12,
        desc: 'Comprehensive guide to modern UI/UX design. 180 pages of practical tips.',
        bgGradient: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.1) 100%)',
        sales: 234,
        hasAds: true,
        hasSurvey: true,
    },
    {
        id: 4,
        name: 'Icon Pack Premium',
        icon: '🎨',
        category: 'design',
        price: 19,
        desc: '1,500+ vector icons in multiple styles. SVG, PNG, and Figma formats.',
        bgGradient: 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(217,119,6,0.1) 100%)',
        sales: 67,
        hasAds: true,
        hasSurvey: false,
    },
    {
        id: 5,
        name: 'Landing Page Kit',
        icon: '🖥️',
        category: 'template',
        price: 35,
        desc: '15 beautifully designed landing page templates. Ready to customize.',
        bgGradient: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(99,46,190,0.1) 100%)',
        sales: 45,
        hasAds: true,
        hasSurvey: false,
    },
    {
        id: 6,
        name: 'React Component Library',
        icon: '⚛️',
        category: 'code',
        price: 49,
        desc: '100+ production-ready React components with TypeScript support.',
        bgGradient: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(37,99,235,0.1) 100%)',
        sales: 33,
        hasAds: true,
        hasSurvey: true,
    },
    {
        id: 7,
        name: 'Photography Presets',
        icon: '📷',
        category: 'design',
        price: 9,
        desc: '50 Lightroom presets for moody, cinematic, and vibrant photo styles.',
        bgGradient: 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(190,24,93,0.1) 100%)',
        sales: 312,
        hasAds: true,
        hasSurvey: false,
    },
    {
        id: 8,
        name: 'Social Media Templates',
        icon: '📱',
        category: 'template',
        price: 14,
        desc: '80+ Instagram, Twitter, and LinkedIn post templates. Canva & Figma.',
        bgGradient: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.1) 100%)',
        sales: 156,
        hasAds: true,
        hasSurvey: true,
    },
];

// ── Render Products ──
function renderProducts(filter = 'all') {
    const grid = document.getElementById('storeProducts');
    if (!grid) return;

    const filtered = filter === 'all'
        ? STORE_PRODUCTS
        : STORE_PRODUCTS.filter(p => p.category === filter);

    grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation: slideUp 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.08}s forwards; opacity:0;">
      <div class="product-card-thumb" style="background: ${p.bgGradient};">
        <span class="product-card-category badge badge-primary">${getCategoryLabel(p.category)}</span>
        <span style="font-size:48px;position:relative;z-index:1;">${p.icon}</span>
      </div>
      <div class="product-card-body">
        <h3 class="product-card-title">${p.name}</h3>
        <p class="product-card-desc">${p.desc}</p>
        <div class="product-card-footer">
          <span class="product-price">$${p.price}</span>
          <div class="product-card-actions">
            <a href="product.html" class="btn btn-primary btn-sm">Buy</a>
            <span class="product-card-divider">or</span>
            <a href="product.html" class="btn btn-sm" style="background:rgba(251,191,36,0.1);color:var(--warning-400);border:1px solid rgba(251,191,36,0.2);">📺 Free</a>
          </div>
        </div>
        <div style="margin-top:var(--space-3);display:flex;align-items:center;gap:var(--space-3);font-size:var(--text-xs);color:var(--dark-500);">
          <span>🛍️ ${p.sales} sales</span>
          ${p.hasSurvey ? '<span>📋 Survey</span>' : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function getCategoryLabel(cat) {
    const labels = {
        template: '🎨 Template',
        ebook: '📚 eBook',
        design: '🖼️ Design',
        code: '💻 Code',
        preset: '🎛️ Preset',
    };
    return labels[cat] || cat;
}

// ── Filter Tabs ──
function initFilters() {
    document.querySelectorAll('.store-filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.store-filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderProducts(tab.dataset.filter);
        });
    });
}
