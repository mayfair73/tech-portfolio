# AI Assistant Integration Guide

This guide explains how to add and customize the AI assistant chatbot feature in your portfolio website.

## Overview

The AI assistant is a customizable chat interface that helps visitors learn about your skills, projects, and experience through an interactive conversation. The assistant:

- Appears as a floating button on the bottom left of the screen
- Can be opened/closed at any time
- Provides predetermined responses based on keyword recognition
- Simulates a typing effect for a more natural conversation
- Has a draggable interface that can be moved around the screen

## Components

The feature consists of the following components:

1. **Pixel Avatar Module**: The main component that renders the chat interface
2. **Floating Button**: A persistent button that opens the assistant
3. **Footer Button**: An alternative way to open the assistant
4. **CSS Styling**: For the chat interface and buttons

## Implementation Steps

### 1. Create the Chat Interface (pixel-avatar.js)

This file manages the chat interface including rendering, showing/hiding, and handling message interactions.

```javascript
// src/components/pixel-avatar.js
import '../styles/pixel-avatar.scss'

export function renderPixelAvatar() {
  
  let avatarSection = document.getElementById('pixel-avatar-section')
  if (!avatarSection) {
    avatarSection = document.createElement('div')
    avatarSection.id = 'pixel-avatar-section'
    document.body.appendChild(avatarSection)
  }
  
  // Hidden by default
  avatarSection.style.display = 'none'
  
  // Create chat interface HTML
  avatarSection.innerHTML = `
    <div class="pixel-avatar-popup">
      <div class="pixel-popup-container">
        <!-- Header with close button -->
        <div class="pixel-popup-header">
          <div class="pixel-popup-title">AI Assistant</div>
          <div class="pixel-popup-close">✕</div>
        </div>
        
        <!-- Chat messages area -->
        <div class="pixel-popup-messages" id="pixel-chat-messages">
          <div class="pixel-message avatar-message">
            <div class="pixel-message-text">Hello! I'm your AI assistant. I can tell you about my skills, projects, and experience. What would you like to know?</div>
          </div>
        </div>
        
        <!-- Name input area -->
        <div class="pixel-name-container" id="pixel-name-container">
          <input type="text" class="pixel-input" id="pixel-name-input" placeholder="Your name (optional)">
          <button class="pixel-button" id="pixel-set-name-btn">Set</button>
        </div>
        
        <!-- Message input area -->
        <div class="pixel-input-container">
          <input type="text" class="pixel-input" id="pixel-message-input" placeholder="Ask me anything...">
          <button class="pixel-button" id="pixel-send-btn">Send</button>
        </div>
        
        <!-- Quick question buttons -->
        <div class="pixel-quick-questions">
          <button class="pixel-quick-btn" data-question="What technologies do you know?">Tech Stack</button>
          <button class="pixel-quick-btn" data-question="Tell me about your projects">Projects</button>
          <button class="pixel-quick-btn" data-question="What is your experience?">Experience</button>
          <button class="pixel-quick-btn" data-question="How do you approach development?">Process</button>
        </div>
      </div>
    </div>
  `
  
  // Get elements
  const closeButton = avatarSection.querySelector('.pixel-popup-close')
  const messageInput = document.getElementById('pixel-message-input')
  const sendButton = document.getElementById('pixel-send-btn')
  const nameInput = document.getElementById('pixel-name-input')
  const setNameButton = document.getElementById('pixel-set-name-btn')
  const quickButtons = avatarSection.querySelectorAll('.pixel-quick-btn')
  const messagesContainer = document.getElementById('pixel-chat-messages')
  const nameContainer = document.getElementById('pixel-name-container')
  
  let visitorName = ''
  
  // Close button handler
  closeButton.addEventListener('click', () => {
    avatarSection.style.display = 'none'
    // Clear chat history when closing
    messagesContainer.innerHTML = `
      <div class="pixel-message avatar-message">
        <div class="pixel-message-text">Hello! I'm your AI assistant. I can tell you about my skills, projects, and experience. What would you like to know?</div>
      </div>
    `
    // Reset name input if it was shown
    nameContainer.style.display = 'block'
    nameInput.value = ''
    visitorName = ''
  })
  
  // Set name handler
  setNameButton.addEventListener('click', () => {
    const name = nameInput.value.trim()
    if (name !== '') {
      visitorName = name
      nameContainer.style.display = 'none'
      addAvatarMessage(`Nice to meet you, ${visitorName}! How can I help you today?`)
    }
  })
  
 
  sendButton.addEventListener('click', sendMessage)
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  })
  
  // Quick question buttons
  quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question')
      addUserMessage(question)
      setTimeout(() => {
        processMessage(question)
      }, 500)
    })
  })
  
  function sendMessage() {
    const message = messageInput.value.trim()
    if (message !== '') {
      addUserMessage(message)
      messageInput.value = ''
      
      setTimeout(() => {
        processMessage(message)
      }, 500)
    }
  }
  
  function addUserMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.className = 'pixel-message user-message'
    messageElement.innerHTML = `<div class="pixel-message-text">${message}</div>`
    messagesContainer.appendChild(messageElement)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
  
  function addAvatarMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.className = 'pixel-message avatar-message'
    
    // Add typing indicator
    const typingIndicator = document.createElement('div')
    typingIndicator.className = 'pixel-typing-indicator'
    typingIndicator.innerHTML = '<div class="pixel-dot"></div><div class="pixel-dot"></div><div class="pixel-dot"></div>'
    messageElement.appendChild(typingIndicator)
    messagesContainer.appendChild(messageElement)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
    
    // Simulate typing
    setTimeout(() => {
      messageElement.innerHTML = ''
      const messageText = document.createElement('div')
      messageText.className = 'pixel-message-text'
      messageElement.appendChild(messageText)
      
      let i = 0
      const typeInterval = setInterval(() => {
        if (i < message.length) {
          messageText.textContent += message.charAt(i)
          messagesContainer.scrollTop = messagesContainer.scrollHeight
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 30)
    }, 1000)
  }
  
  function processMessage(message) {
    message = message.toLowerCase()
    
    // Simple keyword-based responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      const greeting = visitorName ? `Hello ${visitorName}!` : 'Hello there!'
      addAvatarMessage(`${greeting} How can I help you today?`)
    }
    else if (message.includes('name')) {
      addAvatarMessage("I'm an AI assistant representing the portfolio owner. I can answer questions about their skills and work.")
    }
    else if (message.includes('tech') || message.includes('stack') || message.includes('technologies')) {
      addAvatarMessage("I specialize in HTML, CSS (including SCSS/SASS), JavaScript, REST APIs, Express, Node.js, and SQLite. I'm currently expanding my skills with React and Tailwind CSS. I also have interests in AI technologies.")
    }
    else if (message.includes('project')) {
      addAvatarMessage("I've worked on several projects including an E-commerce platform using Node.js, Express and SQLite, an interactive dashboard with REST APIs, and API integration services. Each project showcases different aspects of my full-stack capabilities.")
    }
    else if (message.includes('experience')) {
      addAvatarMessage("I'm a front-end developer with back-end capabilities, allowing me to build full-stack applications. I focus on creating responsive, performant web experiences with clean code and intuitive user interfaces.")
    }
    else if (message.includes('approach') || message.includes('process')) {
      addAvatarMessage("My development approach focuses on three principles: user-centric design, technical excellence, and continuous learning. I believe in writing clean, maintainable code that delivers exceptional user experiences.")
    }
    else if (message.includes('contact') || message.includes('hire') || message.includes('work')) {
      addAvatarMessage("You can reach out through the contact section at the bottom of this portfolio. I'm open to discussing new opportunities and would love to hear about your project.")
    }
    else if (message.includes('ai') || message.includes('artificial intelligence')) {
      addAvatarMessage("I'm currently exploring AI technologies and plan to integrate more advanced features into my work. This conversational interface is just the beginning of my journey into AI.")
    }
    else {
      addAvatarMessage("That's an interesting question! While I have knowledge about the portfolio owner's skills and projects, I might not have all the details. Feel free to ask something more specific about their technologies, projects, or development approach.")
    }
  }
  
  // Make the chat interface draggable
  makeDraggable(avatarSection.querySelector('.pixel-popup-header'), avatarSection.querySelector('.pixel-avatar-popup'))
}

// Draggable functionality
function makeDraggable(handle, dragElement) {
  let posX = 0, posY = 0, posLeft = 0, posTop = 0
  
  handle.addEventListener('mousedown', startDrag)
  
  function startDrag(e) {
    e.preventDefault()
    posX = e.clientX
    posY = e.clientY
    posLeft = dragElement.offsetLeft
    posTop = dragElement.offsetTop
    
    document.addEventListener('mousemove', dragMove)
    document.addEventListener('mouseup', stopDrag)
  }
  
  function dragMove(e) {
    e.preventDefault()
    const newX = posLeft + e.clientX - posX
    const newY = posTop + e.clientY - posY
    
    dragElement.style.left = newX + 'px'
    dragElement.style.top = newY + 'px'
    dragElement.style.bottom = 'auto'
    dragElement.style.right = 'auto'
  }
  
  function stopDrag() {
    document.removeEventListener('mousemove', dragMove)
    document.removeEventListener('mouseup', stopDrag)
  }
}

// Show assistant on load after a delay
export function setupAvatarTrigger() {
  setTimeout(() => {
    const avatarSection = document.getElementById('pixel-avatar-section')
    if (avatarSection) {
      avatarSection.style.display = 'block'
    }
  }, 2000) // Show after 2 seconds
}

// Initialize both functions
export function initPixelAvatar() {
  renderPixelAvatar()
  setupAvatarTrigger()
}
```

