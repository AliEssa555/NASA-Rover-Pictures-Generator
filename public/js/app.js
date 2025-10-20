class MarsRoverApp {
    constructor() {
        this.currentRover = 'curiosity';
        this.init();
    }

    init() {
        document.getElementById('load-photos').addEventListener('click', () => this.loadPhotos());
        document.getElementById('rover-select').addEventListener('change', (e) => {
            this.currentRover = e.target.value;
        });
        document.getElementById('download-btn').addEventListener('click', () => this.downloadImages());
        
        // Load initial photos
        this.loadPhotos();
    }

    async loadPhotos() {
        this.showLoading(true);
        
        try {
            const response = await fetch(`/api/photos/${this.currentRover}`);
            const data = await response.json();
            this.displayPhotos(data.photos);
        } catch (error) {
            console.error('Error loading photos:', error);
            this.displayError('Failed to load Mars photos');
        } finally {
            this.showLoading(false);
        }
    }

    displayPhotos(photos) {
        const container = document.getElementById('photos-container');
        container.innerHTML = '';

        photos.slice(0, 12).forEach(photo => {
            const photoCard = this.createPhotoCard(photo);
            container.appendChild(photoCard);
        });
    }

    createPhotoCard(photo) {
        const div = document.createElement('div');
        div.className = 'photo-card';
        div.innerHTML = `
            <img src="${photo.img_src}" alt="Mars Rover Photo" loading="lazy">
            <div class="photo-info">
                <h3>${photo.rover.name} Rover</h3>
                <p>Camera: ${photo.camera.full_name}</p>
                <p>Date: ${photo.earth_date}</p>
                <p>Sol: ${photo.sol}</p>
            </div>
        `;
        return div;
    }

    async downloadImages() {
        try {
            const response = await fetch('/api/photos/download');
            const result = await response.json();
            alert('Download process started! Check console for details.');
        } catch (error) {
            console.error('Download error:', error);
        }
    }

    showLoading(show) {
        document.getElementById('loading').classList.toggle('hidden', !show);
    }

    displayError(message) {
        const container = document.getElementById('photos-container');
        container.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MarsRoverApp();
});