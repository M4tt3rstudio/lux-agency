import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { properties } from '../data/properties';

const pdfCategories = [
  'description', 'terrain', 'plan du terrain', 'terrain propriété',
  'projet de construction', 'plan projet de construction',
  'projet de construction propriétés', 'lieux', 'contrat'
];

const AdminPanel = () => {
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [editedProperty, setEditedProperty] = useState({ ...properties[0] });
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);

  const handleInputChange = (field, value) => {
    setEditedProperty({ ...editedProperty, [field]: value });
  };

  const handlePageCategoryChange = (pageIndex, category) => {
    const newDocs = [...editedProperty.documents];
    if (!newDocs[0]) newDocs[0] = { file: '', pages: [] };
    const pages = [...(newDocs[0].pages || [])];
    const pageExists = pages.find(p => p.page === pageIndex);
    if (pageExists) {
      pageExists.category = category;
    } else {
      pages.push({ page: pageIndex, category });
    }
    newDocs[0].pages = pages;
    setEditedProperty({ ...editedProperty, documents: newDocs });
  };

  const handleSave = () => {
    console.log('Saved Property:', editedProperty);
    // TODO: Replace console.log with actual file writing logic using IPC or file system API in Electron
  };

  const renderCategoryDropdown = (pageIndex) => {
    const currentCategory = editedProperty.documents?.[0]?.pages?.find(p => p.page === pageIndex)?.category || '';
    return (
      <select
        value={currentCategory}
        onChange={(e) => handlePageCategoryChange(pageIndex, e.target.value)}
      >
        <option value="">-- Choisir une catégorie --</option>
        {pdfCategories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: 20 }}>
        <h2>Édition de la propriété : {editedProperty.title || 'Nouvelle propriété'}</h2>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            value={editedProperty.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />

          <label>Électricité:</label>
          <input
            type="text"
            value={editedProperty.electricity || ''}
            onChange={(e) => handleInputChange('electricity', e.target.value)}
          />

          <label>Route:</label>
          <input
            type="text"
            value={editedProperty.road || ''}
            onChange={(e) => handleInputChange('road', e.target.value)}
          />

          <label>Prix:</label>
          <input
            type="text"
            value={editedProperty.price || ''}
            onChange={(e) => handleInputChange('price', e.target.value)}
          />

          <label>Description:</label>
          <input
            type="text"
            value={editedProperty.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />

          <label>Location:</label>
          <input
            type="text"
            value={editedProperty.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />

          <label>Type:</label>
          <input
            type="text"
            value={editedProperty.type || ''}
            onChange={(e) => handleInputChange('type', e.target.value)}
          />

          <label>Terrain:</label>
          <input
            type="text"
            value={editedProperty.terrain || ''}
            onChange={(e) => handleInputChange('terrain', e.target.value)}
          />

          <label>Rai:</label>
          <input
            type="text"
            value={editedProperty.rai || ''}
            onChange={(e) => handleInputChange('rai', e.target.value)}
          />

          <label>Size:</label>
          <input
            type="text"
            value={editedProperty.size || ''}
            onChange={(e) => handleInputChange('size', e.target.value)}
          />
        </div>

        <div>
          <h3>Téléverser un PDF</h3>
          <input type="file" accept="application/pdf" onChange={(e) => setSelectedPdfFile(e.target.files[0])} />
        </div>

        <div>
          <h3>Assignation des pages PDF</h3>
          {[...Array(10).keys()].map((pageIndex) => (
            <div key={pageIndex}>
              <strong>Page {pageIndex}:</strong> {renderCategoryDropdown(pageIndex)}
            </div>
          ))}
        </div>

        <button onClick={handleSave}>Enregistrer les modifications</button>
      </div>

      <div style={{ flex: 1, padding: 20, background: '#f9f9f9' }}>
        <h3>Prévisualisation</h3>
        {selectedPdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={URL.createObjectURL(selectedPdfFile)} />
          </Worker>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
