document.addEventListener('DOMContentLoaded', () => {
    // Create particles
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random movement
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        // Random duration
        const duration = 3 + Math.random() * 4;
        particle.style.setProperty('--duration', `${duration}s`);
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, duration * 1000);
    }

    // Initial particle creation
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 100);
    }

    // Add parallax effect to bio card
    const bioCard = document.querySelector('.bio-card');
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX - innerWidth / 2) / 50;
        const y = (clientY - innerHeight / 2) / 50;
        bioCard.style.transform = `translateZ(20px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        bioCard.style.transform = 'translateZ(20px) rotateX(0) rotateY(0)';
    });

    // Add ripple effect to bio items
    const bioItems = document.querySelectorAll('.bio-item');
    bioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // Add hover effect to profile image
    const profileImage = document.querySelector('.profile-image');
    profileImage.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = profileImage.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        profileImage.style.transform = `
            scale(1.1)
            rotate(${x * 10}deg)
            translateX(${x * 10}px)
            translateY(${y * 10}px)
        `;
    });

    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = '';
    });

    // Add typing effect to warning items
    const warningItems = document.querySelectorAll('.warning-item');
    warningItems.forEach(item => {
        const text = item.textContent;
        item.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                item.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };
        
        // Start typing when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(item);
    });

    // Add smooth scroll effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 