/**
 * ARMOND GUINCHOS - JAVASCRIPT
 * Scripts de interação e otimização
 */

<<<<<<< HEAD
=======
// ==================== PORTFOLIO LIGHTBOX ==================== //

/**
 * Lista de itens do portfólio visíveis (para navegação)
 */
let portfolioItems = [];
let currentPhotoIndex = 0;

/**
 * Abre o lightbox ao clicar em uma foto do portfólio
 */
function openLightbox(itemEl) {
    portfolioItems = Array.from(
        document.querySelectorAll('.portfolio-item:not([style*="display:none"])')
    );
    currentPhotoIndex = portfolioItems.indexOf(itemEl);

    showPhoto(currentPhotoIndex);
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Fecha o lightbox
 */
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Navega para uma foto pelo índice
 */
function showPhoto(index) {
    const item = portfolioItems[index];
    if (!item) return;

    const img    = item.querySelector('img');
    const src    = img.getAttribute('data-src') || img.getAttribute('src');
    const caption = img.getAttribute('data-caption') || img.getAttribute('alt') || '';

    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxImg').alt = caption;
    document.getElementById('lightboxCaption').textContent = caption;
    currentPhotoIndex = index;
}

/**
 * Próxima foto
 */
function nextPhoto() {
    const next = (currentPhotoIndex + 1) % portfolioItems.length;
    showPhoto(next);
}

/**
 * Foto anterior
 */
function prevPhoto() {
    const prev = (currentPhotoIndex - 1 + portfolioItems.length) % portfolioItems.length;
    showPhoto(prev);
}

// Fecha lightbox ao clicar fora da imagem
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Navegação pelo teclado
    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowRight')  nextPhoto();
        if (e.key === 'ArrowLeft')   prevPhoto();
    });

    // Verifica se todas as imagens do portfólio falharam → exibe aviso
    const grid  = document.getElementById('portfolioGrid');
    const empty = document.getElementById('portfolioEmpty');
    if (grid && empty) {
        const allItems = grid.querySelectorAll('.portfolio-item');
        let loaded = 0;
        let failed = 0;

        allItems.forEach(item => {
            const img = item.querySelector('img');
            if (!img) { failed++; return; }

            img.addEventListener('load',  () => { loaded++; });
            img.addEventListener('error', () => {
                failed++;
                item.style.display = 'none';
                if (failed === allItems.length) empty.style.display = 'block';
            });

            // Imagem já estava em cache (já carregada)
            if (img.complete && img.naturalWidth > 0) loaded++;
        });
    }
});

>>>>>>> c2e9d59 (Configuração inicial do site Armond Guinchos)
// ==================== INTERSECTION OBSERVER PARA ANIMAÇÕES ==================== //

/**
 * Anima elementos quando entram na viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos que precisam de animação
document.querySelectorAll('.service-card, .region-card, .payment-method').forEach(el => {
    observer.observe(el);
});

// ==================== SMOOTH SCROLL PARA BOTÕES ==================== //

/**
 * Permite smooth scroll natural para botões com href interno
 */
document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Deixa os links de telefone e WhatsApp funcionarem normalmente
        if (this.getAttribute('href').startsWith('tel:') || 
            this.getAttribute('href').startsWith('https://wa.me')) {
            return true;
        }
    });
});

// ==================== PERFORMANCE LOGGING ==================== //

/**
 * Log de performance no console (desenvolvimento)
 */
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        console.log('✅ Site otimizado para máxima performance em 3G');
        console.log('📱 Teste com DevTools: Throttle Network para 3G');
        console.log('⚡ Intersection Observer ativado');
    });
}

// ==================== LAZY LOADING PARA IMAGENS ==================== //

/**
 * Lazy loading nativo para imagens (se adicionadas futuramente)
 */
if ('IntersectionObserver' in window) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.addEventListener('load', () => {
            console.log(`📸 Imagem carregada: ${img.src}`);
        });
    });
}

// ==================== CLICK TRACKING (Analytics) ==================== //

/**
 * Rastreia cliques em CTA (útil para Google Analytics)
 */
const ctas = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-call, .whatsapp-button');

ctas.forEach(cta => {
    cta.addEventListener('click', () => {
        const ctaText = cta.textContent.trim();
        console.log(`📊 CTA clicado: ${ctaText}`);
        
        // Se usar Google Analytics, descomente a linha abaixo:
        // gtag('event', 'cta_click', { 'button': ctaText });
    });
});

// ==================== HEADER STICKY BEHAVIOR ==================== //

