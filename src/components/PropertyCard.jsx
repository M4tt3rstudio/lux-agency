import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PropertyCard({ item, onClick }) {
  const [terrainPage, setTerrainPage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const doc = item.documents?.[0];
    const terrain = doc?.pages.find(p => p.category.toLowerCase() === 'terrain');
    if (doc && terrain) {
      setTerrainPage(terrain.page + 1); // react-pdf commence à 1
      setPdfFile(doc.file);
    }
  }, [item]);

  const isSold = item.price.toLowerCase().includes('sold');

  return (
    <div className="property-card" onClick={onClick}>
      {isSold && (
        <span className="sold-badge">SOLD</span>
      )}

      {pdfFile && terrainPage !== null ? (
        <div className="pdf-card-preview">
          <Document file={pdfFile} loading="Chargement...">
            <Page
              pageNumber={terrainPage}
              width={240}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      ) : (
        <div className="pdf-card-fallback">Aucune image</div>
      )}

      <h3>{item.title}</h3>
      <p>{item.location}</p>
      <p style={{ color: isSold ? 'red' : 'inherit', fontWeight: isSold ? 'bold' : 'normal' }}>
        {item.price}
      </p>
      <p>{item.size}</p>

      {item.description && (
        <p>
          {item.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
