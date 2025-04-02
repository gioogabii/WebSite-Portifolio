document.addEventListener('DOMContentLoaded', function() {
    // Elementos da página
    const homeLink = document.getElementById('home-link');
    const profilesLink = document.getElementById('profiles-link');
    const uploadLink = document.getElementById('upload-link');
    const profilesSection = document.getElementById('profiles-section');
    const uploadSection = document.getElementById('upload-section');
    const uploadForm = document.getElementById('upload-form');
    const profilesContainer = document.getElementById('profiles-container');
    const artModal = document.getElementById('art-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalArtist = document.getElementById('modal-artist');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const modalViews = document.getElementById('modal-views');
    const modalLikes = document.getElementById('modal-likes');
    const likeBtn = document.getElementById('like-btn');
    const emptyState = document.getElementById('empty-state');

    // Dados salvos no localStorage
    let artworks = JSON.parse(localStorage.getItem('artworks')) || [];
    let likedArtworks = JSON.parse(localStorage.getItem('likedArtworks')) || [];
    let currentArtwork = null;

    // Funções
    function loadProfiles() {
        profilesContainer.innerHTML = '';
        
        if (artworks.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
            const sortedArtworks = [...artworks].sort((a, b) => b.id - a.id);
            
            sortedArtworks.forEach(artwork => {
                const profileCard = document.createElement('div');
                profileCard.className = 'profile-card';
                profileCard.dataset.id = artwork.id;
                
                profileCard.innerHTML = `
                    <img src="${artwork.image}" alt="${artwork.title}" class="profile-image">
                    <div class="profile-info">
                        <div class="profile-name">${artwork.artist}</div>
                        <div class="profile-category">${artwork.category}</div>
                        <div class="profile-stats">
                            <span><i class="fas fa-eye"></i> ${artwork.views}</span>
                            <span><i class="fas fa-heart"></i> ${artwork.likes}</span>
                        </div>
                    </div>
                `;
                
                profileCard.addEventListener('click', () => openArtModal(artwork.id));
                profilesContainer.appendChild(profileCard);
            });
        }
    }

    function openArtModal(id) {
        currentArtwork = artworks.find(art => art.id === id);
        
        if (!currentArtwork) return;
        
        currentArtwork.views++;
        localStorage.setItem('artworks', JSON.stringify(artworks));
        
        modalImage.src = currentArtwork.image;
        modalTitle.textContent = currentArtwork.title;
        modalArtist.textContent = currentArtwork.artist;
        modalCategory.textContent = currentArtwork.category;
        modalDescription.textContent = currentArtwork.description;
        modalViews.textContent = currentArtwork.views;
        modalLikes.textContent = currentArtwork.likes;
        
        if (likedArtworks.includes(id)) {
            likeBtn.innerHTML = '<i class="fas fa-heart"></i> Curtido';
            likeBtn.disabled = true;
        } else {
            likeBtn.innerHTML = '<i class="far fa-heart"></i> Curtir';
            likeBtn.disabled = false;
        }
        
        artModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        loadProfiles();
    }

    function closeArtModal() {
        artModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentArtwork = null;
    }

    function handleLike() {
        if (!currentArtwork || likedArtworks.includes(currentArtwork.id)) return;
        
        currentArtwork.likes++;
        likedArtworks.push(currentArtwork.id);
        localStorage.setItem('artworks', JSON.stringify(artworks));
        localStorage.setItem('likedArtworks', JSON.stringify(likedArtworks));
        
        modalLikes.textContent = currentArtwork.likes;
        likeBtn.innerHTML = '<i class="fas fa-heart"></i> Curtido';
        likeBtn.disabled = true;
        loadProfiles();
    }

    function handleUpload(e) {
        e.preventDefault();
        
        const artistName = document.getElementById('artist-name').value;
        const artTitle = document.getElementById('art-title').value;
        const artCategory = document.getElementById('art-category').value;
        const artDescription = document.getElementById('art-description').value;
        const artImage = document.getElementById('art-image').files[0];
        
        if (!artistName || !artTitle || !artCategory || !artImage) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const newArtwork = {
                id: Date.now(),
                artist: artistName,
                title: artTitle,
                category: artCategory,
                description: artDescription,
                image: e.target.result,
                views: 0,
                likes: 0
            };
            
            artworks.unshift(newArtwork);
            localStorage.setItem('artworks', JSON.stringify(artworks));
            loadProfiles();
            uploadForm.reset();
            alert('Arte publicada com sucesso!');
            showSection('profiles');
        };
        reader.readAsDataURL(artImage);
    }

    function showSection(section) {
        profilesSection.classList.remove('active');
        uploadSection.classList.remove('active');
        
        if (section === 'profiles') {
            profilesSection.classList.add('active');
            uploadSection.style.display = 'none';
            profilesSection.style.display = 'block';
        } else if (section === 'upload') {
            uploadSection.classList.add('active');
            profilesSection.style.display = 'none';
            uploadSection.style.display = 'block';
        }
    }

    // Event Listeners
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('profiles');
    });

    profilesLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('profiles');
    });

    uploadLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('upload');
    });

    closeModal.addEventListener('click', closeArtModal);
    likeBtn.addEventListener('click', handleLike);
    uploadForm.addEventListener('submit', handleUpload);

    window.addEventListener('click', (e) => {
        if (e.target === artModal) {
            closeArtModal();
        }
    });

    // Inicialização
    showSection('profiles');
    loadProfiles();
});