### 2. Add Floating Button HTML

Add the floating button to your main HTML layout:

```javascript
// In main.js where your HTML is generated
document.querySelector('#app').innerHTML = `
  <!-- Other HTML content -->
  
  <!-- Floating AI Assistant Button -->
  <button id="floating-ai-btn" class="floating-ai-assistant-btn">
    <span class="ai-icon">💬</span>
  </button>
  
  <!-- Rest of your HTML content -->
`
```

### 3. Add a Button in the Footer (optional)

Add an additional button in your footer for users who prefer to access the assistant there:

```javascript
// In Footer.js
export function renderFooter() {
  const footer = document.getElementById('footer')
  
  footer.innerHTML = `
    <footer class="site-footer">
      <!-- Other footer content -->
      
      <div id="contact" class="footer-section">
        <p class="footer-note">Built with <span class="heart">♥</span> and JavaScript</p>
        <p class="footer-note">Press ESC for a surprise</p>
        <p class="footer-note">
          <button id="open-ai-assistant" class="ai-assistant-btn">Chat with AI Assistant</button>
        </p>
      </div>
      
      <!-- Other footer content -->
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
```

### 4. Create Styles for the Chat Interface

Create a dedicated SCSS file for the chat interface styles:

```scss
// src/styles/pixel-avatar.scss

