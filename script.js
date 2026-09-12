const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const filterButtons = document.querySelectorAll(".filter-btn");

let currentIndex = 0;



function getVisibleItems() {
    return Array.from(galleryItems).filter(item => {
        return item.style.display !== "none";
    });
}



galleryItems.forEach((item) => {

    item.addEventListener("click", function () {

        const visibleItems = getVisibleItems();

        currentIndex = visibleItems.indexOf(item);

        const image = item.querySelector("img");

        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;

        lightbox.style.display = "flex";

    });

});



nextBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    const visibleItems = getVisibleItems();

    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

});



prevBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    const visibleItems = getVisibleItems();

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

});


closeBtn.addEventListener("click", function () {

    lightbox.style.display = "none";

});



lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

});



filterButtons.forEach((button) => {

    button.addEventListener("click", function () {

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        galleryItems.forEach((item) => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});



document.addEventListener("keydown", function (event) {

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            nextBtn.click();
        }

        if (event.key === "ArrowLeft") {
            prevBtn.click();
        }

        if (event.key === "Escape") {
            closeBtn.click();
        }

    }

});