
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from './components/Landing';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Video" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App