// ==================== MAIN WEBSITE FUNCTIONALITY ====================

// Courses data
const coursesData = [
    {
        title: "Robotics",
        icon: "🤖",
        description: "Introduction to robotics with hands-on projects. Learn to build and program robots from scratch.",
        level: "Beginner",
        duration: "40 hours",
        prerequisites: "Basic programming knowledge"
    },
    {
        title: "Artificial Intelligence",
        icon: "🧠",
        description: "Explore AI and its applications. Machine learning, neural networks, and real-world AI projects.",
        level: "Intermediate",
        duration: "50 hours",
        prerequisites: "Python programming"
    },
    {
        title: "AutoCAD",
        icon: "📐",
        description: "Master designing and drafting with AutoCAD. Create professional technical drawings and 3D models.",
        level: "Beginner",
        duration: "30 hours",
        prerequisites: "None"
    },
    {
        title: "SolidWorks",
        icon: "⚙️",
        description: "Advanced CAD design using SolidWorks. Learn 3D modeling, simulation, and engineering design.",
        level: "Advanced",
        duration: "45 hours",
        prerequisites: "AutoCAD or similar"
    },
    {
        title: "Soft Skills",
        icon: "🤝",
        description: "Develop communication, leadership, teamwork, and problem-solving skills essential for career success.",
        level: "All Levels",
        duration: "25 hours",
        prerequisites: "None"
    }
];

// Add courses to page
function addCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    if (!coursesGrid) return;

    coursesData.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-header">
                <div class="course-icon">${course.icon}</div>
                <h3 class="course-title">${course.title}</h3>
            </div>
            <div class="course-content">
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span class="course-badge">⏱ ${course.duration}</span>
                    <span class="course-level">${course.level}</span>
                </div>
                <a href="#contact" class="course-link">Enroll Now</a>
            </div>
        `;
        coursesGrid.appendChild(courseCard);
    });
}

// Smooth scroll for navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sticky navbar on scroll
function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
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
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Initialize all website functionality
document.addEventListener('DOMContentLoaded', () => {
    addCourses();
    initSmoothScroll();
    initStickyNavbar();
    initMobileMenu();
    initContactForm();
});

// Add scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations
initScrollAnimations();