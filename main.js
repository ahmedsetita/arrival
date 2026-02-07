// ==================== MAIN WEBSITE FUNCTIONALITY ====================

// Courses data
const coursesData = [
    {
        title: "Mechanical Design",
        icon: "⚙️",
        description: "Master CAD tools like SolidWorks. Transform your ideas into manufacturable 3D designs and simulation.",
        level: "Intermediate",
        duration: "10 Weeks",
        tags: ["SolidWorks", "3D Modeling", "Prototyping"]
    },
    {
        title: "Robotics",
        icon: "🤖",
        description: "Build and program autonomous robots. Master sensors, actuators, and control systems in this hands-on track.",
        level: "Advanced",
        duration: "12 Weeks",
        tags: ["Arduino", "C++", "Electronics"],
        feedback: { folder: 'robotics', count: 8 }
    },
    {
        title: "Build Your Career",
        icon: "🚀",
        description: "Develop essential soft skills, resume building, and interview preparation strategies to land your dream job.",
        level: "All Levels",
        duration: "4 Weeks",
        tags: ["Soft Skills", "CV Writing", "Interviewing"]
    },
    {
        title: "Cybersecurity",
        icon: "🔒",
        description: "Learn to protect systems and networks. Dive into ethical hacking, defensive strategies, and security protocols.",
        level: "Beginner",
        duration: "14 Weeks",
        tags: ["Network Security", "Ethical Hacking", "Linux"]
    },
    {
        title: "AutoCAD",
        icon: "📐",
        description: "Professional training in 2D drafting and documentation. The standard for engineering and architectural design.",
        level: "Beginner",
        duration: "8 Weeks",
        tags: ["Drafting", "2D Design", "Engineering"]
    },
    {
        title: "Photoshop",
        icon: "🎨",
        description: "Master digital imaging and graphic design. Create stunning visuals, brand assets, and creative compositions.",
        level: "Beginner",
        duration: "6 Weeks",
        tags: ["Graphic Design", "Editing", "Visuals"]
    }
];

// Add courses to page
function addCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    if (!coursesGrid) return;

    coursesGrid.innerHTML = ''; // Clear existing content

    coursesData.forEach((course, index) => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.style.animationDelay = `${index * 100}ms`; // Stagger animation

        // Generate tags HTML
        const tagsHtml = course.tags.map(tag => `<span class="course-badge">${tag}</span>`).join('');

        courseCard.innerHTML = `
            <div class="course-header">
                <div class="course-icon">${course.icon}</div>
                <div>
                    <h3 class="course-title">${course.title}</h3>
                    <span class="course-level">${course.level}</span>
                </div>
            </div>
            <div class="course-content">
                <p style="color: var(--text-muted); margin-bottom: 1.5rem; flex: 1;">${course.description}</p>
                <div class="course-meta" style="margin-bottom: 1.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${tagsHtml}
                </div>
                <a href="#contact" class="btn btn-secondary" style="width: 100%; text-align: center; border-radius: 8px;">View Details</a>
            </div>
        `;
        coursesGrid.appendChild(courseCard);
    });
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetHeader = document.querySelector(targetId);

            if (targetHeader) {
                const headerOffset = 80;
                const elementPosition = targetHeader.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update active link
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
}

// Sticky navbar on scroll
function initStickyNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');

            // Construct WhatsApp message
            const whatsappMessage = `*New Contact Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'N/A'}\n*Message:* ${message}`;
            const whatsappUrl = `https://wa.me/201551559649?text=${encodeURIComponent(whatsappMessage)}`;

            // Visual feedback
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML; // Use innerHTML to preserve icon

            btn.innerText = 'Redirecting...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');

                btn.innerHTML = 'Message Sent!';
                btn.style.backgroundColor = '#10B981'; // Success green
                btn.style.borderColor = '#10B981';

                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1000);
        });
    }
}

// Feedback Gallery Toggle
// Gallery Modal Handling
function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.getElementById('modal-close');

    if (modal && closeBtn) {
        closeBtn.onclick = function () {
            closeModal();
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    }
}

function openGalleryModal(title, folder, count) {
    const modal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('modal-title');
    const galleryGrid = document.getElementById('modal-gallery-grid');

    if (modal && galleryGrid) {
        modalTitle.textContent = title + " - Student Projects";
        galleryGrid.innerHTML = '';

        for (let i = 1; i <= count; i++) {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'gallery-img-wrapper';

            // Assuming jpg extension based on user input
            const imgSrc = `${folder}/${i}.jpg`;

            imgWrapper.innerHTML = `<img src="${imgSrc}" alt="${title} Project ${i}" loading="lazy">`;
            galleryGrid.appendChild(imgWrapper);
        }

        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = '';
        }, 300);
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.course-card, .feature-card, .testimonial-card, .mission-box, .section-title, .hero-content');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    addCourses();
    initSmoothScroll();
    initStickyNavbar();
    initMobileMenu();
    initContactForm();
    initFeedbackGallery();

    // Small delay to ensure DOM is fully ready for animations
    setTimeout(initScrollAnimations, 100);
});