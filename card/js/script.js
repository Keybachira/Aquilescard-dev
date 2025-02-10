let menu = document.getElementById('menu')
let tudo = document.getElementById('tudo')
let flip = document.getElementById('flip')
let contacto = document.getElementById('contacto')

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Animate skills on scroll
function animateSkills() {
    const skills = document.querySelectorAll('.progress');
    skills.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = '0';
        setTimeout(() => {
            skill.style.width = width;
        }, 300);
    });
}

// Animate on page load
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Detectar posição do scroll para adicionar efeitos
const card = document.querySelector('.card');
card.addEventListener('scroll', () => {
    const scrollPosition = card.scrollTop;
    const scrollHeight = card.scrollHeight - card.clientHeight;
    const scrollPercentage = (scrollPosition / scrollHeight) * 100;

    // Adicionar efeitos baseados na posição do scroll
    if (scrollPercentage > 10) {
        card.style.boxShadow = `0 0 30px var(--shadow-color),
                               0 0 60px rgba(0, 0, 0, 0.4),
                               0 0 ${scrollPercentage/2}px var(--primary-color)`;
    } else {
        card.style.boxShadow = `0 0 30px var(--shadow-color),
                               0 0 60px rgba(0, 0, 0, 0.4)`;
    }
});

// Animação suave ao carregar seções
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe elementos que devem ter animação
document.querySelectorAll('.skills-section, .contact-section').forEach((section) => {
    observer.observe(section);
});

// Adicione esta classe CSS para a animação fade-in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }

    .skills-section, .contact-section {
        opacity: 0;
    }
`;
document.head.appendChild(style);
