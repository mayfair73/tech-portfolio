export function initCollapsibleSections() {
  const aboutContent = document.querySelector('.about__content');
  if (!aboutContent) return;

  const excludedHeaders = [
    '# Professional Bio: Front-End Developer',
    '## Summary',
    '## Core Technical Skills'
  ];

  const paragraphs = aboutContent.querySelectorAll('p');
  let currentHeader = null;
  let contentElements = [];

  paragraphs.forEach((paragraph) => {
    const text = paragraph.textContent.trim();

    if (text.startsWith('#')) {
      // Før vi går videre, gem tidligere collapsible, hvis der er noget
      if (currentHeader && contentElements.length > 0) {
        makeCollapsible(currentHeader, contentElements);
      }

      // Er overskriften udelukket?
      if (excludedHeaders.includes(text)) {
        currentHeader = null;
        contentElements = [];
        return; // spring videre – ingen styling, caret eller collapsible
      }

      // Ellers: start nyt collapsible setup
      currentHeader = paragraph;
      contentElements = [];

      // Tilføj klik-styling og caret
      paragraph.classList.add('collapsible-header');

      const caretSpan = document.createElement('span');
      caretSpan.classList.add('caret');
      caretSpan.innerHTML = ' ▼';
      paragraph.appendChild(caretSpan);
    } else if (currentHeader) {
      contentElements.push(paragraph);
    }
  });

  if (currentHeader && contentElements.length > 0) {
    makeCollapsible(currentHeader, contentElements);
  }
}

function makeCollapsible(header, contentElements) {
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('collapsible-content');

  contentElements.forEach(element => {
    const clone = element.cloneNode(true);
    contentContainer.appendChild(clone);
    element.style.display = 'none';
  });

  header.insertAdjacentElement('afterend', contentContainer);

  header.addEventListener('click', () => {
    header.classList.toggle('active');
    const caret = header.querySelector('.caret');

    if (contentContainer.style.maxHeight) {
      contentContainer.style.maxHeight = null;
      caret.innerHTML = ' ▼';
    } else {
      contentContainer.style.maxHeight = contentContainer.scrollHeight + "px";
      caret.innerHTML = ' ▲';
    }
  });
}