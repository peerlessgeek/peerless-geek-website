/* =========================================
   1. LINK CONFIGURATION & INJECTION
   ========================================= */
const LINKS = { 
  java: "https://www.udemy.com/course/the-ultimate-animated-java-interview-questions-course/?couponCode=JAVA202601", 
  blind75: "https://www.udemy.com/course/blind-75-leetcode-the-animated-aura-series-crack-dsa/?couponCode=BLIND75JUL2601", 
  instagram: "https://www.instagram.com/peerlessgeek/", 
  youtube: "https://www.youtube.com/@peerlessgeek", 
  facebook: "https://facebook.com",
  linkedin: "https://www.linkedin.com/company/peerlessgeek", 
  github: "https://github.com/peerlessgeek", 
  x: "https://x.com/thepeerlessgeek"
};

function applyLinks() {
  const linkElements = document.querySelectorAll('[data-link]');
  linkElements.forEach(el => {
    const key = el.getAttribute('data-link');
    if (LINKS[key]) {
      el.setAttribute('href', LINKS[key]);
    }
  });
}

/* =========================================
   2. STICKY NAV & MOBILE MENU
   ========================================= */
function initNav() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
  });

  // Close mobile drawer when tapping outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target) && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    }
  });
}

/* =========================================
   3. INTERSECTION OBSERVER
   ========================================= */
function initObservers() {
  const fadeElements = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  fadeElements.forEach(el => fadeObserver.observe(el));

  const statsSection = document.getElementById('stats');
  let countersStarted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      runCounters();
    }
  }, { threshold: 0.2 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }
}

function runCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 1500;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      counter.innerText = Math.floor(easeProgress * target);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    }
    requestAnimationFrame(updateCount);
  });

  const floatCounters = document.querySelectorAll('.counter-float');
  floatCounters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const duration = 1500;
    const startTime = performance.now();

    function updateFloat(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      counter.innerText = (easeProgress * target).toFixed(1);

      if (progress < 1) {
        requestAnimationFrame(updateFloat);
      } else {
        counter.innerText = target.toFixed(1);
      }
    }
    requestAnimationFrame(updateFloat);
  });
}

/* =========================================
   4. DESKTOP HERO MOUSE PARALLAX
   ========================================= */
function initParallax() {
  const box = document.getElementById('parallaxBox');
  const hero = document.querySelector('.hero');
  
  // Strict check: Only activate on desktop devices with fine pointer control
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!box || !hero || !isDesktop || window.innerWidth < 992) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY - centerY) / centerY) * -6;
    const rotateY = ((mouseX - centerX) / centerX) * 6;

    box.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  hero.addEventListener('mouseleave', () => {
    box.style.transform = 'rotateX(0deg) rotateY(0deg)';
    box.style.transition = 'transform 0.5s ease-out';
  });

  hero.addEventListener('mouseenter', () => {
    box.style.transition = 'transform 0.1s ease-out';
  });
}

/* =========================================
   5. BUTTON RIPPLE EFFECT
   ========================================= */
function initRipple() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const circle = document.createElement('span');
      circle.classList.add('ripple');
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      this.appendChild(circle);

      setTimeout(() => { circle.remove(); }, 600);
    });
  });
}

/* =========================================
   6. DYNAMIC FAQ ACCORDION
   ========================================= */
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  function updateActiveHeight() {
    faqItems.forEach(item => {
      if (item.classList.contains('active')) {
        const answer = item.querySelector('.faq-answer');
        const answerInner = item.querySelector('.faq-answer-inner');
        answer.style.maxHeight = `${answerInner.scrollHeight + 30}px`;
      }
    });
  }

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const answerInner = item.querySelector('.faq-answer-inner');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answerInner.scrollHeight + 30}px`;
      }
    });

    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  // Recalculate heights on mobile orientation change or window resize
  window.addEventListener('resize', updateActiveHeight, { passive: true });
}

/* =========================================
   7. COPY COUPON TO CLIPBOARD
   ========================================= */
function initCopyCoupons() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Stop the click from bubbling up and triggering any other mobile tap effects
      e.preventDefault();
      e.stopPropagation(); 
      
      const code = btn.getAttribute('data-code');
      const codeTextSpan = btn.querySelector('.code-text');
      const icon = btn.querySelector('.copy-icon');

      // Write code to clipboard
      navigator.clipboard.writeText(code).then(() => {
        const originalText = codeTextSpan.innerText;
        const originalIcon = icon.className;
        
        // Success visual feedback
        btn.classList.add('copied');
        codeTextSpan.innerText = 'Copied!';
        icon.className = 'fa-solid fa-check copy-icon';

        // Revert back after 2 seconds
        setTimeout(() => {
          btn.classList.remove('copied');
          codeTextSpan.innerText = originalText;
          icon.className = originalIcon;
        }, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    });
  });
}

/* =========================================
   8. INITIALIZATION
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  applyLinks();
  initNav();
  initObservers();
  initParallax();
  initRipple();
  initFaq();
  initCopyCoupons();

  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});