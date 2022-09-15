const menuBtns = document.querySelectorAll(".menu-icon");
const overlay = document.querySelector(".overlay-menu");
const wrapper = document.querySelector(".wrapper");
const overlayMenu = document.querySelector(".overlay-menu");

const cart = document.querySelector(".cart");
const cartContainer = document.querySelector(".cart__container");
const btnCart = document.querySelector(".icon-cart");
const btnDeleteProduct = document.querySelector(".icon-delete");
const emptyMessEl = document.querySelector(".cart__empty");

const productPrice = document.querySelector(".product-price");
const productAmount = document.querySelector(".product-amount");
const priceSum = document.querySelector(".price-summary");

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

const emptyCartMessage = "Your cart is empty";
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

const deleteProduct = function () {
	if (productsInCart > 1) {
		productsInCart--;
		console.log(productsInCart);
	} else {
		productsInCart = 0;
		console.log(productsInCart);

		emptyMessEl.style.display = "block";
		Array.from(cartContainer.querySelectorAll("*")).forEach((node) => {
			if (!node.classList.contains("cart__empty")) node.remove();
		});
	}
	renderProduct();
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

// const menu = document.querySelector('.menu');
// const btnHamburger = document.querySelector('.hamburger');
// const btnMenuClose = document.querySelector('#btnMenuClose');

// const cart = document.querySelector('.cart');
// const btnCart = document.querySelector('.btnCart');

// const btnPlus = document.querySelector('#btnPlus');
// const btnMinus = document.querySelector('#btnMinus');
// const productCounter = document.querySelector('.counter');

// const gallery = document.querySelectorAll('.pic');
// const heroImg = document.querySelector('.product-hero');

// const btnNext = document.querySelector('.next');
// const btnPrevious = document.querySelector('.previous');

// const btnAddToCard = document.querySelector('.btn');
// const cartCount = document.querySelector('.cart-count');
// const productInShoppingCart = document.querySelector('.products-in-cart');

// const msgEmpty = document.querySelector('.msg-empty');
// const checkout = document.querySelector('.checkout');

// const overlay = document.querySelector('.overlay');
// const lightbox = document.querySelector('.lightbox');

// let lightboxGallery;
// let lightboxHero;

// //Numerical Variables
// let productCounterValue = 1;
// let productsInCart = 0;
// let price = 250.0
// let discount = 0.5;

// btnHamburger.addEventListener('click', onHamburgerClick);
// btnMenuClose.addEventListener('click', onBtnMenuCloseClick);

// btnCart.addEventListener('click', openCart);

// btnPlus.addEventListener('click', productCounterPlus);
// btnMinus.addEventListener('click', productCounterMinus);

// gallery.forEach(img => {
//     img.addEventListener('click', onThumbClick);
// });

// btnNext.addEventListener('click', handleBtnClickNext);
// btnPrevious.addEventListener('click', handleBtnClickPrevious);

// btnAddToCard.addEventListener('click', addToCart);

// heroImg.addEventListener('click', onHeroImgClick);

// function onHamburgerClick() {
//     menu.classList.remove('hidden');
// }

// function onBtnMenuCloseClick() {
//     menu.classList.add('hidden');
// }

// function openCart() {
//     cart.classList.toggle('hidden');
// }

// function productCounterPlus() {
//     //console.log(productCounterValue);
//     setProductCounter(1);
// }

// function productCounterMinus() {
//     setProductCounter(-1);
// }

// function setProductCounter(value) {
//     if ((productCounterValue + value) > 0) {
//         productCounterValue += value;
//         productCounter.innerHTML = productCounterValue;
//     }
//     //console.log(value);
// }

// function onThumbClick(event) {
//     //clear active state for all thumbnails
//     gallery.forEach(img => {
//         img.classList.remove('active');
//     });
//     //set active thumbnail
//     event.target.parentElement.classList.add('active');
//     //update hero image
//     heroImg.src = event.target.src.replace('-thumbnail', '');
// }

// function handleBtnClickNext() {
//     let imageIndex = getCurrentImageIndex();
//     imageIndex++;
//     if (imageIndex > 4) {
//         imageIndex = 1;
//     }
//     setHeroImage(imageIndex);
// }

// function handleBtnClickPrevious() {
//     let imageIndex = getCurrentImageIndex();
//     imageIndex--;
//     if (imageIndex < 1) {
//         imageIndex = 4;
//     }
//     setHeroImage(imageIndex);
// }

// function getCurrentImageIndex() {
//     const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
//     return imageIndex;
// }

// function setHeroImage(imageIndex) {
//     heroImg.src = `./images/image-product-${imageIndex}.jpg`;
//     //images are not sync
//     gallery.forEach(img => {
//         img.classList.remove('active');
//     });
//     //set active thumbnail
//     gallery[imageIndex-1].classList.add('active');
// }

// function addToCart() {
//     productsInCart += productCounterValue;

//     const productHTMLElement = `
//     <div class="item">
//         <img class="product-img" src="./images/image-product-1-thumbnail.jpg" alt="product 1 thumb">
//         <div class="details">
//             <div class="product-name">Autumn Limited Edition...</div>
//             <div class="price-group">
//                 <div class="price">$${(price*discount).toFixed(2)}</div> x
//                 <div class="count">${productsInCart}</div>
//                 <div class="total-amount">$${(price*discount*productsInCart).toFixed(2)}</div>
//         </div>
//         </div>
//         <img id="btnDelete" src="./images/icon-delete.svg" alt="icon delete">
//     </div>
//     `;

//     productInShoppingCart.innerHTML = productHTMLElement;

//     updateCart();

//     const btnDelete = document.querySelector('#btnDelete');
//     btnDelete.addEventListener('click', onBtnDeleteClick);
//     //console.log(productsInCart);
// }

// function updateCart() {
//     updateCartIcon();
//     updateMsgEmpty();
//     updateCheckoutButton();
// }

// function updateCartIcon() {
//     cartCount.textContent = productsInCart;
//     if (productsInCart == 0) {
//         if (!cartCount.classList.contains('hidden')) {
//             cartCount.classList.add('hidden');
//         }
//     } else {
//         cartCount.classList.remove('hidden');
//     }
// }

// function updateMsgEmpty() {
//     if (productsInCart == 0) {
//         if (msgEmpty.classList.contains('hidden')) {
//             msgEmpty.classList.remove('hidden');
//         }
//     } else {
//         if (!msgEmpty.classList.contains('hidden')){
//             msgEmpty.classList.add('hidden');
//         }
//     }

// }

// function updateCheckoutButton() {
//     if (productsInCart == 0) {
//         if (!checkout.classList.contains('hidden')) {
//             checkout.classList.add('hidden');
//         }
//     } else {
//         checkout.classList.remove('hidden');
//     }
// }

// function onBtnDeleteClick() {
//     productsInCart--;
//     updateCart();

//     const el = document.querySelector('.count');
//     const totalAmount = document.querySelector('.total-amount');
//     el.innerHTML = productsInCart;
//     totalAmount.innerHTML = `$${(price*discount*productsInCart).toFixed(2)}`;

//     if (productsInCart == 0) {
//         productInShoppingCart.innerHTML = '';
//     }
// }

// function onHeroImgClick() {
//     if (window.innerWidth >= 1440) {
//         if (overlay.childElementCount == 1) {
//             const newNode = lightbox.cloneNode(true);
//             overlay.appendChild(newNode);

//             const btnOverlayClose = document.querySelector('#btnOverlayClose');
//             btnOverlayClose.addEventListener('click', onBtnOverlayClose);

//             lightboxGallery = overlay.querySelectorAll('.pic');
//             lightboxHero = overlay.querySelector('.product-hero');
//             lightboxGallery.forEach(img => {
//                 img.addEventListener('click', onThumbClickLightbox);
//             });

//             const btnOverlayNext = overlay.querySelector('.next');
//             const btnOverlayPrevious = overlay.querySelector('.previous');
//             btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay);
//             btnOverlayPrevious.addEventListener('click', handleBtnClickPreviousOverlay);
//         }
//         overlay.classList.remove('hidden');
//     }
// }

// function onBtnOverlayClose() {
//     overlay.classList.add('hidden');
// }

// function onThumbClickLightbox(event) {
//     //clear active state for all thumbnails
//     lightboxGallery.forEach(img => {
//         img.classList.remove('active');
//     });
//     //set active thumbnail
//     event.target.parentElement.classList.add('active');
//     //update hero image
//     lightboxHero.src = event.target.src.replace('-thumbnail', '');
// }

// function handleBtnClickNextOverlay() {
//     let imageIndex = getOverlayCurrentImageIndex();
//     imageIndex++;
//     if (imageIndex > 4) {
//         imageIndex = 1;
//     }
//     setOverlayHeroImage(imageIndex);
// }

// function handleBtnClickPreviousOverlay() {
//     let imageIndex = getOverlayCurrentImageIndex();
//     imageIndex--;
//     if (imageIndex < 1) {
//         imageIndex = 4;
//     }
//     setOverlayHeroImage(imageIndex);
// }

// function getOverlayCurrentImageIndex() {
//     const imageIndex = parseInt(lightboxHero.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
//     return imageIndex;
// }

// function setOverlayHeroImage(imageIndex) {
//     lightboxHero.src = `./images/image-product-${imageIndex}.jpg`;
//     //images are not sync
//     lightboxGallery.forEach(img => {
//         img.classList.remove('active');
//     });
//     //set active thumbnail
//     lightboxGallery[imageIndex-1].classList.add('active');
// }
