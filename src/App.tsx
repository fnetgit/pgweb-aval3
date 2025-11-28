import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { CountryDetails } from "./pages/CountryDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
