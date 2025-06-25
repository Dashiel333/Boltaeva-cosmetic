document.addEventListener("DOMContentLoaded", function () {
    const sliderBlock = document.querySelector("#carouselExampleIndicators");

    if (sliderBlock) {
        new bootstrap.Carousel(sliderBlock, {
            interval: 3000, // Автопрокрутка каждые 3 сек (можно убрать)
            wrap: true // Бесконечная прокрутка
        });
    }

});

if (document.querySelector(".bourger")) {
    document.querySelector(".bourger").addEventListener("click", function () {
        document.getElementById("menu").classList.add("active");
        console.log("active");
    });

    document.getElementById("close").addEventListener("click", function () {
        document.getElementById("menu").classList.remove("active");
    });
}



// Modal window
const searchContainer = document.querySelector(".search-container");
const openBtn = document.querySelector(".burger-close");
const closeMenu = document.querySelector(".dark-color");
const closeBtn = document.querySelector(".search-container .close")

if (openBtn) {
    openBtn.addEventListener("click", function () {
        searchContainer.classList.toggle('active');
    });

    closeMenu.addEventListener("click", function () {
        searchContainer.classList.remove('active');
        closeMenu.classList.remove('active');
    })
    closeBtn.addEventListener("click", function () {
        searchContainer.classList.remove('active');
        closeMenu.classList.remove('active');
    })
}



// Modal window


// Dark and light theme
const toggleBtn = document.querySelector("#theme-toggle");

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.classList.remove('light');
    toggleBtn.classList.add('dark');
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');

        const isDark = document.body.classList.contains('dark');
        toggleBtn.classList.toggle('light');
        toggleBtn.classList.toggle('dark');

        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    console.log(toggleBtn);
}


// Dark and light theme

// counter(счётчик)
const priceCalc = document.querySelectorAll('[data-priceCalc]');

if (priceCalc.length > 0) {
    priceCalc.forEach(counter => {
        counter.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('.counter-button')) {
                const wrapper = target.closest('.price-calc');
                if (!wrapper) return;

                let btnValue = wrapper.querySelector('.input');
                let value = parseInt(btnValue.textContent);

                if (target.classList.contains('btn-minus')) {
                    if (value > 0) value--;
                } else if (target.classList.contains('btn-plus')) {
                    value++;
                }

                btnValue.textContent = value;
            }
        });
    });
}


// counter(счётчик)



// Swiperjs
if (document.querySelector(".mySwiper")) {
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        direction: 'vertical',
        spaceBetween: 4,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,

        mousewheel: {
            forceToAxis: true,
            sensitivity: 1,
        },
    });
}
if (document.querySelector(".mySwiper2")) {

    var swiper2 = new Swiper(".mySwiper2", {
        loop: true,
        // direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            hide: false,
        },
        breakpoints: {
            1200: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            540: {
                slidesPerView: 2,
            }
        }
    });
}

// Swiperjs

// // Slider line
// var swiper = new Swiper(".mySwiper3", {
//     direction: 'horizontal',

//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
// });


// Slider line
if (document.querySelector(".gallery-thumbs")) {
    var galleryThumbs = new Swiper(".gallery-thumbs", {
        // centeredSlides: true,
        // centeredSlidesBounds: true,
        slidesPerView: 4,
        // watchOverflow: true,
        watchSlidesVisibility: true,
        // watchSlidesProgress: true,
        direction: 'horizontal',
        breakpoints: {
            992: {
                direction: "vertical",
            }
        }
    });

    var galleryMain = new Swiper(".gallery-main", {
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        thumbs: {
            swiper: galleryThumbs
        }
    });
}



// Выпадающее меню на странице Order

const chooseButtons = document.querySelectorAll(".choose-btn");

chooseButtons.forEach(button => {
    const dropdownMenu = button.nextElementSibling; // локальное меню
    const options = dropdownMenu.querySelectorAll(".option");

    button.addEventListener("click", (e) => {
        e.stopPropagation(); // чтобы клик не дошёл до document
        // Закрываем все открытые меню
        document.querySelectorAll(".choose-menu").forEach(menu => {
            if (menu !== dropdownMenu) {
                menu.classList.add("hidden");
            }
        });
        // Переключаем текущее меню
        dropdownMenu.classList.toggle("hidden");
    });
    options.forEach(option => {
        option.addEventListener("click", () => {
            button.textContent = option.textContent;
            dropdownMenu.classList.add("hidden");
        });
    });
});
// Скрытие всех меню по клику вне кнопок/меню
document.addEventListener("click", () => {
    document.querySelectorAll(".choose-menu").forEach(menu => {
        menu.classList.add("hidden");
    });
});


// Выпадающее меню на странице Order





// Слайдер на странице Order

if (document.querySelector(".ord-swiper")) {
    const ordSwiper = new Swiper(".ord-swiper", {
        slidesPerView: 3,
        grid: {
            rows: 2,
            fill: "row"
        },
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
}

// Слайдер на странице Order

// Админка

// например: "Пост сохранен"
async function getProducts() {
    const response = await fetch("/get-products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const result = await response.json();
    return result
}
// getProducts()

async function addProduct(data) {
    const response = await fetch("/add-product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: data.name,
            price: data.price,
            image: data.image,
            description: data.description
        })
    });

    const result = await response.json();
    alert('Tовар успешно добавлен. Ура!)');
}

if (document.body.classList.contains('page-index')) {
    getProducts().then(products => {
        console.log('products', products)
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img class="brows-logo" src="./images/${product.image}" alt="${product.name}">
                <div class="brows-text">
                    <p>${product.name}</p>
                    <p> <strong>${product.price} €</strong></p>
                </div>
            `;
            document.querySelector('.js-products').appendChild(productCard);
        })
    });
}

const productFrom = document.querySelector('.js-product-form');

if (productFrom) {
    productFrom.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(productFrom);
        const data = Object.fromEntries(formData.entries());

        console.log('data', data)
        addProduct(data)
    });
}

// addProduct()

