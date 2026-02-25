// ============================================
// BuyMeAd — Auth Pages JavaScript
// ============================================

// ── Login ──
function handleLogin(e) {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    const email = document.getElementById('loginEmail')?.value;

    btn.textContent = 'Logging in...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
        // Simulate successful login
        window.location.href = 'dashboard.html';
    }, 1500);
}

// ── Signup ──
function handleSignup(e) {
    e.preventDefault();
    const btn = document.getElementById('signupBtn');

    btn.textContent = 'Creating account...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// ── Password Strength ──
function checkPasswordStrength(password) {
    const bars = [
        document.getElementById('pwBar1'),
        document.getElementById('pwBar2'),
        document.getElementById('pwBar3'),
        document.getElementById('pwBar4'),
    ];
    const label = document.getElementById('pwLabel');

    if (!bars[0] || !label) return;

    // Reset
    bars.forEach(b => b.className = 'password-strength-bar');

    if (password.length === 0) {
        label.textContent = 'Enter a password';
        label.style.color = 'var(--dark-400)';
        return;
    }

    let strength = 0;

    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Complexity checks
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    // Normalize to 0-4
    strength = Math.min(strength, 4);

    const levels = [
        { label: 'Very weak', color: 'var(--danger-400)', class: 'weak' },
        { label: 'Weak', color: 'var(--danger-400)', class: 'weak' },
        { label: 'Fair', color: 'var(--warning-400)', class: 'medium' },
        { label: 'Strong', color: 'var(--success-400)', class: 'strong' },
        { label: 'Very strong', color: 'var(--success-400)', class: 'strong' },
    ];

    const level = levels[strength];
    label.textContent = level.label;
    label.style.color = level.color;

    for (let i = 0; i < strength; i++) {
        bars[i].classList.add(level.class);
    }
}

// ── Social login buttons (demo) ──
document.addEventListener('DOMContentLoaded', () => {
    ['loginGoogle', 'loginTwitter', 'signupGoogle', 'signupTwitter'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                btn.style.opacity = '0.5';
                btn.textContent = 'Connecting...';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1200);
            });
        }
    });
});
