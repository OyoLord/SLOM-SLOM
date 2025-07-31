import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * WheelPage renders an 11‑segment wheel that picks a number between 5
 * and 15.  After the spin concludes the chosen value is displayed
 * briefly before a series of full‑screen breathing prompts guide the
 * user through a simple game.  All timing is handled with
 * setTimeout calls to ensure smooth progression without user
 * intervention.  A pointer above the wheel indicates the result.
 */
const WheelPage: React.FC = () => {
  const navigate = useNavigate();
  // Numbers from 5 to 15 inclusive.  Each element defines the label
  // and colour for its corresponding segment on the wheel.
  const numbers = Array.from({ length: 11 }, (_, i) => 5 + i);
  const colours = [
    '#ff007f', '#00ffff', '#ffa500', '#8a2be2', '#00ff00',
    '#ff1493', '#00bfff', '#ff8c00', '#ff69b4', '#7fff00', '#00ced1'
  ];
  const segmentAngle = 360 / numbers.length;

  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const spinning = useRef(false);
  const [stage, setStage] = useState<'wheel' | 'fullpiege' | 'inspire' | 'bloque' | 'souffle'>('wheel');

  // Construct the conic gradient string for the wheel.
  const gradient = `conic-gradient(${numbers
    .map((_, i) => {
      const start = i * segmentAngle;
      const end = (i + 1) * segmentAngle;
      return `${colours[i % colours.length]} ${start}deg ${end}deg`;
    })
    .join(', ')})`;

  const spinWheel = () => {
    if (spinning.current) return;
    spinning.current = true;
    // Pick a random number between 5 and 15 inclusive.
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const number = numbers[randomIndex];
    // Compute spins and target rotation; align the selected segment
    // such that its centre is at the top pointer when the animation
    // completes.
    const spins = Math.floor(Math.random() * 3) + 4; // 4–6 full rotations
    const targetAngle = spins * 360 + (360 - (randomIndex + 0.5) * segmentAngle);
    setSelected(null);
    setRotation(targetAngle);
    // After the CSS transition finishes reveal the result for a
    // moment before beginning the sequence of full screen screens.
    setTimeout(() => {
      setSelected(number);
      // Display the number for two seconds, then start the game
      setTimeout(() => {
        startSequence(number);
      }, 2000);
      spinning.current = false;
    }, 4000);
  };

  const startSequence = (number: number) => {
    setStage('fullpiege');
    // After 3s show Inspire screen
    setTimeout(() => setStage('inspire'), 3000);
    // After 8s (3 + 5) show Bloque screen for N seconds
    setTimeout(() => {
      setStage('bloque');
      // After N seconds show Souffle screen
      setTimeout(() => setStage('souffle'), number * 1000);
    }, 8000);
  };

  // Build the wheel faces: numbers drawn around the centre.  We
  // position each label absolutely using transform to rotate it into
  // place.  This allows the labels to remain upright as the wheel
  // rotates.
  const labels = numbers.map((num, i) => {
    const angle = i * segmentAngle;
    return (
      <div
        key={num}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `rotate(${angle}deg) translate(-50%, -85%) rotate(${-angle}deg)`,
          transformOrigin: '0 100%',
          fontFamily: 'Creepster, cursive',
          fontSize: '1.2rem',
          color: '#fff',
          textShadow: '0 0 5px #000'
        }}
      >
        {num}
      </div>
    );
  });

  // Overlay screens for each breathing sequence stage
  const overlay = () => {
    switch (stage) {
      case 'fullpiege':
        return (
          <div className="overlay-screen fullpiege">
            <div className="flash-text">Full piège</div>
          </div>
        );
      case 'inspire':
        return (
          <div className="overlay-screen inspire">
            Inspire !
          </div>
        );
      case 'bloque':
        return (
          <div className="overlay-screen bloque">
            Bloque !
          </div>
        );
      case 'souffle':
        return (
          <div className="overlay-screen souffle">
            <div>Souffle&nbsp;!</div>
            <button className="neon-button" onClick={() => navigate('/tools')}>Retour</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="tool-page">
      {stage === 'wheel' && (
        <>
          <button className="back-button" onClick={() => navigate('/tools')}>
            ← Back
          </button>
          <h1 className="neon-title">Wheel of Fortune</h1>
          <div className="wheel-container">
            <div
              className="wheel"
              style={{ background: gradient, transform: `rotate(${rotation}deg)` }}
            >
              {labels}
            </div>
            {/* pointer indicator */}
            <div className="pointer" />
          </div>
          <button className="neon-button" onClick={spinWheel} disabled={spinning.current}>
            Spin
          </button>
          {selected !== null && (
            <div className="result-message">{selected}</div>
          )}
        </>
      )}
      {stage !== 'wheel' && overlay()}
    </section>
  );
};

export default WheelPage;