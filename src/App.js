import "./styles/styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Organization from "./components/Organization";
import Report from "./components/Report";
import Search from "./components/Search";
import Upload from "./components/Upload";
import Detail1 from "./components/Detail1";
import Detail2 from "./components/Detail2";
import Footer from "./components/Footer";
import Branch from "./components/Branch";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/organization/:organizationID" element={<Branch />} />
        <Route path="/detail1" element={<Detail1 />} />
        <Route path="/detail2" element={<Detail2 />} />
        <Route path="/search" element={<Search />} />
        <Route path="/report" element={<Report />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
