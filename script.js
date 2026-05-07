const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const carousel = document.querySelector("[data-carousel]");
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".testimonial"));
  const prev = document.querySelector("[data-carousel-prev]");
  const next = document.querySelector("[data-carousel-next]");
  let activeIndex = 0;

  const showSlide = (index) => {
    slides[activeIndex].classList.remove("active");
    activeIndex = (index + slides.length) % slides.length;
    slides[activeIndex].classList.add("active");
  };

  prev?.addEventListener("click", () => showSlide(activeIndex - 1));
  next?.addEventListener("click", () => showSlide(activeIndex + 1));
}

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !isVisible);
    });
  });
});
