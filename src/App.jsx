import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Stage1 from './components/stage1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stage1" element={<Stage1 />} />
      </Routes>
    </Router>
  );
}

export default App;
