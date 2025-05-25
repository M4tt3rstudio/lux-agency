import React, { useState } from 'react';
import './LuxAgencyApp.css';

import ConceptSelector from './components/ConceptSelector';
import ConceptButtons from './components/ConceptButtons';
import BoutiquePanel from './components/BoutiquePanel';
import ContactPanel from './components/ContactPanel'; // ou tout autre composant alternatif

export default function LuxAgencyApp() {
  const concepts = ['Présentation', 'Terrains', 'Maisons', 'Vente', 'Location'];
  const [selectedConcept, setSelectedConcept] = useState('Présentation');
  const [filter, setFilter] = useState('tous');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activePanel, setActivePanel] = useState('boutique'); // 'boutique' ou 'contact'

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

  const renderPanel = () => {
    if (activePanel === 'contact') {
      return <ContactPanel />;
    }
    return (
      <BoutiquePanel
        filter={filter}
        selectedProperty={selectedProperty}
        setSelectedProperty={setSelectedProperty}
      />
    );
  };

  return (
    <div className="app-wrapper">
      <header className="header-bar">
        <div className="logo-title">
          <img src="/images/asset/logo/logo-lux-agency.svg" alt="Lux Agency" />
          <h1>Lux Agency</h1>
        </div>
        <div className="header-buttons">
          <button onClick={() => setActivePanel('boutique')}>Galerie</button>
          <button onClick={() => setActivePanel('contact')}>Contact</button>
        </div>
      </header>

      <div className="section-row">
        <ConceptSelector activeConcept={selectedConcept} />
        <ConceptButtons
          concepts={concepts}
          activeConcept={selectedConcept}
          onSelect={handleConceptChange}
        />
        <div className="dynamic-panel">
          {renderPanel()}
        </div>
      </div>
    </div>
  );
}
