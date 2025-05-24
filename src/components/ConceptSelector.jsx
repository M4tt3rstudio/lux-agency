import React from 'react';

export default function ConceptSelector({ activeConcept }) {
  return (
    <div className="concept-selector">
      {activeConcept === 'Présentation' ? (
        <div className="concept-text">
          <h2>Lux Agency</h2>
          <p>
            Bienvenue chez <strong>Lux Agency</strong>, votre agence dédiée aux biens d'exception en Thaïlande :
            terrains panoramiques, villas de luxe, locations saisonnières ou investissements long terme.
          </p>
          <p>
            Découvrez notre sélection exclusive et laissez-vous guider dans votre projet immobilier au paradis 🌴
          </p>
        </div>
      ) : (
        <div className="concept-text">
          <h2>{activeConcept}</h2>
          <p>Sélection de propriétés correspondant à : <strong>{activeConcept}</strong>.</p>
        </div>
      )}
    </div>
  );
}
