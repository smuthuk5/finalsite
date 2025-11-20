// Mobile nav
(function () {
	const navToggle = document.getElementById('navToggle');
	const siteNav = document.getElementById('siteNav');
	if (navToggle && siteNav) {
		navToggle.addEventListener('click', function () {
			siteNav.classList.toggle('open');
		});
	}
})();

// Image loader that tries multiple extensions
(function () {
	function tryLoad(img, basePath) {
		const exts = ['.png', '.jpg', '.jpeg', '.webp'];
		let idx = 0;
		function setSrc() {
			if (idx >= exts.length) return;
			const src = basePath + exts[idx++];
			const test = new Image();
			test.onload = function () { img.src = src; };
			test.onerror = setSrc;
			test.src = src;
		}
		setSrc();
	}
	const imgs = document.querySelectorAll('img[data-img-base]');
	imgs.forEach(function (img) {
		const base = img.getAttribute('data-img-base');
		if (!base) return;
		tryLoad(img, base);
	});
})();

// Footer year
(function () {
	const y = document.getElementById('year');
	if (y) y.textContent = String(new Date().getFullYear());
})();

// Simple contact form validation (client only)
(function () {
	const form = document.getElementById('contactForm');
	if (!form) return;
	form.addEventListener('submit', function (e) {
		const formEl = e.target;
		const name = formEl.querySelector('input[name="name"]');
		const email = formEl.querySelector('input[name="email"]');
		const message = formEl.querySelector('textarea[name="message"]');
		if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
			// neutralized preventDefault in carousel events
			alert('Please fill in Name, Email, and Message.');
		} else {
			// neutralized preventDefault in carousel events
			alert('Thanks! Your message has been recorded. We will contact you shortly.');
			formEl.reset();
		}
	});
})();

// Home carousel auto-scroll
(function () {
	const carousel = document.getElementById('homeCarousel');
	if (!carousel) return;
	const track = carousel.querySelector('.carousel-track');
	const items = Array.from(track.children);
	const prevBtn = document.getElementById('carouselPrev');
	const nextBtn = document.getElementById('carouselNext');
	let index = 0;
	let timerId = null;

	function update() {
		const itemWidth = items[0].getBoundingClientRect().width + 16; // width + gap
		track.style.transform = `translateX(${-index * itemWidth}px)`;
	}

	function next() {
		index = (index + 1) % items.length;
		update();
	}
	function prev() {
		index = (index - 1 + items.length) % items.length;
		update();
	}
	function start() {
		stop();
		timerId = setInterval(next, 3000);
	}
	function stop() {
		if (timerId) clearInterval(timerId);
		timerId = null;
	}

	window.addEventListener('resize', update);
	update();
	start(); // auto-scroll

	if (nextBtn) {
		nextBtn.addEventListener('click', function () {
			next();
			start();
		});
	}
	if (prevBtn) {
		prevBtn.addEventListener('click', function () {
			prev();
			start();
		});
	}
})();





/* HERO carousel rotation added by CHATGPT */
(function(){
  var slides = document.querySelectorAll('.carousel-slide');
  if(!slides || slides.length===0) return;
  var idx = 0;
  function show(i){
    slides.forEach(function(s){ s.classList.remove('active'); });
    slides[i].classList.add('active');
  }
  function next(){
    idx = (idx+1) % slides.length;
    show(idx);
  }
  // start after DOM loaded
  document.addEventListener('DOMContentLoaded', function(){
    slides = document.querySelectorAll('.carousel-slide');
    if(slides.length===0) return;
    show(0);
    setInterval(next, 3500);
  });
})();
/* end carousel JS */



