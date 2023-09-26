import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './screens/home';

function App() {
  return (
    <div class="">
     <BrowserRouter>
     <Routes>
      <Route exact path='/' element={<Home />} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
