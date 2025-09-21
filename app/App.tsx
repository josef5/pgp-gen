import { HashRouter, Route, Routes } from "react-router";
import "./app.css";
import Generate from "./routes/generate";
import Decrypt from "./routes/decrypt";
import Encrypt from "./routes/encrypt";
import NotFound from "./routes/404";
import NavBar from "./components/nav-bar";

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Generate />} />
            <Route path="/decrypt" element={<Decrypt />} />
            <Route path="/encrypt" element={<Encrypt />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
