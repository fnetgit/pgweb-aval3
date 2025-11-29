import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { CountryDetails } from "./pages/CountryDetails";
import { AboutTeam } from "./pages/AboutTeam";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route path="/about" element={<AboutTeam />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
