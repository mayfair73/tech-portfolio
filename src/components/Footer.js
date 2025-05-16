
export function renderFooter() {
    const footer = document.getElementById('footer')
    
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Contact</h3>
            <p><span class="contact-icon">✉</span> mikelamann1@gmail.com</p>
            <p><span class="contact-icon">☎</span> (+45) 27570712</p>
          </div>
          
          <div class="footer-section">
            <h3>Social</h3>
            <div class="social-links">
              <a href="https://github.com/Mikela-Mann-MM" class="social-link" target="_blank">GitHub</a>
              <a href="https://www.linkedin.com/in/mikela-mann-2aa544365/" class="social-link" target="_blank">LinkedIn</a>
              <a href="https://www.instagram.com/mikelamann/" class="social-link" target="_blank">Instagram</a>
            </div>
          </div>
          
          <div id="contact" class="footer-section">
            <p class="footer-note">Built with <span class="heart">♥</span> and JavaScript</p>
            <p class="footer-note">Press ESC for a surprise</p>
            <p class="footer-note">
              <button id="open-ai-assistant" class="ai-assistant-btn">Chat with AI Assistant</button>
            </p>
          </div>
        </div>
        
        <div class="copyright">
          © ${new Date().getFullYear()} | MIKELA MANN 
        </div>
      </footer>
    `
    
    // Add event listener to the AI Assistant button
    document.getElementById('open-ai-assistant').addEventListener('click', () => {
      const avatarSection = document.getElementById('pixel-avatar-section')
      if (avatarSection) {
        avatarSection.style.display = 'block'
      }
    })
  }