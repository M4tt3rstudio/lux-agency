import React from 'react';
import PropertyCard from './PropertyCard';

export default function GalleryPanel({ articles = [], onSelectProperty }) {
  return (
    <div className="property-list">
      {articles.length === 0 ? (
        <p style={{ textAlign: 'center', width: '100%' }}>Aucun article pour le moment.</p>
      ) : (
        articles.map((item, index) => (
          <PropertyCard
            key={index}
            item={item}
            onClick={() => onSelectProperty?.(item)}
          />
        ))
      )}
    </div>
  );
}
