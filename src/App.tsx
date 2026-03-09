import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Landing from './pages/Landing';
import Prediction from './pages/Prediction';
import Calculators from './pages/Calculators';
import Education from './pages/Education';
import Chatbot from './pages/Chatbot';
import FoodScanner from './pages/FoodScanner';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<MainLayout />}>
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/education" element={<Education />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/food-scanner" element={<FoodScanner />} />
        </Route>
      </Routes>
    </Router>
  );
}