/* hero simple carousel rotation for hero-carousel-wrap */
(function(){
  function initHeroCarousel(){
    var slides = document.querySelectorAll('.hero-carousel.simple-carousel .carousel-slide');
    if(!slides || slides.length<=1) return;
    var idx = 0;
    slides.forEach(function(s, i){
      s.style.opacity = (i===0)?'1':'0';
      s.style.transition = 'opacity 600ms ease';
      s.style.position = 'absolute';
      s.style.left = 0;
      s.style.top = 0;
      s.style.width = '100%';
      s.style.height = 'auto';
      s.style.objectFit = 'contain';
      s.style.borderRadius = '8px';
    });
    // create container styles
    var container = document.querySelector('.hero-carousel.simple-carousel');
    if(container){
      container.style.position = 'relative';
      container.style.width = '100%';
      container.style.minHeight = '180px';
      container.style.display = 'block';
      container.style.overflow = 'hidden';
      container.style.padding = '12px';
      container.style.boxSizing = 'border-box';
    }
    setInterval(function(){
      var next = (idx+1)%slides.length;
      slides[idx].style.opacity = 0;
      slides[next].style.opacity = 1;
      idx = next;
    }, 3500);
  }
  document.addEventListener('DOMContentLoaded', initHeroCarousel);
})();
/* end hero carousel rotation */



/* Safe hero carousel rotator (opacity-based) */
(function(){
  function initSafeHeroCarousel(){
    var slides = document.querySelectorAll('.hero-carousel.simple-carousel .carousel-slide');
    if(!slides || slides.length<=1) return;
    var idx = 0;
    slides.forEach(function(s,i){
      s.style.opacity = (i===0)?'1':'0';
      s.style.transition = 'opacity 600ms ease';
      s.style.position = 'relative';
      s.style.display = 'block';
    });
    setInterval(function(){
      var next = (idx+1)%slides.length;
      slides[idx].style.opacity = 0;
      slides[next].style.opacity = 1;
      idx = next;
    }, 3500);
  }
  document.addEventListener('DOMContentLoaded', initSafeHeroCarousel);
})();



/* heroCarouselController: single-item carousel with controls and dots */
(function(){
  function initHeroCarousel(){
    var container = document.querySelector('.hero-carousel.simple-carousel');
    if(!container) return;
    var slides = Array.from(container.querySelectorAll('.carousel-slide'));
    if(slides.length===0) return;
    var idx = 0, timer = null, delay = 3500, paused = false;
    // initialize slides
    slides.forEach(function(s,i){
      if(i===0) s.classList.add('active');
      // ensure images fill container appropriately
      s.style.opacity = (i===0)?'1':'0';
    });
    // build dots
    var dotsWrap = container.querySelector('.carousel-dots');
    dotsWrap.innerHTML = '';
    slides.forEach(function(s,i){
      var b = document.createElement('button');
      b.setAttribute('aria-label','Go to slide '+(i+1));
      if(i===0) b.classList.add('active');
      b.addEventListener('click', function(){ goTo(i); });
      dotsWrap.appendChild(b);
    });
    function goTo(n){
      if(n===idx) return;
      slides[idx].classList.remove('active');
      slides[idx].style.opacity = 0;
      dotsWrap.children[idx].classList.remove('active');
      idx = n;
      slides[idx].classList.add('active');
      slides[idx].style.opacity = 1;
      dotsWrap.children[idx].classList.add('active');
    }
    function next(){
      goTo((idx+1)%slides.length);
    }
    // prev/next buttons
    var prev = container.querySelector('.carousel-btn.prev');
    var nextBtn = container.querySelector('.carousel-btn.next');
    prev.addEventListener('click', function(){ pause(); goTo((idx-1+slides.length)%slides.length); });
    nextBtn.addEventListener('click', function(){ pause(); next(); });
    // auto rotate
    function start(){ timer = setInterval(function(){ if(!paused) next(); }, delay); }
    function pause(){ paused = true; clearInterval(timer); setTimeout(function(){ paused = false; start(); }, delay); }
    container.addEventListener('mouseenter', function(){ paused = true; });
    container.addEventListener('mouseleave', function(){ paused = false; });
    start();
  }
  document.addEventListener('DOMContentLoaded', initHeroCarousel);
})();
/* end heroCarouselController */



