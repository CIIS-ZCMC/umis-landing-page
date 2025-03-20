let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

const images = [
    '../../assets/slideshow/hero.png',
    '../../assets/slideshow/hero-bg.png',
    '../../assets/slideshow/lp-bg.jpg',
    '../../assets/slideshow/hero-bg-1.png',
];

let currentIndex = 0;

function updateSlideshow() {
    const slideshowImg = document.querySelector('.slideshow-img');
    const slideshowBg = document.querySelector('.slideshow-container');

    // Update the img source
    slideshowImg.src = images[currentIndex];

    // Update the background image
    slideshowBg.style.backgroundImage = `url('${images[currentIndex]}')`;
}

// Call this function to start the slideshow (for example, every few seconds)
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlideshow();
}, 5000); // Change image every 3 seconds

function showSlides(n) {
    let slides = document.getElementsByClassName("slideshow-img");
    let dots = document.getElementsByClassName("slider-dot");

    if (slides.length === 0 || dots.length === 0) return; // Exit if no slides or dots

    // Update slideIndex based on input n
    slideIndex += n;

    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = slides.length; }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove "active" class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide and set the active dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Initial call to show the first slide
showSlides(0); // Start with the first slide