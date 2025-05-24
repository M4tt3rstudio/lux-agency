import React, { useEffect, useRef } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFThumbnail({ file, page }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPage = async () => {
      const loadingTask = pdfjs.getDocument(file);
      const pdf = await loadingTask.promise;
      const pdfPage = await pdf.getPage(page + 1); // PDF.js commence à 1
      const viewport = pdfPage.getViewport({ scale: 0.7 });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await pdfPage.render({ canvasContext: context, viewport }).promise;
    };

    renderPage().catch(console.error);
  }, [file, page]);

  return <canvas ref={canvasRef} className="pdf-thumbnail" />;
}
