import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * The landing screen of the application.  Presents a bold title
 * accompanied by a single call to action that leads into the tool
 * selection page.  This component uses minimal markup so that
 * attention is focused on the styling defined in theme.css.
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleEnter = () => {
    navigate('/tools');
  };
  return (
    <section className="home-page">
      <h1 className="neon-title">Slom Slom</h1>
      <button className="neon-button" onClick={handleEnter}>Enter</button>
    </section>
  );
};

export default HomePage;