const menuBtns = document.querySelectorAll(".menu-icon");
const overlay = document.querySelector(".overlay-menu");
const wrapper = document.querySelector(".wrapper");

const cart = document.querySelector(".cart");
const cartContainer = document.querySelector(".cart__container");
const btnCart = document.querySelector(".icon-cart");
const btnDeleteProduct = document.querySelector(".icon-delete");
const emptyMessEl = document.querySelector(".cart__empty");
const basketCounter = document.querySelector(".amount-circle");

const heroImg = document.querySelector(".gallery__hero--img");
const thumbnails = document.querySelectorAll(".thumbnail-img");
const btnPrevious = document.querySelector(".gallery__btn--left");
const btnNext = document.querySelector(".gallery__btn--right");

const btnMinus = document.querySelector(".quantity-btn--minus");
const btnPlus = document.querySelector(".quantity-btn--plus");
const productCounter = document.querySelector(".quantity-value");
const btnAddToCard = document.querySelector(".btn_add__cart");

const gallery = document.querySelectorAll(".thumbnail-img");
const infoGallery = document.querySelector(".gallery");
const overlayGallery = document.querySelector(".overlay-gallery");

const productName = "Fall Limited Edition Sneakers";
let productCounterValue = 1;
let productsInCart = 0;
let price = 250;
let discount = 0.5;
let thumbnailIndex;

const onMenuBtnsClick = function () {
	wrapper.classList.toggle("nav-open");
	cart.classList.add("display-none");
};
const onCartBtnClick = function () {
	cart.classList.toggle("display-none");
};

const setProductCounter = function (value) {
	if (productCounterValue + value > 0) {
		productCounterValue += value;
		productCounter.innerHTML = productCounterValue;
	}
};

const productCounterMinus = function () {
	setProductCounter(-1);
};

const productCounterPlus = function () {
	setProductCounter(1);
};

const getCurImgSrc = function (event) {
	const src = event.target
		.closest(".gallery__hero--item")
		.querySelector(".gallery__hero--img")
		.getAttribute("src");
	return src;
};

const updateThumbnail = function (event, index) {
	const thumbnails = event.target
		.closest(".gallery")
		.querySelectorAll(".thumbnail-img");

	thumbnails.forEach((thumbnail) => {
		thumbnail.classList.remove("gallery__overlay");
	});

	thumbnails.forEach((thumbnail) => {
		if (thumbnail.dataset.img == index) {
			thumbnail.classList.add("gallery__overlay");
		}
	});
};

const onRightArrowClick = function (event) {
	const src = getCurImgSrc(event);
	const index = src.replace(".jpg", "").slice(-1);
	thumbnailIndex = +index + 1;
	if (thumbnailIndex > 4) thumbnailIndex = 1;

	event.target
		.closest(".gallery")
		.querySelector(".gallery__hero--img")
		.setAttribute("src", `${src.replace(index, thumbnailIndex)}`);

	updateThumbnail(event, thumbnailIndex);
};

const onLeftArrowClick = function (event) {
	const src = getCurImgSrc(event);
	const index = src.replace(".jpg", "").slice(-1);
	thumbnailIndex = +index - 1;
	if (thumbnailIndex < 1) thumbnailIndex = 4;

	event.target
		.closest(".gallery")
		.querySelector(".gallery__hero--img")
		.setAttribute("src", `${src.replace(index, thumbnailIndex)}`);

	updateThumbnail(event, thumbnailIndex);
};

const onThumbClick = function (event) {
	const thumbnails = event.target
		.closest(".thumbnails")
		.querySelectorAll("img");

	thumbnails.forEach((thumbnail) => {
		thumbnail.classList.remove("gallery__overlay");
	});
	event.target.classList.add("gallery__overlay");

	const heroSrc = event.target.getAttribute("src").replace("-thumbnail", "");
	event.target
		.closest(".gallery")
		.querySelector(".gallery__hero--img")
		.setAttribute("src", heroSrc);
};

