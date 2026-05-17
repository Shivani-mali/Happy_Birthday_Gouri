document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('name-input');
    const searchBtn = document.getElementById('search-btn');
    const errorMsg = document.getElementById('error-message');
    const searchContainer = document.getElementById('search-container');
    const galleryContainer = document.getElementById('gallery-container');
    const envelopeContainer = document.getElementById('envelope-container');
    const envelopeWrapper = document.getElementById('envelope');
    const continueBtn = document.getElementById('continue-btn');
    const explosionLayer = document.getElementById('explosion-layer');
    const photoGrid = document.getElementById('photo-grid');

    const photos = [
        "WhatsApp Image 2026-05-17 at 12.57.09 PM.jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.10 PM.jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.11 PM (1).jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.11 PM (2).jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.11 PM.jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.12 PM (1).jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.12 PM.jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.14 PM.jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.15 PM.jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.16 PM (1).jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.16 PM.jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.17 PM (1).jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.17 PM (2).jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.17 PM.jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.18 PM (1).jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.18 PM (2).jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.18 PM.jpeg",
        "WhatsApp Image 2026-05-17 at 12.57.19 PM.jpeg"
    ];

    const funnyMessages = [
        "Hmm, never heard of them. Try again!",
        "Nope, not that one.",
        "Are you sure that's the right name?",
        "Access denied! Only the VIP is allowed.",
        "That's a nice name, but it's not the magic word!"
    ];

    const flirtyLines = [
        "Did it hurt when you fell from heaven?",
        "You're not a camera, but every time I look at you I smile.",
        "Are you a magician? Because whenever I look at you, everyone else disappears.",
        "If you were a vegetable, you'd be a cute-cumber.",
        "Are you made of copper and tellurium? Because you're Cu-Te.",
        "I must be a snowflake, because I've fallen for you.",
        "If you were words on a page, you'd be fine print.",
        "Do you have a map? I keep getting lost in your eyes.",
        "You're the only flaw in my perfectly planned life.",
        "Can I follow you home? Cause my parents always told me to follow my dreams.",
        "If beauty were a crime, you'd be serving a life sentence.",
        "Are you a time traveler? Cause I see you in my future.",
        "Your hand looks heavy—can I hold it for you?",
        "Is your name Google? Because you have everything I’ve been searching for.",
        "I ought to complain to Spotify for you not being named this week’s hottest single.",
        "Are you French? Because Eiffel for you.",
        "You must be a compass, because I'd be lost without you.",
        "If I could rearrange the alphabet, I’d put U and I together.",
        "Is there an airport nearby or is it my heart taking off?",
        "You make my heart skip a beat every single time."
    ];

    function handleSearch() {
        const val = input.value.trim().toLowerCase();
        if (!val) return;

        if (val === 'gouri') {
            unlockGallery();
        } else {
            const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
            errorMsg.textContent = randomMsg;
            errorMsg.classList.add('show');
            
            // Shake animation for input
            input.style.transform = 'translateX(-10px)';
            setTimeout(() => input.style.transform = 'translateX(10px)', 100);
            setTimeout(() => input.style.transform = 'translateX(-10px)', 200);
            setTimeout(() => input.style.transform = 'translateX(0)', 300);
        }
    }

    function unlockGallery() {
        errorMsg.classList.remove('show');
        
        // 1. Hide search
        searchContainer.classList.remove('active');
        
        // 2. Trigger explosion layer
        setTimeout(() => {
            explosionLayer.classList.add('explode');
            triggerConfetti();
        }, 300);

        // 3. Show envelope
        setTimeout(() => {
            envelopeContainer.classList.add('active');
        }, 1000);
    }

    envelopeWrapper.addEventListener('click', (e) => {
        if (e.target === continueBtn) return;
        envelopeWrapper.classList.add('open');
    });

    continueBtn.addEventListener('click', () => {
        envelopeContainer.classList.remove('active');
        setTimeout(() => {
            envelopeContainer.style.display = 'none';
            galleryContainer.classList.add('active');
            loadPhotos();
        }, 800);
    });

    function triggerConfetti() {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ec4899', '#8b5cf6', '#38bdf8', '#fb7185', '#d946ef']
        });
    }

    function loadPhotos() {
        photos.forEach((photo, index) => {
            const delay = index * 100; // Stagger effect
            
            const div = document.createElement('div');
            div.className = 'photo-item';
            div.style.animationDelay = `${delay}ms`;
            
            const img = document.createElement('img');
            img.src = `./assets/img/${photo}`;
            img.alt = `Gouri's Photo ${index + 1}`;
            img.loading = "lazy";

            const caption = document.createElement('div');
            caption.className = 'photo-caption';
            caption.textContent = flirtyLines[index % flirtyLines.length];
            
            div.addEventListener('click', () => {
                div.classList.toggle('show-caption');
            });
            
            div.appendChild(img);
            div.appendChild(caption);
            photoGrid.appendChild(div);
        });
    }

    searchBtn.addEventListener('click', handleSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Clear error message on typing
    input.addEventListener('input', () => {
        if (errorMsg.classList.contains('show')) {
            errorMsg.classList.remove('show');
        }
    });
});
