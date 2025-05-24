import React, { useState } from 'react';
import './LuxAgencyApp.css';

import ConceptSelector from './components/ConceptSelector';
import ConceptButtons from './components/ConceptButtons';
import BoutiquePanel from './components/BoutiquePanel';

export default function LuxAgencyApp() {
  const concepts = ['Présentation', 'Terrains', 'Maisons', 'Vente', 'Location'];

  const [selectedConcept, setSelectedConcept] = useState('Présentation');
  const [filter, setFilter] = useState('tous');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleConceptChange = (concept) => {
    setSelectedConcept(concept);

    const map = {
      Présentation: 'tous',
      Terrains: 'terrain',
      Maisons: 'maison',
      Vente: 'vente',
      Location: 'location'
    };

    setFilter(map[concept] || 'tous');
    setSelectedProperty(null);
  };

  return (
    <div className="app-wrapper">
      <div className="section-row">
        {/* Colonne 1 : titre ou texte fixe */}
        <ConceptSelector activeConcept={selectedConcept} />

        {/* Colonne 2 : boutons de filtres */}
        <ConceptButtons
          concepts={concepts}
          activeConcept={selectedConcept}
          onSelect={handleConceptChange}
        />

        {/* Colonne 3 : boutique filtrée ou détails */}
        <BoutiquePanel
          filter={filter}
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
        />
      </div>
    </div>
  );
}
