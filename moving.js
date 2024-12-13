const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.image-category');

// Clone the image categories to create a seamless loop
images.forEach((image) => {
  const clone = image.cloneNode(true);
  carousel.appendChild(clone);
});
