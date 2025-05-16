
export function renderAnimatedLogo() {
    const logoContainer = document.getElementById('animated-logo')
    
    logoContainer.innerHTML = `
      <div class="mm-logo">
        <div class="m m-left">M</div>
        <div class="m m-right">M</div>
      </div>
    `
    
    // Tilføj animation logic
    const mLeft = document.querySelector('.m-left')
    const mRight = document.querySelector('.m-right')
    
    let direction = 1
    let distance = 0
    const maxDistance = 20
    
    function animateLogo() {
      distance += 0.5 * direction
      
      if (distance >= maxDistance || distance <= 0) {
        direction *= -1
      }
      
      mLeft.style.transform = `translateX(${-distance}px) rotateY(${distance}deg)`
      mRight.style.transform = `translateX(${distance}px) rotateY(${-distance}deg)`
      
      requestAnimationFrame(animateLogo)
    }
    
    animateLogo()
  }