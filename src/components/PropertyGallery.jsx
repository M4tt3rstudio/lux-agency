import React from 'react';
import { properties } from '../data/properties';
import PropertyCard from './PropertyCard';

export default function PropertyGallery({ filter }) {
  const filtered = filter === 'tous' ? properties : properties.filter(p => p.type === filter);

  return (
    <div className="gallery">
      {filtered.map((item) => (
        <PropertyCard key={item.id} item={item} />
      ))}
    </div>
  );
}
