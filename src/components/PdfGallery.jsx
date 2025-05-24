import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfGallery({ documentData, selectedCategory }) {
  const [enlargedPage, setEnlargedPage] = useState(null);

  if (!documentData || !documentData.pages) return null;

  const filteredPages = documentData.pages.filter(
    (p) =>
      selectedCategory === 'toutes' ||
      p.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="pdf-gallery">
      <Document
        file={documentData.file}
        onLoadError={(error) => console.error('Erreur PDF :', error.message)}
      >
        <div className="pdf-grid">
          {filteredPages.map((p, index) => (
            <div
              key={index}
              className="pdf-thumbnail"
              onClick={() => setEnlargedPage(p.page)}
            >
              <Page
                pageNumber={p.page + 1} // 👈 correction ici
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={200}
              />
              <div className="pdf-caption">{p.category.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </Document>

      {enlargedPage !== null && (
        <div className="lightbox" onClick={() => setEnlargedPage(null)}>
          <div className="lightbox-inner">
            <Document file={documentData.file}>
              <Page
                pageNumber={enlargedPage + 1} // 👈 idem ici
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={800}
              />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
}
