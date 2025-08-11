// Loader functionality
window.addEventListener("load", () => {
  const loader = document.getElementById("loader")
  setTimeout(() => {
    loader.style.opacity = "0"
    setTimeout(() => {
      loader.style.display = "none"
    }, 500)
  }, 2000)
})

// Navigation functionality
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling and active navigation
function updateActiveNav() {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveNav)

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)"
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)"
  }
})

// Animated counters for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        if (counter.id === "projects-count") {
          counter.textContent = target + "+";
        } else {
          counter.textContent = target;
        }
      }
    };

    updateCounter();
  });
}


// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = width + "%"
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("stats")) {
        animateCounters()
      }
      if (entry.target.classList.contains("skills-grid")) {
        animateSkillBars()
      }

      // Add fade-in animation
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".stats, .skills-grid, .projects-grid, .contact-content")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(el)
  })
})

// Floating particles animation
function createFloatingParticles() {
  const particlesContainer = document.querySelector(".floating-particles")

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            box-shadow: 0 0 6px var(--primary-color);
            animation: floatRandom ${5 + Math.random() * 10}s ease-in-out infinite;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `
    particlesContainer.appendChild(particle)
  }
}

// Add floating particles animation keyframes
const style = document.createElement("style")
style.textContent = `
    @keyframes floatRandom {
        0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
        }
        25% { 
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
            opacity: 1;
        }
        50% { 
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
            opacity: 0.5;
        }
        75% { 
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
            opacity: 0.8;
        }
    }
`
document.head.appendChild(style)

// Initialize particles
document.addEventListener("DOMContentLoaded", createFloatingParticles)

// Add typing effect to hero code
function typeWriter() {
  const codeLines = document.querySelectorAll(".code-lines span")

  codeLines.forEach((line, index) => {
    const text = line.textContent
    line.textContent = ""

    setTimeout(() => {
      let i = 0
      const typing = setInterval(() => {
        if (i < text.length) {
          line.textContent += text.charAt(i)
          i++
        } else {
          clearInterval(typing)
        }
      }, 50)
    }, index * 1000)
  })
}

// Start typing effect after loader
setTimeout(typeWriter, 3000)

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero-background")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) rotateX(5deg)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotateX(0deg)"
  })
})

// Add glitch effect on logo hover
document.querySelector(".logo").addEventListener("mouseenter", function () {
  this.querySelector(".logo-text").style.animation = "glitch 0.3s infinite"
})

document.querySelector(".logo").addEventListener("mouseleave", function () {
  this.querySelector(".logo-text").style.animation = "none"
})

function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");

    // Hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent redirect

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector("button");

    submitBtn.textContent = "SENDING...";
    submitBtn.disabled = true;

    fetch("https://formsubmit.co/ajax/anishgrdh@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showToast("✅ Message sent successfully!");
        form.reset();
    })
    .catch(error => {
        showToast("❌ Error sending message. Try again.", true);
    })
    .finally(() => {
        submitBtn.textContent = "SEND MESSAGE";
        submitBtn.disabled = false;
    });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
