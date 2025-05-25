import React, { useState } from 'react';
import LuxAgencyApp from '../LuxAgencyApp';
import ContactPanel from './ContactPanel'; // tu peux créer ce composant ou en mettre un autre

export default function AppLayout() {
  const [activePanel, setActivePanel] = useState('gallery');

  return (
    <div className="app-container">
      <header className="app-header">
        <img
          src="/images/asset/logo/logo-lux-agency.svg"
          alt="Lux Agency logo"
          className="logo"
          width={100}
          height={100}
        />
        <h1 className="app-title">Lux Agency</h1>
        <div className="header-buttons">
          <button onClick={() => setActivePanel('gallery')}>🏡 Galerie</button>
          <button onClick={() => setActivePanel('contact')}>📞 Contact</button>
        </div>
      </header>

      <main className="app-main">
        {activePanel === 'gallery' && <LuxAgencyApp />}
        {activePanel === 'contact' && <ContactPanel />}
      </main>
    </div>
  );
}
