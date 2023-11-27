import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/home';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route exact path="/e_mart" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
