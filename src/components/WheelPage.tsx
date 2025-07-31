import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * WheelPage implements a simple wheel of fortune.  Eight colourful
 * segments are arranged in a circle using a conic gradient.  When
 * the user taps the Spin button the wheel rotates a few times and
 * eventually lands on a randomly selected segment.  The result is
 * displayed beneath the wheel.  A back button returns to the
 * selection page.
 */
const WheelPage: React.FC = () => {
  const navigate = useNavigate();
  const segments = [
    { label: 'Jackpot!', color: '#ff007f' },
    { label: 'Better luck', color: '#00ffff' },
    { label: 'Surprise!', color: '#ffa500' },
    { label: 'Mystery', color: '#8a2be2' },
    { label: 'Try again', color: '#00ff00' },
    { label: 'You win!', color: '#ff1493' },
    { label: 'Neon dream', color: '#00bfff' },
    { label: 'Secret', color: '#ff8c00' }
  ];
  const segmentAngle = 360 / segments.length;
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const spinning = useRef(false);

  // Build a CSS conic gradient string for the wheel colours.  Each
  // segment occupies an equal slice of the 360° circle.
  const gradientParts = segments.map((seg, i) => {
    const start = i * segmentAngle;
    const end = (i + 1) * segmentAngle;
    return `${seg.color} ${start}deg ${end}deg`;
  });
  const gradient = `conic-gradient(${gradientParts.join(', ')})`;

  const spinWheel = () => {
    if (spinning.current) return;
    spinning.current = true;
    setResult(null);
    const randomIndex = Math.floor(Math.random() * segments.length);
    const spins = Math.floor(Math.random() * 3) + 4; // 4–6 full rotations
    const targetAngle = spins * 360 + (360 - (randomIndex + 0.5) * segmentAngle);
    setRotation(targetAngle);
    // After the spin completes (4s transition) reveal the result
    setTimeout(() => {
      setResult(segments[randomIndex].label);
      spinning.current = false;
    }, 4000);
  };

  return (
    <section className="tool-page">
      <button className="back-button" onClick={() => navigate('/tools')}>← Back</button>
      <h1 className="neon-title">Wheel of Fortune</h1>
      <div className="wheel-container">
        <div
          className="wheel"
          style={{ background: gradient, transform: `rotate(${rotation}deg)` }}
        />
        <div className="pointer" />
      </div>
      <button className="neon-button" onClick={spinWheel} disabled={spinning.current}>
        Spin
      </button>
      {result && <div className="result-message">{result}</div>}
    </section>
  );
};

export default WheelPage;