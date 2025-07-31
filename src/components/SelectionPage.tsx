import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Displays a grid of mini‑apps available in Slom Slom.  Each card
 * acts as a button and navigates to the corresponding page.  The
 * layout automatically adjusts to available screen width via CSS
 * grid.
 */
const SelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const tools = [
    { icon: '🎡', title: 'Wheel', path: '/tools/wheel' },
    { icon: '🔊', title: 'Audio', path: '/tools/audio' },
    { icon: '🎬', title: 'Video', path: '/tools/video' },
    { icon: '📄', title: 'PDF', path: '/tools/pdf' },
  ];
  return (
    <section className="selection-page">
      <h1 className="neon-title">Choose your destiny</h1>
      <div className="grid">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="card"
            role="button"
            tabIndex={0}
            onClick={() => navigate(tool.path)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') navigate(tool.path);
            }}
          >
            <div className="card-icon" aria-hidden="true">{tool.icon}</div>
            <div className="card-title">{tool.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectionPage;