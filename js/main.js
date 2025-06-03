// Theme Toggle Functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const currentTheme = body.getAttribute("data-theme");

  if (currentTheme === "light") {
    body.setAttribute("data-theme", "dark");
    themeIcon.className = "fas fa-sun";
    localStorage.setItem("theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
    themeIcon.className = "fas fa-moon";
    localStorage.setItem("theme", "light");
  }
}

// Language Toggle Functionality
function toggleLanguage() {
  const body = document.body;
  const currentLang = body.getAttribute("data-lang");

  if (currentLang === "en") {
    body.setAttribute("data-lang", "ar");
    body.classList.add("rtl");
    localStorage.setItem("language", "ar");
  } else {
    body.setAttribute("data-lang", "en");
    body.classList.remove("rtl");
    localStorage.setItem("language", "en");
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY()";
    }
  });
}, observerOptions);

// Observe all sections for animation
document.addEventListener("DOMContentLoaded", () => {
  // Load saved preferences
  const savedTheme = localStorage.getItem("theme") || "light";
  const savedLang = localStorage.getItem("language") || "en";

  document.body.setAttribute("data-theme", savedTheme);
  document.body.setAttribute("data-lang", savedLang);

  if (savedTheme === "dark") {
    document.getElementById("theme-icon").className = "fas fa-sun";
  }

  if (savedLang === "ar") {
    document.body.classList.add("rtl");
  }

  // Add animation to elements
  const animatedElements = document.querySelectorAll(
    ".timeline-item, .project-card, .skill-category, .contact-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });

  // Header scroll effect
  let lastScrollTop = 0;
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title");
  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typingEffect = setInterval(() => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingEffect);
    }
  }, 100);

  // Parallax effect for hero section background

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.transform = `translateY(${-scrolled * 0.1}px)`;
    }
    console.log("Hero found:", hero);
  });

  // Form submission handler
  const contactForm = document.querySelector(".contact-form form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = "#10b981";

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        contactForm.reset();
      }, 2000);
    }, 2000);
  });

  // Add hover effects to skill tags
  document.querySelectorAll(".skill-tag").forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
      tag.style.transform = "scale(1.05) rotate(2deg)";
    });

    tag.addEventListener("mouseleave", () => {
      tag.style.transform = "scale(1) rotate(0deg)";
    });
  });

  // Add particle effect to hero section
  createParticles();
  222;
});

// Particle effect function
function createParticles() {
  const hero = document.querySelector(".hero");
  const particlesContainer = document.createElement("div");
  particlesContainer.style.position = "absolute";
  particlesContainer.style.top = "0";
  particlesContainer.style.left = "0";
  particlesContainer.style.width = "100%";
  particlesContainer.style.height = "100%";
  particlesContainer.style.pointerEvents = "none";
  particlesContainer.style.zIndex = "0";

  hero.appendChild(particlesContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "2px";
    particle.style.height = "2px";
    particle.style.background = "var(--accent-primary)";
    particle.style.borderRadius = "50%";
    particle.style.opacity = Math.random();
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animation = `float ${
      3 + Math.random() * 4
    }s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + "s";

    particlesContainer.appendChild(particle);
  }
}

// Toggle Mobile Menu
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");

  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// Close menu when clicking on a link (mobile)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.querySelector(".hamburger");

    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

// Close menu when clicking outside (mobile)
document.addEventListener("click", (e) => {
  const navMenu = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  if (!nav.contains(e.target) && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});
