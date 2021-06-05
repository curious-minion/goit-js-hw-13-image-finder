import './styles.css';

// lodash & pontify
var debounce = require('lodash.debounce');
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import {error} from '@pnotify/core/dist/PNotify.js';

// js & templates
import getRefs from './js/getRefs';
import PicturesApiService from './js/apiService';
import imagesTpl from './templates/galleryTpl.hbs';


const refs = getRefs();
const picturesApiService = new PicturesApiService();

refs.userSearch.addEventListener('submit', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();

    picturesApiService.query = refs.input.value;

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
            preloadImage(entry.target);
            // Stop watching and load the image
            self.unobserve(entry.target);
        }
    });
}, options);

images.forEach(image => {
    observer.observe(image);
});

function preloadImage(img) {
    const src = img.getAttribute('data-image');
    if (!scr) { return; }
    img.src = src;
}