// Chat container
.pixel-avatar-popup {
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 9999;
  width: 350px;
  height: 500px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  
  .dark-mode & {
    background-color: #262626;
    color: #f1f1f1;
  }
}

.pixel-popup-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

// Header
.pixel-popup-header {
  background: linear-gradient(45deg, #0df, #f0f);
  color: white;
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
}

.pixel-popup-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.pixel-popup-close {
  cursor: pointer;
  font-size: 1.2rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

// Messages area
.pixel-popup-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.pixel-message {
  max-width: 80%;
  margin-bottom: 8px;
  
  &.avatar-message {
    align-self: flex-start;
    
    .pixel-message-text {
      background-color: #f1f1f1;
      border-radius: 18px 18px 18px 5px;
      
      .dark-mode & {
        background-color: #3a3a3a;
      }
    }
  }
  
  &.user-message {
    align-self: flex-end;
    
    .pixel-message-text {
      background: linear-gradient(45deg, #0df, #f0f);
      color: white;
      border-radius: 18px 18px 5px 18px;
    }
  }
}

.pixel-message-text {
  padding: 12px 15px;
  line-height: 1.4;
  font-size: 0.95rem;
}

// Typing indicator
.pixel-typing-indicator {
  display: flex;
  padding: 12px 15px;
  background-color: #f1f1f1;
  border-radius: 18px 18px 18px 5px;
  width: fit-content;
  
  .dark-mode & {
    background-color: #3a3a3a;
  }
  
  .pixel-dot {
    width: 8px;
    height: 8px;
    margin: 0 3px;
    background-color: #aaa;
    border-radius: 50%;
    animation: dot-pulse 1.5s infinite;
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes dot-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.5); }
}

// Input area
.pixel-name-container,
.pixel-input-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #e5e5e5;
  
  .dark-mode & {
    border-top-color: #444;
  }
}

.pixel-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  font-size: 0.95rem;
  
  .dark-mode & {
    background-color: #222;
    color: white;
    border-color: #444;
  }
  
  &:focus {
    outline: none;
    border-color: #0df;
  }
}