/**
 * Detecta scroll para adicionar efeitos visuais ao header
 */
let lastScrollTop = 0;
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        if (scrollTop > 50) {
            header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(220, 38, 38, 0.2)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ==================== DETECÇÃO DE VELOCIDADE DE CONEXÃO ==================== //

/**
 * Aviso se conexão for lenta (2G)
 */
if (navigator.connection) {
    const connection = navigator.connection;
    
    if (connection.effectiveType === '2g' || connection.effectiveType === '3g') {
        console.warn('🚦 Conexão lenta detectada. Algumas otimizações podem estar ativas.');
    }
    
    connection.addEventListener('change', () => {
        console.log(`📡 Velocidade da conexão: ${connection.effectiveType}`);
    });
}

// ==================== DETECÇÃO DE DEVICE ==================== //

/**
 * Log de informações do dispositivo
 */
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isTablet = /iPad|Android(?!.*Mobi)/i.test(navigator.userAgent);

if (window.location.hostname === 'localhost') {
    console.log(`📱 Device: ${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}`);
    console.log(`🖥️ Screen: ${window.innerWidth}x${window.innerHeight}`);
}

// ==================== CONTACT FORM VALIDATION (Se adicionar depois) ==================== //

/**
 * Validação básica de formulários
 * (Ativar quando adicionar formulário)
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s+\-()]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ==================== THEME TOGGLE (Modo Escuro) ==================== //

/**
 * Sistema de tema claro/escuro (opcional)
 * Descomente para ativar
 */

/*
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function toggleDarkMode(enable) {
    document.documentElement.setAttribute('data-theme', enable ? 'dark' : 'light');
    localStorage.setItem('theme', enable ? 'dark' : 'light');
}

// Respeita preferência do sistema
if (prefersDark.matches) {
    toggleDarkMode(true);
}

// Monitora mudanças de tema do sistema
prefersDark.addEventListener('change', (e) => {
    toggleDarkMode(e.matches);
});
*/

// ==================== NOTIFICAÇÃO DE OFFLINE ==================== //

/**
 * Alerta quando conexão cai (offline)
 */
window.addEventListener('offline', () => {
    console.warn('⚠️ Você ficou offline. Algumas funcionalidades podem não estar disponíveis.');
});

window.addEventListener('online', () => {
    console.log('✅ Você está online novamente!');
});

// ==================== INICIALIZAÇÃO ==================== //

/**
 * Funções de inicialização
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM carregado - Armond Guinchos pronto!');
    
    // Todas as animações e listeners já foram configurados acima
});

// ==================== EXPORT FUNCTIONS (Para usar em HTML) ==================== //

/**
 * Funções úteis que podem ser chamadas do HTML
 */

/**
 * Abre WhatsApp com mensagem pré-formatada
 */
function openWhatsApp(phone = '+5531981080312', message = 'Olá! Preciso de um guincho urgente!') {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

/**
 * Faz ligação (abre app telefônico)
 */
function makeCall(phone = '+5531981080312') {
    if (typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phone}`;
    } else {
        alert(`Ligue para: ${phone}`);
    }
}

/**
 * Copia texto para clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            console.log(`✅ Copiado: ${text}`);
            alert('Telefone copiado para a área de transferência!');
        });
    } else {
        // Fallback para navegadores antigos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        console.log(`✅ Copiado: ${text}`);
    }
}

/**
 * Scroll suave até um elemento
 */
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Rastreia evento customizado (para Google Analytics)
 */
function trackEvent(eventName, eventData = {}) {
    console.log(`📊 Evento: ${eventName}`, eventData);
    
    // Se usar Google Analytics, descomente:
    // gtag('event', eventName, eventData);
}

// ==================== SERVICE WORKER (PWA - Opcional) ==================== //

/**
 * Registra Service Worker para funcionar offline
 * Descomente para ativar Progressive Web App
 */

/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('✅ Service Worker registrado');
        }).catch(error => {
            console.error('❌ Erro ao registrar Service Worker:', error);
        });
    });
}
*/

// ==================== EXPORT PARA GLOBAL ==================== //

// Disponibiliza funções globalmente se necessário chamar de HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openWhatsApp,
        makeCall,
        copyToClipboard,
        scrollToElement,
        trackEvent,
        validateEmail,
        validatePhone
    };
}

// Ou adiciona ao window para usar inline no HTML
window.guinchos = {
    openWhatsApp,
    makeCall,
    copyToClipboard,
    scrollToElement,
    trackEvent,
    validateEmail,
    validatePhone
};
