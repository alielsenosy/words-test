import "./App.css";
import Test from "./pages/Test";
import Rank from "./pages/Rank";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/rank" element={<Rank />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
