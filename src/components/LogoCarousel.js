
export function renderLogoCarousel() {
    const logoCarousel = document.getElementById('logo-carousel')
    
    const logos = [
      { name: 'HTML', color: '#e34c26' },
      { name: 'CSS', color: '#264de4' },
      { name: 'SASS', color: '#cc6699' },
      { name: 'SQLite', color: '#0f80cc' },
      { name: 'REST API', color: '#61DAFB' },
      { name: 'Express', color: '#000000' },
      { name: 'Node', color: '#3c873a' },
      { name: 'Vite', color: '#3c878d' },
      { name: 'Vitest', color: '#3c654a' },
      { name: 'JavaScript', color: '#f7df1e' },
      { name: 'React', color: '#61DAFB' },
      { name: 'Tailwind', color: '#06B6D4' },
      { name: 'Wordpress', color: '#264de4' },
    ]
    
    logoCarousel.innerHTML = `
      <div class="logo-track">
        ${logos.map(logo => `
          <div class="logo-item" style="--logo-color: ${logo.color}">
            <div class="logo-box">
              <span>${logo.name}</span>
            </div>
          </div>
        `).join('')}
        ${logos.map(logo => `
          <div class="logo-item" style="--logo-color: ${logo.color}">
            <div class="logo-box">
              <span>${logo.name}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `
  }