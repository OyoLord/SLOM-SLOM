import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SelectionPage from './components/SelectionPage';
import WheelPage from './components/WheelPage';
import AudioPage from './components/AudioPage';
import VideoPage from './components/VideoPage';
import PdfPage from './components/PdfPage';

/**
 * App is the top level component containing all of the client side
 * routes.  Each route corresponds to a page in the application.  The
 * order of the routes is not important due to how react‑router
 * matches.  Additional tools or pages can be added here easily.
 */
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tools" element={<SelectionPage />} />
      <Route path="/tools/wheel" element={<WheelPage />} />
      <Route path="/tools/audio" element={<AudioPage />} />
      <Route path="/tools/video" element={<VideoPage />} />
      <Route path="/tools/pdf" element={<PdfPage />} />
    </Routes>
  );
};

export default App;