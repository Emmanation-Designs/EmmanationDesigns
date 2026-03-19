import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Frontend from '@/pages/Frontend';
import Backend from '@/pages/Backend';
import GraphicDesign from '@/pages/GraphicDesign';
import UIDesign from '@/pages/UIDesign';
import VideoEditing from '@/pages/VideoEditing';
import ScrollToTop from '@/components/ScrollToTop';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/frontend" element={<Frontend />} />
          <Route path="/backend" element={<Backend />} />
          <Route path="/graphic-design" element={<GraphicDesign />} />
          <Route path="/ui-design" element={<UIDesign />} />
          <Route path="/video-editing" element={<VideoEditing />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
