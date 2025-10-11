// src/public/js/app.js
class NasaExplorer {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPopularImages();
    }

    bindEvents() {
        document.getElementById('searchBtn').addEventListener('click', () => this.search());
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.search();
        });

        // Quick search buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const searchTerm = e.target.dataset.search;
                document.getElementById('searchInput').value = searchTerm;
                this.search();
            });
        });
    }

    async search() {
        const query = document.getElementById('searchInput').value.trim();
        if (!query) return;

        this.showLoading();
        this.hideResults();
        this.hideError();

        try {
            const response = await fetch(`/api/nasa/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            
            if (data.collection && data.collection.items) {
                this.displayResults(data.collection.items);
            } else {
                this.showError('No images found. Try a different search term.');
            }
        } catch (error) {
            this.showError('Failed to search NASA archives. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async loadPopularImages() {
        try {
            const response = await fetch('/api/nasa/popular');
            const data = await response.json();
            
            if (data.collection && data.collection.items) {
                this.displayResults(data.collection.items);
            }
        } catch (error) {
            console.error('Failed to load popular images:', error);
        }
    }

    displayResults(items) {
        const grid = document.getElementById('resultsGrid');
        grid.innerHTML = '';

        items.forEach(item => {
            if (item.links && item.links[0] && item.data && item.data[0]) {
                const imageUrl = item.links[0].href;
                const metadata = item.data[0];
                
                const card = this.createImageCard(imageUrl, metadata);
                grid.appendChild(card);
            }
        });

        this.showResults();
    }

    createImageCard(imageUrl, metadata) {
        const card = document.createElement('div');
        card.className = 'image-card';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${metadata.title}" onerror="this.src='https://via.placeholder.com/300x200/2c5364/ffffff?text=Image+Not+Available'">
            <div class="image-info">
                <div class="image-title">${this.truncateText(metadata.title, 50)}</div>
                <div class="image-description">${this.truncateText(metadata.description || 'No description available', 100)}</div>
            </div>
        `;

        return card;
    }

    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    showResults() {
        document.getElementById('resultsSection').classList.remove('hidden');
    }

    hideResults() {
        document.getElementById('resultsSection').classList.add('hidden');
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    hideError() {
        document.getElementById('errorMessage').classList.add('hidden');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NasaExplorer();
});