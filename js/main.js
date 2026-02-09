// ========================================
// Smooth Scrolling para links internos
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorar links que son solo "#" o para colapsar Bootstrap
        if (href === '#' || this.hasAttribute('data-bs-toggle')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajuste para navbar fixed
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// ========================================
// Active Navigation Link
// ========================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href').split("#")[0];
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ========================================
// Intersection Observer para animaciones
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeElements = document.querySelectorAll('.card, .timeline-item');

const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});

// ========================================
// Skills Progress Bars Animation
// ========================================
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Observar cuando las barras de progreso entran en viewport
const progressSection = document.querySelector('.progress');
if (progressSection) {
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    progressObserver.observe(progressSection.parentElement);
}

// ========================================
// Form Validation (si se agrega formulario de contacto)
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor ingresa un email válido');
            return;
        }
        
        // Aquí iría la lógica para enviar el formulario
        console.log('Formulario válido:', { name, email, message });
        alert('¡Mensaje enviado! Te contactaré pronto.');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// Toggle Read More en Blog
// ========================================
const readMoreButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
readMoreButtons.forEach(button => {
    const targetId = button.getAttribute('data-bs-target');
    const target = document.querySelector(targetId);
    
    if (target) {
        target.addEventListener('show.bs.collapse', function() {
            button.innerHTML = '<span class="read-more-text">Mostrar menos</span>';
        });
        
        target.addEventListener('hide.bs.collapse', function() {
            button.innerHTML = '<span class="read-more-text">Leer artículo completo</span>';
        });
    }
});

// ========================================
// Typing Effect para Hero Section (opcional)
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efecto solo si existe el elemento
const typingElement = document.querySelector('.typing-effect');
if (typingElement) {
    const originalText = typingElement.textContent;
    typeWriter(typingElement, originalText, 50);
}

// ========================================
// Scroll to Top Button
// ========================================
function createScrollTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollBtn.className = 'btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 scroll-top-btn';
    scrollBtn.style.cssText = 'width: 50px; height: 50px; display: none; z-index: 1000;';
    document.body.appendChild(scrollBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll al hacer click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Crear botón solo si no estamos en mobile
if (window.innerWidth > 768) {
    createScrollTopButton();
}

// ========================================
// Projects Filter (para página de portafolio)
// ========================================
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.classList.add('fade-in-up');
            }, 100);
        } else {
            project.style.display = 'none';
        }
    });
}

// ========================================
// Copy to Clipboard (para código en blog)
// ========================================
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-outline-primary copy-btn';
        button.innerHTML = '<i class="bi bi-clipboard"></i> Copiar';
        button.style.cssText = 'position: absolute; top: 5px; right: 5px;';
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(button);
        
        button.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.innerHTML = '<i class="bi bi-check"></i> Copiado!';
                setTimeout(() => {
                    button.innerHTML = '<i class="bi bi-clipboard"></i> Copiar';
                }, 2000);
            });
        });
    });
}

// Ejecutar si hay bloques de código
if (document.querySelectorAll('pre code').length > 0) {
    addCopyButtons();
}

// ========================================
// Loading Animation
// ========================================
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// ========================================
// Console Easter Egg
// ========================================
console.log('%c¡Hola Developer! 👋', 'font-size: 20px; color: #B8837D; font-weight: bold;');
console.log('%cGracias por revisar el código de mi portafolio.', 'font-size: 14px; color: #705C54;');
console.log('%cSi tienes feedback o una oportunidad laboral, contáctame:', 'font-size: 12px; color: #705C54;');
console.log('%czorayda.gutierrezrs@gmail.com', 'font-size: 14px; color: #B8837D; font-weight: bold;');

// ========================================
// Analytics Placeholder
// ========================================
// Aquí puedes agregar Google Analytics o cualquier otra herramienta de tracking
// Ejemplo:
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'TU-ID-DE-ANALYTICS');

// ========================================
// Service Worker (PWA - opcional)
// ========================================
if ('serviceWorker' in navigator) {
    // Descomentar si quieres hacer el portafolio un PWA
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registrado', reg))
    //     .catch(err => console.log('Error al registrar Service Worker', err));
}

// ========================================
// Utility Functions
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Uso: para eventos que se disparan frecuentemente
const debouncedResize = debounce(function() {
    console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);