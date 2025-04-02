const projectsData = [
  { 
    id: 1, 
    title: "Projeto 1", 
    description: "Descrição detalhada do Projeto 1.",
    images: [
      "img/imagem 1.jpg",
      "img/imagem1-1.jpg",
      "img/imagem1-2.jpg"
    ]
  },
  { 
    id: 2, 
    title: "Projeto 2", 
    description: "Descrição detalhada do Projeto 2.",
    images: [
      "img/imagem 2.jpg",
      "img/imagem2-1.jpg",
      "img/imagem2-2.jpg"
    ]
  },
  { 
    id: 3, 
    title: "Projeto 3", 
    description: "Descrição detalhada do Projeto 3.",
    images: [
      "img/imagem 3.jpeg",
      "img/imagem3-1.jpg",
      "img/imagem3-2.jpg"
    ]
  },
  { 
    id: 4, 
    title: "Projeto 4", 
    description: "Descrição detalhada do Projeto 4.",
    images: [
      "img/imagem 4.jpg",
      "img/imagem4-1.jpg",
      "img/imagem4-2.jpg"
    ]
  },
  { 
    id: 5, 
    title: "Projeto 5", 
    description: "Descrição detalhada do Projeto 5.",
    images: [
      "img/imagem 5.jpg",
      "img/imagem5-1.jpg",
      "img/imagem5-2.jpg"
    ]
  },
  { 
    id: 6, 
    title: "Projeto 6", 
    description: "Descrição detalhada do Projeto 6.",
    images: [
      "img/imagem 6.jpg",
      "img/imagem6-1.jpg",
      "img/imagem6-2.jpg"
    ]
  },
  { 
    id: 7, 
    title: "Projeto 7", 
    description: "Descrição detalhada do Projeto 7.",
    images: [
      "img/imagem 7.jpg",
      "img/imagem7-1.jpg",
      "img/imagem7-2.jpg"
    ]
  },
  { 
    id: 8, 
    title: "Projeto 8", 
    description: "Descrição detalhada do Projeto 8.",
    images: [
      "img/imagem 8.jpg",
      "img/imagem8-1.jpg",
      "img/imagem8-2.jpg"
    ]
  },
  { 
    id: 9, 
    title: "Projeto 9", 
    description: "Descrição detalhada do Projeto 9.",
    images: [
      "img/imagem 9.jpg",
      "img/imagem9-1.jpg",
      "img/imagem9-2.jpg"
    ]
  },
  { 
    id: 10, 
    title: "Projeto 10", 
    description: "Descrição detalhada do Projeto 10.",
    images: [
      "img/imagem 10.jpg",
      "img/imagem10-1.jpg",
      "img/imagem10-2.jpg"
    ]
  },
  { 
    id: 11, 
    title: "Projeto 11", 
    description: "Descrição detalhada do Projeto 11.",
    images: [
      "img/imagem 11.jpg",
      "img/imagem11-1.jpg",
      "img/imagem11-2.jpg"
    ]
  },
  { 
    id: 12, 
    title: "Projeto 12", 
    description: "Descrição detalhada do Projeto 12.",
    images: [
      "img/imagem 12.jpg",
      "img/imagem12-1.jpg",
      "img/imagem12-2.jpg"
    ]
  },
  { 
    id: 13, 
    title: "Projeto 13", 
    description: "Descrição detalhada do Projeto 13.",
    images: [
      "imagem13.jpg",
      "imagem13-1.jpg"
    ]
  },
  { 
    id: 14, 
    title: "Projeto 14", 
    description: "Descrição detalhada do Projeto 14.",
    images: [
      "img/imagem 14.jpg",
      "img/imagem14-1.jpg",
      "img/imagem14-2.jpg"
    ]
  },
  { 
    id: 15, 
    title: "Projeto 15", 
    description: "Descrição detalhada do Projeto 15.",
    images: [
      "img/imagem 15.jpg",
      "img/imagem15-1.jpg",
      "img/imagem15-2.jpg"
    ]
  },
  { 
    id: 16, 
    title: "Projeto 16", 
    description: "Descrição detalhada do Projeto 16.",
    images: [
      "img/imagem 16.jpg",
      "img/imagem16-1.jpg",
      "img/imagem16-2.jpg"
    ]
  }
];

function openProject(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDescription').textContent = project.description;

  const carouselImages = document.getElementById('carouselImages');
  carouselImages.innerHTML = '';

  project.images.forEach(imageUrl => {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = project.title;
    img.onclick = () => window.open(imageUrl, '_blank');
    carouselImages.appendChild(img);
  });

  document.getElementById('projectModal').style.display = 'flex';
}