/* heroSlidingCarousel: left-to-right sliding with controls + dots + pause on hover */
(function(){
  function initHeroSlidingCarousel(){
    var container = document.querySelector('.hero-carousel.simple-carousel');
    if(!container) return;
    var slides = Array.from(container.querySelectorAll('.carousel-slide'));
    if(slides.length<=1) return;
    var idx = 0, timer = null, delay = 3500, animating = false;
    // set initial positions
    slides.forEach(function(s,i){
      s.classList.remove('active','prev-slide');
      if(i===0) { s.classList.add('active'); s.style.transform='translateX(0%)'; s.style.opacity='1'; }
      else { s.style.transform='translateX(100%)'; s.style.opacity='0'; }
    });
    // build dots
    var dotsWrap = container.querySelector('.carousel-dots');
    dotsWrap.innerHTML = '';
    slides.forEach(function(_,i){
      var b = document.createElement('button');
      b.setAttribute('aria-label','Go to slide '+(i+1));
      if(i===0) b.classList.add('active');
      b.addEventListener('click', function(){ if(!animating) goTo(i); });
      dotsWrap.appendChild(b);
    });
    function goTo(n){
      if(animating || n===idx) return;
      animating = true;
      var curr = slides[idx], next = slides[n];
      // set next to right
      next.classList.remove('prev-slide'); next.style.transform='translateX(100%)'; next.style.opacity='1';
      // animate current to left
      curr.classList.remove('prev-slide'); curr.style.transform='translateX(-100%)'; curr.style.opacity='0';
      // animate next to center
      setTimeout(function(){ next.style.transform='translateX(0%)'; }, 20);
      // update dots
      var dots = dotsWrap.children;
      if(dots[idx]) dots[idx].classList.remove('active');
      if(dots[n]) dots[n].classList.add('active');
      // after animation finish
      setTimeout(function(){
        curr.classList.remove('active');
        next.classList.add('active');
        // reset offscreen slides
        slides.forEach(function(s,ii){ if(ii!==n) { s.style.transform='translateX(100%)'; s.style.opacity='0'; }});
        idx = n;
        animating = false;
      }, 720);
    }
    function nextSlide(){ goTo((idx+1)%slides.length); }
    // prev handler
    var prevBtn = container.querySelector('.carousel-btn.prev');
    var nextBtn = container.querySelector('.carousel-btn.next');
    if(prevBtn) prevBtn.addEventListener('click', function(){ if(!animating) goTo((idx-1+slides.length)%slides.length); });
    if(nextBtn) nextBtn.addEventListener('click', function(){ if(!animating) nextSlide(); });
    // auto-rotate
    timer = setInterval(nextSlide, delay);
    container.addEventListener('mouseenter', function(){ clearInterval(timer); timer = null; });
    container.addEventListener('mouseleave', function(){ if(!timer) timer = setInterval(nextSlide, delay); });
  }
  document.addEventListener('DOMContentLoaded', initHeroSlidingCarousel);
})();



/* Safety: ensure carousel slides toggle active class if controller missing */
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var container = document.querySelector('.hero-carousel.simple-carousel');
    if(!container) return;
    var slides = Array.from(container.querySelectorAll('.carousel-slide'));
    if(slides.length<=1) return;
    // ensure only one active
    var actives = slides.filter(s=>s.classList.contains('active'));
    if(actives.length===0) slides[0].classList.add('active');
    // fallback rotate if no controller present
    if(!window.heroCarouselControllerAttached){
      var idx=0;
      setInterval(function(){
        slides[idx].classList.remove('active');
        idx = (idx+1)%slides.length;
        slides[idx].classList.add('active');
      },3500);
    }
  });
})();



