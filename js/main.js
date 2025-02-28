// Scroll effect for navbar
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Slideshow functionality
let slides = document.querySelectorAll(".slide");
let currentIndex = 0;
let slideInterval;

// Function to animate text elements inside a slide
function animateText(slide) {
    let title = slide.querySelector(".home-text h2");
    let subtitle = slide.querySelector(".home-text h5");
    let description = slide.querySelector(".home-text p");

    if (title) gsap.fromTo(title, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 0.3 });
    if (subtitle) gsap.fromTo(subtitle, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.8 });

    if (description) {
        gsap.fromTo(description, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out", delay: 1.2 });

        // Typing effect with span elements
        let chars = [...description.innerText]; // Convert text to array of characters
        description.innerHTML = ""; // Clear text before inserting spans

        chars.forEach((char, i) => {
            let span = document.createElement("span");
            span.innerText = char;
            span.style.opacity = "0";
            description.appendChild(span);

            gsap.to(span, { opacity: 1, duration: 0.05, delay: 1.2 + i * 0.05, ease: "power2.out" });
        });
    }
}

// Function to change slides
function changeSlide(next = true) {
    slides[currentIndex].classList.remove("active");

    // Update index safely within range
    currentIndex = next ? (currentIndex + 1) % slides.length : (currentIndex - 1 + slides.length) % slides.length;

    slides[currentIndex].classList.add("active");

    // Removed Ken Burns effect (no zoom animation)
    // gsap.fromTo(slides[currentIndex], { scale: 1.1 }, { scale: 1, duration: 6, ease: "power1.inOut" });

    // Animate text inside the new slide
    animateText(slides[currentIndex]);

    resetSlideInterval();
}

// Event listeners for navigation arrows
document.getElementById("next").addEventListener("click", () => changeSlide(true));
document.getElementById("prev").addEventListener("click", () => changeSlide(false));

// Auto-slide every 6 seconds with reset on manual change
function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => changeSlide(true), 8000);
}

// Initial setup on page load
document.addEventListener("DOMContentLoaded", function () {
    animateText(slides[0]); // Animate the first slide
    resetSlideInterval(); // Start auto-sliding
});
