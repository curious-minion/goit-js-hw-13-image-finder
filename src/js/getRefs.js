export default function getRefs() {
    return {
        userSearch: document.querySelector('.search-form'),
        galleryEl: document.querySelector('.js-gallery'),
        input: document.querySelector('input'),
        images: document.querySelectorAll('[data-image]'),
        lightboxEl: document.querySelector('.lightbox'),
        closeLightboxEl: document.querySelector('[data-action="close-lightbox"]'),
        lightboxImageEl: document.querySelector('.lightbox__image'),
        backdropEl: document.querySelector('.lightbox__overlay'),
    };
} 