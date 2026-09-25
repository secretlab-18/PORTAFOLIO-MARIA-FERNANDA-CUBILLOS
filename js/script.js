const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});

const items = [...document.querySelectorAll(".gallery-item")];
const box = document.querySelector(".lightbox");
const image = box.querySelector("img");
const caption = box.querySelector("p");
let current = 0;

function show(index) {
    current = (index + items.length) % items.length;

    const item = items[current];
    const itemImage = item.querySelector("img");
    const itemCaption = item.querySelector("span");

    image.src = itemImage.src;
    image.alt = itemImage.alt;
    caption.textContent = itemCaption.textContent;

    box.classList.add("open");
    box.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
    box.classList.remove("open");
    box.setAttribute("aria-hidden", "true");
}

items.forEach((item, index) => {
    item.addEventListener("click", () => show(index));
});

box.querySelector(".close").addEventListener("click", closeLightbox);
box.querySelector(".prev").addEventListener("click", () => show(current - 1));
box.querySelector(".next").addEventListener("click", () => show(current + 1));

box.addEventListener("click", (event) => {
    if (event.target === box) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (!box.classList.contains("open")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        show(current - 1);
    }

    if (event.key === "ArrowRight") {
        show(current + 1);
    }
});
