const photos = [
    "IMG_7439.JPG",
    "IMG_7440.JPG",
    "IMG_7441.JPG",
    "IMG_7442.JPG",
    "IMG_7446.JPG",
    "IMG_7449.JPG",
    "IMG_7457.JPG",
    "IMG_7459.JPG",
    "IMG_7460.JPG",
    "IMG_7461.JPG",
    "IMG_7464.JPG",
    "IMG_7467.JPG",
    "PXL_20261112_082551434.MP.jpg",
    "PXL_20261112_113959630.JPG",
    "PXL_20261112_114026826.MP.jpg",
    "PXL_20261112_115747335.jpg",
    "PXL_20261112_135005394.jpg"
];

const gallery = document.querySelector("#gallery");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const photoCount = document.querySelector("#photo-count");
let activeIndex = 0;
let activeTrigger;

photos.forEach((filename, index) => {
    const number = String(index + 1).padStart(2, "0");
    const title = `Moment ${number}`;
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.className = "gallery-item";
    button.type = "button";
    button.dataset.title = title;
    button.setAttribute("aria-label", `${title} vergrössern`);

    image.src = `bilder/${filename}`;
    image.alt = `Eindrücke vom Nationalen Zukunftstag, ${title.toLowerCase()}`;
    image.loading = "lazy";
    image.decoding = "async";

    button.append(image);
    button.addEventListener("click", () => openLightbox(index, button));
    gallery.append(button);
});

photoCount.textContent = String(photos.length);

function openLightbox(index, trigger) {
    activeIndex = index;
    activeTrigger = trigger;
    updateLightbox();
    lightbox.showModal();
}

function updateLightbox() {
    const number = String(activeIndex + 1).padStart(2, "0");
    lightboxImage.src = `bilder/${photos[activeIndex]}`;
    lightboxImage.alt = `Eindrücke vom Nationalen Zukunftstag, Moment ${number}`;
    lightboxTitle.textContent = `Moment ${number} von ${String(photos.length).padStart(2, "0")}`;
}

function changePhoto(direction) {
    activeIndex = (activeIndex + direction + photos.length) % photos.length;
    updateLightbox();
}

lightbox.querySelector("[data-close]").addEventListener("click", () => lightbox.close());
lightbox.querySelector("[data-prev]").addEventListener("click", () => changePhoto(-1));
lightbox.querySelector("[data-next]").addEventListener("click", () => changePhoto(1));

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.close();
    }
});

lightbox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        event.preventDefault();
        lightbox.close();
    } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        changePhoto(-1);
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        changePhoto(1);
    }
});

lightbox.addEventListener("close", () => activeTrigger?.focus());
