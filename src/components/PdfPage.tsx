import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PdfPage chooses one of the bundled PDFs at random and displays it
 * inside an iframe.  Because PDF rendering is delegated to the
 * browser, the component remains very lightweight.  A back button
 * returns to the selection page.
 */
const PdfPage: React.FC = () => {
  const navigate = useNavigate();
  const pdfFiles = ['sample1.pdf', 'sample2.pdf', 'sample3.pdf'];
  const [pdf, setPdf] = useState<string>('');
  useEffect(() => {
    const index = Math.floor(Math.random() * pdfFiles.length);
    setPdf(pdfFiles[index]);
  }, []);
  return (
    <section className="tool-page">
      <button className="back-button" onClick={() => navigate('/tools')}>← Back</button>
      <h1 className="neon-title">PDF Viewer</h1>
      <div className="page-content">
        {pdf && (
          <iframe
            className="pdf-frame"
            src={`/pdfs/${pdf}`}
            title="Random PDF"
          ></iframe>
        )}
      </div>
    </section>
  );
};

export default PdfPage;