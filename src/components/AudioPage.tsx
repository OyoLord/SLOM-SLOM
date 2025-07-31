import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * A minimalist audio player page.  A single local audio file is
 * embedded with native controls.  The dark backdrop and neon
 * accents keep the visual language consistent with the rest of the
 * application.
 */
const AudioPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="tool-page">
      <button className="back-button" onClick={() => navigate('/tools')}>← Back</button>
      <h1 className="neon-title">Audio Player</h1>
      <div className="page-content">
        <audio className="media" controls>
          <source src="/audio/sample.wav" type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </section>
  );
};

export default AudioPage;