// ============================================
// BuyMeAd — Product View JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderReviews();
});

const REVIEWS = [
    { name: 'Alex Morgan', avatar: 'A', gradient: 'linear-gradient(135deg,#f472b6,#a78bfa)', rating: 5, text: 'Incredible quality! The UI components are so well organized. Saved me weeks of work on my SaaS project.', date: 'Feb 20, 2026', access: 'Purchased' },
    { name: 'Jordan Lee', avatar: 'J', gradient: 'linear-gradient(135deg,#34d399,#3b82f6)', rating: 5, text: 'Watched the ads and got free access — the product is amazing. Will definitely buy the next one directly!', date: 'Feb 18, 2026', access: 'Ads' },
    { name: 'Priya Sharma', avatar: 'P', gradient: 'linear-gradient(135deg,#fbbf24,#f97316)', rating: 4, text: 'Great components and design system. Would love to see more dark mode variants. Overall fantastic value.', date: 'Feb 15, 2026', access: 'Purchased' },
    { name: 'Mike Turner', avatar: 'M', gradient: 'linear-gradient(135deg,#a78bfa,#ec4899)', rating: 5, text: "Completed the survey to access this kit. Took 2 minutes and the product quality is insane. Thank you!", date: 'Feb 12, 2026', access: 'Survey' },
];

function renderReviews() {
    const list = document.getElementById('reviewsList');
    if (!list) return;
    list.innerHTML = REVIEWS.map(r => `
    <div class="card" style="padding:var(--space-5);">
      <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3);">
        <div class="avatar avatar-sm" style="background:${r.gradient};">${r.avatar}</div>
        <div style="flex:1;">
          <div style="font-weight:600;color:#fff;font-size:var(--text-sm);">${r.name}</div>
          <div style="font-size:var(--text-xs);color:var(--dark-500);">${r.date}</div>
        </div>
        <span class="badge ${r.access === 'Purchased' ? 'badge-success' : r.access === 'Ads' ? 'badge-warning' : 'badge-primary'}">${r.access === 'Purchased' ? '💳' : r.access === 'Ads' ? '📺' : '📋'} ${r.access}</span>
      </div>
      <div style="color:var(--warning-400);font-size:var(--text-sm);margin-bottom:var(--space-2);">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <p style="color:var(--dark-300);font-size:var(--text-sm);line-height:1.7;">${r.text}</p>
    </div>
  `).join('');
}

function handlePay() {
    document.getElementById('paymentModal').classList.add('active');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

function processPayment(e) {
    e.preventDefault();
    const btn = document.getElementById('payBtn');
    btn.textContent = 'Processing...';
    btn.disabled = true;
    setTimeout(() => {
        closePaymentModal();
        btn.textContent = 'Pay $29';
        btn.disabled = false;
        showSuccess('Payment successful! Thank you for your purchase.');
    }, 2000);
}

document.getElementById('paymentModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closePaymentModal();
});

let currentAd = 0;
let adTimerInterval = null;

function startAdFlow() {
    currentAd = 0;
    document.getElementById('adOverlay').classList.add('active');
    resetAdState();
}

function closeAdOverlay() {
    document.getElementById('adOverlay').classList.remove('active');
    if (adTimerInterval) clearInterval(adTimerInterval);
    currentAd = 0;
}

function resetAdState() {
    const playBtn = document.getElementById('adPlayBtn');
    const timer = document.getElementById('adTimer');
    const label = document.getElementById('adLabel');
    const skipBtn = document.getElementById('adSkipBtn');
    const finishBtn = document.getElementById('adFinishBtn');
    playBtn.style.display = 'flex';
    timer.style.display = 'none';
    label.textContent = 'Click play to start watching the ad';
    skipBtn.classList.remove('visible');
    skipBtn.style.display = '';
    finishBtn.style.display = 'none';
    document.getElementById('adCurrentNum').textContent = currentAd + 1;
    for (let i = 1; i <= 3; i++) {
        const fill = document.getElementById(`adProg${i}`);
        fill.className = 'ad-progress-fill';
        if (i <= currentAd) fill.classList.add('complete');
    }
}

