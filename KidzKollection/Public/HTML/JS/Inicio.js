const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev-button');
const nextButton = document.querySelector('.carousel-next-button');
let currentIndex = 0;

function showItem(index) {
    carouselItems.forEach(item => item.classList.remove('active'));
    carouselItems[index].classList.add('active');
}

function prevItem() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showItem(currentIndex);
}

function nextItem() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showItem(currentIndex);
}

prevButton.addEventListener('click', prevItem);
nextButton.addEventListener('click', nextItem);

// Automatically switch to the next item every 5 seconds
setInterval(nextItem, 5000);

// Show the initial item
showItem(currentIndex);