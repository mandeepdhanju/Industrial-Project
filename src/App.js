import "./styles/styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Organization from "./components/Organization";
import Report from "./components/Report";
import Search from "./components/Search";
import Upload from "./components/Upload";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Branch from "./components/Branch";
import Community from "./components/Community";
import EmployeeCount from "./components/EmployeeCount";
import Dropdown from "./components/Dropdown";
import Category from "./components/Category";
import SubCategory from "./components/SubCategory";
import Uploadws from "./components/Uploadws";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Organization />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/organization/:organizationID" element={<Branch />} />
        <Route
          path="/organization/:organizationID/:branchID"
          element={<Contact />}
        />

        <Route path="/dropdown" element={<Dropdown />} />
        <Route path="/community" element={<Community />} />
        <Route path="/employeeCount" element={<EmployeeCount />} />
        {/* <Route path="/employeeCount" element={<EmployeeCount />} /> */}
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryID" element={<SubCategory />} />

        <Route path="/search" element={<Search />} />
        <Route path="/report" element={<Report />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/uploadws" element={<Uploadws />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
