const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21938296-6f6e29c510a17a0a43204ed70';
const options = {
    headers: {
        Authorization: API_KEY,
    },
};


export default class PicturesApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchGallery() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        
        const response = await fetch(url, options);
        const images = await response.json();
        this.incrementPage();

        return images;
        // return fetch(url, options).then(response =>
        //     response.json()).then(({ pictures }) => {
        //         this.incrementPage();
        //         return pictures;
        //     });
    }
    
    incrementPage() {
            this.page += 1;
        }
    resetPage() {
            this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
} 
