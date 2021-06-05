import './styles.css';


// lodash & pontify
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import {error} from '@pnotify/core/dist/PNotify.js';

// js & templates

import PicturesApiService from './js/apiService';
import imagesTpl from './templates/galleryTpl.hbs';


const refs = {
    userSearch: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.js-gallery'),
    input: document.querySelector('.input'),
    images: document.querySelectorAll('[data-source]'),
    lightboxEl: document.querySelector('.lightbox'),
    closeLightboxEl: document.querySelector('[data-action="close-lightbox"]'),
    lightboxImageEl: document.querySelector('.lightbox__image'),
    backdropEl: document.querySelector('.lightbox__overlay'),
};

const picturesApiService = new PicturesApiService();

refs.userSearch.addEventListener('submit', onSearch);

function onSearch(e) {
   
    e.preventDefault();

    picturesApiService.query = e.currentTarget.elements.query.value;

    if (picturesApiService.query === '') {
        return errorMessage('Search is empty. Type in your request')
    }

    picturesApiService.resetPage();
    clearPicturesContainer();
    fetchImages();

}



function errorMessage(message) {
    error({
        title: `${message}`
    });
}

function fetchImages() {
    picturesApiService.fetchImages().then(images => {
        appendImagesMarkup(images);
    });
    
}

function appendImagesMarkup(images) {
    refs.galleryEl.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearPicturesContainer() {
    refs.galleryEl.innerHTML = '';
}


const images = refs.images;
const options = {
    threshold: 0
};

const observer = new IntersectionObserver(function (entries, self) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            picturesApiService.fetchImages(entry.target);
        }
        
        // Stop watching and load the image
        self.unobserve(entry.target);
    
    });
}, options);

images.forEach(image => {
    observer.observe(image);
});


// const images = refs.images;
// const options = {
//     threshold: 0
// };

// const observer = new IntersectionObserver(function (entries, self) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             preloadImage(entry.target);
//             // Stop watching and load the image
//             self.unobserve(entry.target);
//         }
//     });
// }, options);

// images.forEach(image => {
//     observer.observe(image);
// });

// function preloadImage(img) {
//     const src = img.getAttribute('data-source');
//     if (!src) { return; }
//     img.src = src;
// }


// modal open & close 
refs.galleryEl.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
   e.preventDefault();

    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
  const galleryPictureSource = e.target.dataset.source;
  return galleryPictureSource;

}


refs.galleryEl.addEventListener('click', onOpenModal);
refs.closeLightboxEl.addEventListener('click', onCloseModal);
refs.backdropEl.addEventListener('click', onBackdropClick);

function onOpenModal(e) {
 
  window.addEventListener('keydown', onEscKeyPress);


  
  refs.lightboxEl.classList.add('is-open');
  refs.lightboxImageEl.src = onGalleryItemClick(e);
  
}


function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  
  
 
  refs.lightboxEl.classList.remove('is-open');
  refs.lightboxImageEl.src = '';
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}