function playAd() {
    const playBtn = document.getElementById('adPlayBtn');
    const timer = document.getElementById('adTimer');
    const label = document.getElementById('adLabel');
    const skipBtn = document.getElementById('adSkipBtn');
    const finishBtn = document.getElementById('adFinishBtn');
    const progFill = document.getElementById(`adProg${currentAd + 1}`);
    playBtn.style.display = 'none';
    timer.style.display = 'block';
    label.textContent = 'Ad playing — please wait...';
    progFill.classList.add('active');
    progFill.style.animation = 'none';
    progFill.offsetHeight;
    progFill.style.animation = '';
    progFill.classList.add('active');
    let seconds = 15;
    timer.textContent = seconds;
    adTimerInterval = setInterval(() => {
        seconds--;
        timer.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(adTimerInterval);
            progFill.classList.remove('active');
            progFill.classList.add('complete');
            timer.style.display = 'none';
            label.textContent = '✅ Ad completed!';
            currentAd++;
            if (currentAd >= 3) {
                finishBtn.style.display = 'inline-flex';
                finishBtn.classList.add('visible');
                skipBtn.style.display = 'none';
            } else {
                skipBtn.classList.add('visible');
            }
        }
    }, 1000);
}

function nextAd() {
    if (adTimerInterval) clearInterval(adTimerInterval);
    resetAdState();
}

function finishAdFlow() {
    document.getElementById('adOverlay').classList.remove('active');
    if (adTimerInterval) clearInterval(adTimerInterval);
    currentAd = 0;
    showSuccess('You watched 3 ads and earned free access! The creator earned $0.45 from your views.');
}

const SURVEY_QUESTIONS = [
    { question: 'Which type of design tools do you use most?', options: ['Figma', 'Sketch', 'Adobe XD', 'Canva', 'Other'] },
    { question: 'How often do you purchase digital products?', options: ['Weekly', 'Monthly', 'A few times a year', 'Rarely', 'First time'] },
    { question: "What's your primary use for design templates?", options: ['Client projects', 'Personal projects', 'Learning', 'Freelancing', 'Corporate work'] },
    { question: "What's your budget range for design resources?", options: ['Under $10', '$10 - $30', '$30 - $50', '$50 - $100', '$100+'] },
    { question: 'How did you find this product?', options: ['Social media', 'Search engine', 'Recommendation', 'BuyMeAd browse', 'Other'] },
];

let currentSurveyQ = 0;
let surveyAnswers = [];

function startSurveyFlow() {
    currentSurveyQ = 0;
    surveyAnswers = [];
    document.getElementById('surveyOverlay').classList.add('active');
    renderSurveyQuestion();
    updateSurveyProgress();
}

function closeSurveyOverlay() {
    document.getElementById('surveyOverlay').classList.remove('active');
    currentSurveyQ = 0;
    surveyAnswers = [];
}

function renderSurveyQuestion() {
    const area = document.getElementById('surveyQuestionArea');
    const q = SURVEY_QUESTIONS[currentSurveyQ];
    const nextBtn = document.getElementById('surveyNextBtn');
    document.getElementById('surveyCurrentNum').textContent = currentSurveyQ + 1;
    nextBtn.disabled = true;
    nextBtn.textContent = currentSurveyQ === SURVEY_QUESTIONS.length - 1 ? '🎉 Claim Access' : 'Next Question →';
    area.innerHTML = `
    <div class="survey-question">${q.question}</div>
    <div class="survey-options">
      ${q.options.map((opt, i) => `
        <div class="survey-option" data-index="${i}" onclick="selectSurveyOption(this, ${i})">
          <div class="survey-option-radio"></div>
          <span>${opt}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function selectSurveyOption(el, index) {
    el.parentElement.querySelectorAll('.survey-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    surveyAnswers[currentSurveyQ] = index;
    document.getElementById('surveyNextBtn').disabled = false;
}

function nextSurveyQuestion() {
    currentSurveyQ++;
    updateSurveyProgress();
    if (currentSurveyQ >= SURVEY_QUESTIONS.length) {
        document.getElementById('surveyOverlay').classList.remove('active');
        showSuccess('Survey completed! You earned free access. The creator earned $0.80 from your response.');
        return;
    }
    renderSurveyQuestion();
}

function updateSurveyProgress() {
    for (let i = 1; i <= 5; i++) {
        const fill = document.getElementById(`sProg${i}`);
        fill.className = 'ad-progress-fill';
        if (i <= currentSurveyQ) {
            fill.classList.add('complete');
        } else if (i === currentSurveyQ + 1) {
            fill.style.width = '0%';
            setTimeout(() => { fill.style.width = '100%'; fill.style.transition = 'width 0.5s ease'; }, 100);
        }
    }
}

function showSuccess(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successOverlay').classList.add('active');
}

function downloadProduct() {
    const successOverlay = document.getElementById('successOverlay');
    showToast('Download started! Check your downloads folder.', 'success');
    setTimeout(() => { successOverlay.classList.remove('active'); }, 1000);
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
    <button onclick="this.parentElement.remove()" style="color:var(--dark-500);padding:4px;cursor:pointer;background:none;border:none;">✕</button>
  `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}
