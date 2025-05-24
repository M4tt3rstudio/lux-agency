import React from 'react';

export default function ConceptButtons({ concepts, activeConcept, onSelect }) {
  return (
    <div className="concept-buttons">
      {concepts.map((label) => (
        <button
          key={label}
          className={`concept-button ${activeConcept === label ? 'active' : ''}`}
          onClick={() => onSelect(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
