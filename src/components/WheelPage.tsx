import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WheelPage: React.FC = () => {
  const navigate = useNavigate();
  const numbers = Array.from({ length: 11 }, (_, i) => 5 + i);
  const colours = ['#ff007f', '#00ffff', '#ffa500', '#8a2be2', '#00ff00', '#ff1493', '#00bfff', '#ff8c00', '#ff69b4', '#7fff00', '#00ced1'];
  const segmentAngle = 360 / numbers.length;

  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [stage, setStage] = useState<'wheel' | 'fullpiege' | 'inspire' | 'bloque' | 'souffle'>('wheel');
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const spinning = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const gradient = `conic-gradient(${numbers.map((_, i) => {
    const start = i * segmentAngle;
    const end = (i + 1) * segmentAngle;
    return `${colours[i % colours.length]} ${start}deg ${end}deg`;
  }).join(', ')})`;

  const spinWheel = () => {
    if (spinning.current) return;
    spinning.current = true;
    setButtonsDisabled(true);

    const randomIndex = Math.floor(Math.random() * numbers.length);
    const number = numbers[randomIndex];
    const spins = Math.floor(Math.random() * 3) + 4;
    const targetAngle = spins * 360 + (270 - (randomIndex + 0.5) * segmentAngle);
    setSelected(null);
    setRotation(targetAngle);

    setTimeout(() => {
      setSelected(number);
      setTimeout(() => {
        startSequence(number);
      }, 2000);
      spinning.current = false;
    }, 4000);
  };

  const startSequence = (number: number) => {
    setStage('fullpiege');
    audioRef.current?.play();

    setTimeout(() => {
      setStage('inspire');
      const inspireDuration = Math.floor(Math.random() * 6) + 3; // 3–8s
      setTimeout(() => {
        setStage('bloque');
        setCountdown(number);
      }, inspireDuration * 1000);
    }, 3000);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === 'bloque' && countdown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [stage, countdown]);

  useEffect(() => {
    if (stage === 'bloque' && countdown === 0) {
      setTimeout(() => setStage('souffle'), 1000);
    }
  }, [countdown, stage]);

  const labels = numbers.map((num, i) => {
    const angle = i * segmentAngle;
    return (
      <div
        key={num}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `rotate(${angle}deg) translate(-50%, -90%) rotate(${-angle}deg)`,
          transformOrigin: '0 100%',
          fontFamily: 'Crimson Pro, serif',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 0 3px #000',
        }}
      >
        {num}
      </div>
    );
  });

  const overlay = () => {
    switch (stage) {
      case 'fullpiege':
        return (
          <div className="overlay-screen fullpiege">
            <div className="flash-text">Full piège</div>
            <audio ref={audioRef} src="/audio/piege.mp3" preload="auto" />
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
            <div>Bloque !</div>
            {countdown !== null && <div style={{ fontSize: '2.5rem' }}>{countdown}</div>}
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
          <button className="back-button" onClick={() => navigate('/tools')} disabled={buttonsDisabled}>
            ← Back
          </button>
          <h1 className="neon-title">C'est la roue cool !</h1>
          <div className="wheel-container">
            <div className="wheel" style={{ background: gradient, transform: `rotate(${rotation}deg)` }}>
              {labels}
            </div>
            <div className="pointer" />
          </div>
          <button className="neon-button" onClick={spinWheel} disabled={buttonsDisabled || spinning.current}>
            Spin
          </button>
          {selected !== null && <div className="result-message">{selected}</div>}
        </>
      )}
      {stage !== 'wheel' && overlay()}
    </section>
  );
};

export default WheelPage;
