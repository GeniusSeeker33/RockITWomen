import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './pages/Quiz';
import RockITWomenMint from './pages/RockITWomenMint';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 text-white p-6">
        <nav className="mb-6 space-x-4 text-lg">
          <Link to="/quiz" className="hover:underline">🎓 Quiz</Link>
          <Link to="/mint" className="hover:underline">🎟️ Mint Badge</Link>
        </nav>

        <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/mint" element={<RockITWomenMint />} />
        </Routes>
      </div>
    </Router>
  );
}




