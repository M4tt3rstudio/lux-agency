import React, { useState } from 'react';
import { properties } from '../data/properties'; // Assure-toi que le fichier est bien dans /src/data
import PropertyCard from './PropertyCard';        // Ce fichier doit être dans /src/components
import PdfGallery from './PdfGallery';            // Ce fichier doit être dans /src/components

export default function BoutiquePanel({ filter, selectedProperty, setSelectedProperty }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [imageCategory, setImageCategory] = useState('toutes');

  const filteredProperties =
    filter === 'tous'
      ? properties
      : properties.filter((p) => p.type.toLowerCase() === filter.toLowerCase());

  const getImageCategories = (images = [], documents = []) => {
    const imgCats = images.map((img) => img.category);
    const docCats = documents.flatMap((doc) => doc.pages.map((p) => p.category));
    const unique = new Set([...imgCats, ...docCats]);
    return ['toutes', ...Array.from(unique)];
  };

  if (selectedProperty) {
    const images = selectedProperty.images || [];
    const documents = selectedProperty.documents || [];

    const allCategories = getImageCategories(images, documents);

    const visibleImages =
      imageCategory === 'toutes'
        ? images
        : images.filter((img) => img.category === imageCategory);

    return (
      <div className="boutique-panel">
        <button className="back-button" onClick={() => setSelectedProperty(null)}>
          ← Retour
        </button>

        <div className="property-details">
          <h2>{selectedProperty.title}</h2>
          <p><strong>Lieu :</strong> {selectedProperty.location}</p>
          <p><strong>Prix :</strong> {selectedProperty.price}</p>
          <p><strong>Size :</strong> {selectedProperty.size}</p>
          <p><strong>Electricity :</strong> {selectedProperty.electricity}</p>
          <p><strong>Road :</strong> {selectedProperty.road}</p>
          <p><strong>Categorie :</strong> {selectedProperty.type}</p>
          <p><strong>Type :</strong> {selectedProperty.terrain}</p>
          <p><strong>Rai :</strong> {selectedProperty.rai}</p>
          
          
          <p>{selectedProperty.description}</p>

          <div className="image-filter-buttons">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={imageCategory === cat ? 'active' : ''}
                onClick={() => setImageCategory(cat)}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="image-grid">
            {visibleImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`img-${index}`}
                onClick={() => setLightboxImage(img.url)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>

          {documents.length > 0 && (
            <>
              <h3>Documents PDF</h3>
              {documents.map((doc, index) => (
                <PdfGallery
                  key={index}
                  documentData={doc}
                  selectedCategory={imageCategory}
                />
              ))}
            </>
          )}
        </div>

        {lightboxImage && (
          <div className="lightbox" onClick={() => setLightboxImage(null)}>
            <img src={lightboxImage} alt="Agrandissement" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="boutique-panel">
      <div className="property-list">
        {filteredProperties.map((item) => (
          <PropertyCard
            key={item.id}
            item={item}
            onClick={() => setSelectedProperty(item)}
          />
        ))}
      </div>
    </div>
  );
}
