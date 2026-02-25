// ============================================
// BuyMeAd — Dashboard JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initChart();
    renderTransactions();
    renderProductsTable();
    animateDashboardStats();
});

const PRODUCTS = [
    { id: 1, name: 'UI Kit Pro Bundle', icon: '📄', category: 'template', price: 29, bgColor: 'rgba(124,58,237,0.12)', sales: 148, adViews: 432, revenue: 4542, accessMethods: ['pay', 'ads'] },
    { id: 2, name: 'Dashboard Templates', icon: '📊', category: 'template', price: 15, bgColor: 'rgba(236,72,153,0.12)', sales: 89, adViews: 267, revenue: 1602, accessMethods: ['pay', 'ads', 'survey'] },
    { id: 3, name: 'Design Handbook', icon: '📘', category: 'ebook', price: 12, bgColor: 'rgba(16,185,129,0.12)', sales: 234, adViews: 891, revenue: 3474, accessMethods: ['pay', 'ads', 'survey'] },
    { id: 4, name: 'Icon Pack Premium', icon: '🎨', category: 'design', price: 19, bgColor: 'rgba(251,191,36,0.12)', sales: 67, adViews: 190, revenue: 1330, accessMethods: ['pay', 'ads'] },
    { id: 5, name: 'Landing Page Kit', icon: '🖥️', category: 'template', price: 35, bgColor: 'rgba(124,58,237,0.12)', sales: 45, adViews: 120, revenue: 1635, accessMethods: ['pay', 'ads'] },
    { id: 6, name: 'React Component Library', icon: '⚛️', category: 'code', price: 49, bgColor: 'rgba(59,130,246,0.12)', sales: 33, adViews: 88, revenue: 1661, accessMethods: ['pay', 'ads', 'survey'] },
    { id: 7, name: 'Photography Presets', icon: '📷', category: 'preset', price: 9, bgColor: 'rgba(236,72,153,0.12)', sales: 312, adViews: 1240, revenue: 3400, accessMethods: ['pay', 'ads'] },
    { id: 8, name: 'Social Media Templates', icon: '📱', category: 'template', price: 14, bgColor: 'rgba(16,185,129,0.12)', sales: 156, adViews: 540, revenue: 2400, accessMethods: ['pay', 'ads', 'survey'] },
];

const TRANSACTIONS = [
    { type: 'sale', icon: '💰', bg: 'rgba(16,185,129,0.1)', name: 'UI Kit Pro Bundle sold', desc: 'Purchased by Alex M.', amount: '+$27.55', amountClass: 'positive', time: '2 min ago' },
    { type: 'ad', icon: '📺', bg: 'rgba(251,191,36,0.1)', name: 'Ad view completed', desc: 'Design Handbook — 3 ads watched', amount: '+$0.45', amountClass: 'ad-revenue', time: '8 min ago' },
    { type: 'sale', icon: '💰', bg: 'rgba(16,185,129,0.1)', name: 'Dashboard Templates sold', desc: 'Purchased by Jamie L.', amount: '+$14.25', amountClass: 'positive', time: '23 min ago' },
    { type: 'survey', icon: '📋', bg: 'rgba(124,58,237,0.1)', name: 'Survey completed', desc: 'Icon Pack Premium — survey done', amount: '+$0.80', amountClass: 'ad-revenue', time: '1h ago' },
    { type: 'ad', icon: '📺', bg: 'rgba(251,191,36,0.1)', name: 'Ad view completed', desc: 'Photography Presets — 3 ads watched', amount: '+$0.38', amountClass: 'ad-revenue', time: '1h ago' },
    { type: 'sale', icon: '💰', bg: 'rgba(16,185,129,0.1)', name: 'React Component Library sold', desc: 'Purchased by Dev Studio', amount: '+$46.55', amountClass: 'positive', time: '2h ago' },
    { type: 'payout', icon: '🏦', bg: 'rgba(124,58,237,0.1)', name: 'Payout processed', desc: 'Weekly payout to PayPal', amount: '+$1,240.00', amountClass: 'positive', time: '1 day ago' },
    { type: 'ad', icon: '📺', bg: 'rgba(251,191,36,0.1)', name: 'Ad revenue batch', desc: '24 ad views across products', amount: '+$8.40', amountClass: 'ad-revenue', time: '1 day ago' },
];

function initSidebar() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (!toggle || !sidebar) return;
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
}