const onHeroImgClick = function () {
	if (overlayGallery.childElementCount == 0 && window.innerWidth > 568) {
		const cloneNode = infoGallery.cloneNode(true);
		overlayGallery.insertAdjacentElement("afterbegin", cloneNode);
		overlayGallery.classList.remove("display-none");
		overlayGallery
			.querySelectorAll(".thumbnail-img")
			.forEach((img) => img.addEventListener("click", onThumbClick));

		overlayGallery.querySelectorAll(".gallery__btn").forEach((btn) => {
			btn.style.display = "block";
		});
		overlayGallery
			.querySelector(".gallery__btn--left")
			.addEventListener("click", onLeftArrowClick);

		overlayGallery
			.querySelector(".gallery__btn--right")
			.addEventListener("click", onRightArrowClick);

		overlayGallery.firstElementChild.insertAdjacentHTML(
			"afterbegin",
			`<button class="btn--close">
        <img src="images/icon-close.svg" alt="icon-close" />
    </button>`
		);
		const closeBtn = overlayGallery.querySelector(".btn--close");
		closeBtn.addEventListener("click", function () {
			overlayGallery.firstElementChild.remove();
			overlayGallery.classList.add("display-none");
		});
	}
};

const addToCart = function () {
	productsInCart += productCounterValue;
	resetCounter();
	renderBasketCounter();
	renderProduct();
};

const resetCounter = function () {
	productCounterValue = 1;
	productCounter.innerHTML = 1;
};

const renderProduct = function () {
	const markup = `<img
    src="images/image-product-1.jpg"
    alt="cart img"
/>
<div class="cart__text">
    <p class="product-name">
        ${productName}
    </p>
    <p>
        <span class="product-price">$${(price * discount).toFixed(2)}</span> x
        <span class="product-amount">${productsInCart}</span
        ><span class="price-summary">$${(
					price *
					discount *
					productsInCart
				).toFixed(2)}</span>
        <img
            src="images/icon-delete.svg"
            alt="icon-del"
            class="icon-delete"
        />
    </p>
</div>
<button class="btn btn__add btn--checkout">
    Checkout
</button>`;
	if (cartContainer.childElementCount == 1 && productsInCart !== 0) {
		emptyMessEl.style.display = "none";
		cartContainer.insertAdjacentHTML("afterbegin", markup);
	}

	const newDOM = document.createRange().createContextualFragment(markup);

	const newElements = Array.from(newDOM.querySelectorAll("*"));
	const curElements = Array.from(cartContainer.querySelectorAll("*"));

	if (productsInCart !== 0) {
		newElements.forEach((newEl, i) => {
			const curEl = curElements[i];
			if (
				!curEl.isEqualNode(newEl) &&
				newEl.firstChild.nodeValue.trim() !== ""
			) {
				curEl.textContent = newEl.textContent;
			}
		});
	}
};

const renderBasketCounter = function () {
	if (productsInCart > 0) {
		basketCounter.textContent = productsInCart;
		basketCounter.classList.remove("display-none");
	} else {
		basketCounter.classList.add("display-none");
	}
};

const deleteProduct = function () {
	if (productsInCart > 1) {
		productsInCart--;
	} else {
		productsInCart = 0;

		emptyMessEl.style.display = "block";
		Array.from(cartContainer.querySelectorAll("*")).forEach((node) => {
			if (!node.classList.contains("cart__empty")) node.remove();
		});
	}
	renderProduct();
	renderBasketCounter();
};

menuBtns.forEach((btn) => btn.addEventListener("click", onMenuBtnsClick));
btnCart.addEventListener("click", onCartBtnClick);

btnMinus.addEventListener("click", productCounterMinus);
btnPlus.addEventListener("click", productCounterPlus);

gallery.forEach((thumbnail) =>
	thumbnail.addEventListener("click", onThumbClick)
);

heroImg.addEventListener("click", onHeroImgClick);

btnNext.addEventListener("click", onRightArrowClick);
btnPrevious.addEventListener("click", onLeftArrowClick);

btnAddToCard.addEventListener("click", addToCart);
document.addEventListener("click", function (e) {
	if (e.target.classList.contains("icon-delete")) deleteProduct();
});