.pixel-button {
  background: linear-gradient(45deg, #0df, #f0f);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0 20px;
  margin-left: 8px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    opacity: 0.9;
  }
}

// Quick questions
.pixel-quick-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  border-top: 1px solid #e5e5e5;
  
  .dark-mode & {
    border-top-color: #444;
  }
}

.pixel-quick-btn {
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
  padding: 5px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  
  .dark-mode & {
    background-color: #333;
    border-color: #444;
    color: white;
  }
  
  &:hover {
    background: linear-gradient(45deg, #0df, #f0f);
    color: white;
    border-color: transparent;
  }
}
```

### 5. Add Styles for the Buttons in Main SCSS

Add these styles to your main.scss file:

```scss
// In main.scss

// Regular AI Assistant button in footer
.ai-assistant-btn {
  background: linear-gradient(45deg, $primary-color, $secondary-color);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-top: 10px;
  font-family: $font-main;
  font-size: 1rem;
  display: inline-block;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

// Floating AI Assistant button
.floating-ai-assistant-btn {
  position: fixed;
  bottom: 30px;
  left: 30px;
  background: linear-gradient(45deg, $primary-color, $secondary-color);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  z-index: 1000;
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
  
  .ai-icon {
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
```

### 6. Initialize and Add Event Listeners

In your main.js file, add the event listener for the floating button:

```javascript
// In main.js

// Import the initPixelAvatar function
import { initPixelAvatar } from './components/pixel-avatar'

// Initialize all components
// ... other component initializations
initPixelAvatar() // Initialize AI assistant
// ... other component initializations

// Add floating AI button functionality
document.getElementById('floating-ai-btn').addEventListener('click', () => {
  const avatarSection = document.getElementById('pixel-avatar-section')
  if (avatarSection) {
    avatarSection.style.display = 'block'
  }
})
```

## Customization Options

### Changing the Assistant's Responses

To customize the responses, modify the `processMessage` function in pixel-avatar.js:

```javascript
function processMessage(message) {
  message = message.toLowerCase()
  
  // Add or modify keyword-based responses
  if (message.includes('your-keyword')) {
    addAvatarMessage("Your custom response here")
  }
  // Add more conditions for different keywords
  // ...
  else {
    // Default response for unrecognized queries
    addAvatarMessage("Your default response")
  }
}
```

### Styling Customization

1. **Colors**: Change the gradient colors in the CSS by modifying the `background: linear-gradient(45deg, #0df, #f0f)` values
2. **Size**: Adjust the width and height of `.pixel-avatar-popup`
3. **Position**: Change the bottom/right values of `.pixel-avatar-popup` and `.floating-ai-assistant-btn`
4. **Animation**: Modify the typing speed by changing the interval in the `addAvatarMessage` function

## Advanced Features (Future Enhancements)

1. **Persistent Chat History**: Store chat history in localStorage
2. **More Complex Responses**: Implement a more sophisticated response system using regular expressions
3. **Actual API Integration**: Connect to a real AI API like OpenAI for dynamic responses
4. **Multimedia Responses**: Add images, links, or code snippets in responses
5. **Analytics**: Track popular questions to improve your portfolio content

## Troubleshooting

### Common Issues:

1. **Button not visible**: Check z-index values and make sure the button is properly styled
2. **Chat doesn't appear**: Verify that the event listeners are attached correctly
3. **Styling issues in dark mode**: Make sure dark mode styles are properly defined
4. **Chat history reset**: Implement localStorage to persist chat history between sessions

## Conclusion

This AI assistant feature adds an interactive and engaging element to your portfolio, allowing visitors to learn about your skills and projects in a conversational format. The implementation is lightweight, doesn't require any external APIs, and can be easily customized to match your portfolio's style and content.