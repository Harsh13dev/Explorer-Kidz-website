// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function () {
  // Select all gallery items
  const galleryItems = document.getElementsByClassName('gallery-item');

  // Create elements for lightbox
  const lightBoxContainer = document.createElement('div');
  const lightBoxContent = document.createElement('div');
  const lightBoxImg = document.createElement('img');
  const lightBoxPrev = document.createElement('div');
  const lightBoxNext = document.createElement('div');

  // Add classes and styles for lightbox
  lightBoxContainer.classList.add('lightbox');
  lightBoxContent.classList.add('lightbox-content');
  lightBoxPrev.classList.add('lightbox-prev');
  lightBoxNext.classList.add('lightbox-next');

  lightBoxContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  `;

  lightBoxContent.style.cssText = `
    position: relative;
    max-width: 90%;
    max-height: 90%;
  `;

  lightBoxImg.style.cssText = `
    width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
  `;

  lightBoxPrev.style.cssText = `
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: white;
    font-size: 2rem;
    cursor: pointer;
    user-select: none;
  `;

  lightBoxNext.style.cssText = `
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: white;
    font-size: 2rem;
    cursor: pointer;
    user-select: none;
  `;

  lightBoxPrev.innerHTML = '&#10094;';
  lightBoxNext.innerHTML = '&#10095;';

  // Append elements to lightbox
  lightBoxContent.appendChild(lightBoxImg);
  lightBoxContent.appendChild(lightBoxPrev);
  lightBoxContent.appendChild(lightBoxNext);
  lightBoxContainer.appendChild(lightBoxContent);
  document.body.appendChild(lightBoxContainer);

  let currentIndex = 0;

  // Function to show lightbox
  function showLightBox(index) {
    currentIndex = index;
    const imgSrc = galleryItems[currentIndex].querySelector('img').src;
    lightBoxImg.src = imgSrc;
    lightBoxContainer.style.display = 'flex';
  }

  // Function to navigate to the previous image
  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightBoxImg.src = galleryItems[currentIndex].querySelector('img').src;
  }

  // Function to navigate to the next image
  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightBoxImg.src = galleryItems[currentIndex].querySelector('img').src;
  }

  // Add click event to each gallery item
  Array.from(galleryItems).forEach((item, index) => {
    item.addEventListener('click', () => showLightBox(index));
  });

  // Add click events for navigation
  lightBoxPrev.addEventListener('click', showPrev);
  lightBoxNext.addEventListener('click', showNext);

  // Close lightbox when clicking outside the image
  lightBoxContainer.addEventListener('click', (e) => {
    if (e.target === lightBoxContainer) {
      lightBoxContainer.style.display = 'none';
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightBoxContainer.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') lightBoxContainer.style.display = 'none';
    }
  });
});