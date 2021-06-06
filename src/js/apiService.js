const KEY = '21938296-6f6e29c510a17a0a43204ed70';
const BASE_URL = 'https://pixabay.com/api/';

export default class PicturesApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    
    async fetchImages() {
        try {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
        
        const response = await fetch(url);
        const images = await response.json();

        this.incrementPage();
        return images.hits;
            
        } catch (error) {
            console.log('Error');
        }
        
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
