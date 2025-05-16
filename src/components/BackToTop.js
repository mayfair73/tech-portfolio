 export function renderBackToTop() {
    // Lav button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top-btn';
    backToTopBtn.innerHTML = '&uarr;'; // 
    backToTopBtn.classList.add('back-to-top-btn', 'hidden');
    
    // Append button elementet
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button afhængig af scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    });
    
    // Scroll to top ved klik
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } 