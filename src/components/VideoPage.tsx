import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * A simple video player page that plays a local video file.  The
 * controls are provided by the native HTML5 video element.  The
 * surrounding page uses the shared styling classes defined in the
 * theme.
 */
const VideoPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="tool-page">
      <button className="back-button" onClick={() => navigate('/tools')}>← Back</button>
      <h1 className="neon-title">Video Player</h1>
      <div className="page-content">
        <video className="media" controls>
          <source src="/video/sample.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default VideoPage;