/* Safety controller to ensure slides are positioned and classes toggled correctly */
(function(){
  function ensureCarouselBehavior(){
    var container = document.querySelector('.hero-carousel.simple-carousel');
    if(!container) return;
    var slides = Array.from(container.querySelectorAll('.carousel-slide'));
    if(!slides.length) return;
    // ensure only one active
    slides.forEach(function(s){ s.classList.remove('prev-slide','next-slide'); });
    var idx = slides.findIndex(s=>s.classList.contains('active'));
    if(idx === -1) idx = 0;
    slides.forEach(function(s,i){
      s.style.opacity = (i===idx)?'1':'0';
      if(i===idx) { s.classList.add('active'); s.style.transform='translateX(0)'; }
      else if(i < idx) { s.classList.remove('active'); s.classList.add('prev-slide'); s.style.transform='translateX(-100%)'; }
      else { s.classList.remove('active'); s.classList.add('next-slide'); s.style.transform='translateX(100%)'; }
    });
    // start auto-rotate if not already
    if(!container._heroSafetyTimer){
      container._heroSafetyTimer = setInterval(function(){
        var current = slides.findIndex(s=>s.classList.contains('active'));
        var next = (current+1)%slides.length;
        slides[current].classList.remove('active'); slides[current].classList.add('prev-slide'); slides[current].style.opacity=0;
        slides[next].classList.remove('prev-slide','next-slide'); slides[next].classList.add('active'); slides[next].style.opacity=1; slides[next].style.transform='translateX(0)';
        // adjust others
        slides.forEach(function(s,i){ if(i!==next && i!==current){ s.classList.remove('active'); s.classList.remove('prev-slide'); s.classList.add('next-slide'); s.style.transform='translateX(100%)'; s.style.opacity=0; }});
      }, 3500);
    }
  }
  document.addEventListener('DOMContentLoaded', ensureCarouselBehavior);
})();



/* Simple fading hero rotator implemented by CHATGPT - cycles through images and updates the link */
(function(){
  var slides = [{"src": "assets/brushcutter-2s.png", "href": "product-brushcutter-2s.html"}, {"src": "assets/brushcutter-4s.png", "href": "product-brushcutter-4s.html"}, {"src": "assets/chainsaw.png", "href": "product-chainsaw-psm-kawasaqi.html"}, {"src": "assets/hedge-trimmer.png", "href": "product-hedgetrimmer-psm-ht.html"}, {"src": "assets/tiller.png", "href": "product-tiller-psm-ppt.html"}];
  var idx = 0;
  function showNext(){
    var img = document.getElementById('heroRotator');
    var link = document.getElementById('heroRotatorLink');
    if(!img) return;
    idx = (idx + 1) % slides.length;
    img.style.transition = 'opacity 600ms ease';
    img.style.opacity = 0;
    setTimeout(function(){
      img.src = slides[idx].src;
      if(link) link.href = slides[idx].href;
      img.style.opacity = 1;
    }, 650);
  }
  document.addEventListener('DOMContentLoaded', function(){
    var img = document.getElementById('heroRotator');
    var link = document.getElementById('heroRotatorLink');
    if(!img) return;
    // initial link
    if(link) link.href = slides[0].href;
    img.style.opacity = 1;
    setInterval(showNext, 3500);
  });
})();



/* Single-image fading rotator script */
(function(){
  var slides = [{"src": "assets/brushcutter-2s.png", "href": "product-brushcutter-2s.html"}, {"src": "assets/brushcutter-4s.png", "href": "product-brushcutter-4s.html"}, {"src": "assets/chainsaw.png", "href": "product-chainsaw-psm-kawasaqi.html"}, {"src": "assets/hedge-trimmer.png", "href": "product-hedgetrimmer-psm-ht.html"}, {"src": "assets/tiller.png", "href": "product-tiller-psm-ppt.html"}];
  var idx = 0;
  function showNext(){
    var img = document.getElementById('heroRotator');
    var link = document.getElementById('heroRotatorLink');
    if(!img) return;
    idx = (idx + 1) % slides.length;
    img.style.opacity = 0;
    setTimeout(function(){
      img.src = slides[idx].src;
      if(link) link.href = slides[idx].href;
      img.style.opacity = 1;
    }, 600);
  }
  document.addEventListener('DOMContentLoaded', function(){
    var img = document.getElementById('heroRotator');
    var link = document.getElementById('heroRotatorLink');
    if(!img) return;
    if(link) link.href = slides[0].href;
    img.style.opacity = 1;
    setInterval(showNext, 3500);
  });
})();