function initChart() {
    const container = document.getElementById('chartBars');
    if (!container) return;
    const data7d = [
        { sales: 65, ads: 30 }, { sales: 80, ads: 45 }, { sales: 45, ads: 35 },
        { sales: 90, ads: 50 }, { sales: 70, ads: 40 }, { sales: 95, ads: 60 }, { sales: 85, ads: 55 },
    ];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    function renderBars(data) {
        container.innerHTML = '';
        data.forEach((d, i) => {
            const group = document.createElement('div');
            group.className = 'chart-bar-group';
            group.setAttribute('data-tooltip', labels[i] || '');
            const salesBar = document.createElement('div');
            salesBar.className = 'chart-bar sales';
            salesBar.style.height = '0%';
            const adsBar = document.createElement('div');
            adsBar.className = 'chart-bar ads';
            adsBar.style.height = '0%';
            group.appendChild(salesBar);
            group.appendChild(adsBar);
            container.appendChild(group);
            requestAnimationFrame(() => {
                setTimeout(() => {
                    salesBar.style.height = d.sales + '%';
                    adsBar.style.height = d.ads + '%';
                }, i * 80);
            });
        });
    }
    renderBars(data7d);
    document.querySelectorAll('.chart-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.chart-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const newData = Array.from({ length: 7 }, () => ({
                sales: 30 + Math.random() * 70,
                ads: 15 + Math.random() * 50,
            }));
            renderBars(newData);
        });
    });
}

function renderTransactions() {
    const list = document.getElementById('transactionList');
    if (!list) return;
    list.innerHTML = TRANSACTIONS.map(t => `
    <div class="transaction-item">
      <div class="transaction-icon" style="background:${t.bg};">${t.icon}</div>
      <div class="transaction-details">
        <span class="transaction-name">${t.name}</span>
        <span class="transaction-desc">${t.desc}</span>
      </div>
      <div style="text-align:right;">
        <span class="transaction-amount ${t.amountClass}">${t.amount}</span>
        <span class="transaction-time">${t.time}</span>
      </div>
    </div>
  `).join('');
}

function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    tbody.innerHTML = PRODUCTS.map(p => `
    <tr>
      <td>
        <div class="product-cell">
          <div class="product-thumb" style="background:${p.bgColor};">${p.icon}</div>
          <span class="product-cell-name">${p.name}</span>
        </div>
      </td>
      <td style="font-weight:600;color:var(--success-400);">$${p.price}</td>
      <td>
        <div class="access-methods">
          ${p.accessMethods.map(m => `<span class="access-tag ${m}">${m === 'pay' ? '💳 Pay' : m === 'ads' ? '📺 Ads' : '📋 Survey'}</span>`).join('')}
        </div>
      </td>
      <td>${p.sales}</td>
      <td>${p.adViews}</td>
      <td style="font-weight:700;color:#fff;">$${p.revenue.toLocaleString()}</td>
      <td>
        <div class="product-actions">
          <button class="btn btn-ghost btn-sm" onclick="showToast('Editing ${p.name}', 'info')">✏️</button>
          <button class="btn btn-ghost btn-sm" onclick="window.location.href='product.html'">👁️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function animateDashboardStats() {
    document.querySelectorAll('.stat-card-value[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        const noPrefix = el.dataset.noPrefix === 'true';
        const prefix = noPrefix ? '' : '$';
        const duration = 1500;
        const start = performance.now();
        const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(ease * target);
            el.textContent = prefix + current.toLocaleString();
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    });
}

function openAddProductModal() {
    document.getElementById('addProductModal').classList.add('active');
}

function closeAddProductModal() {
    document.getElementById('addProductModal').classList.remove('active');
}

function handleAddProduct(e) {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    closeAddProductModal();
    showToast(`"${name}" added successfully!`, 'success');
    document.getElementById('addProductForm').reset();
}

const dropZone = document.getElementById('fileDropZone');
const fileInput = document.getElementById('productFile');
if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary-500)';
        dropZone.style.background = 'rgba(124,58,237,0.05)';
    });
    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'rgba(255,255,255,0.08)';
        dropZone.style.background = 'transparent';
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--success-500)';
        const fileName = e.dataTransfer.files[0]?.name || 'file';
        dropZone.querySelector('p').textContent = `✅ ${fileName} selected`;
    });
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            dropZone.style.borderColor = 'var(--success-500)';
            dropZone.querySelector('p').textContent = `✅ ${fileInput.files[0].name} selected`;
        }
    });
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
    <span style="font-size:18px;">${icons[type] || 'ℹ️'}</span>
    <span style="flex:1;font-size:var(--text-sm);color:var(--dark-100);">${message}</span>
    <button onclick="this.parentElement.remove()" style="color:var(--dark-500);padding:4px;">✕</button>
  `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

document.getElementById('addProductModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAddProductModal();
});
