import Header from "./components/Header"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Brands from "./pages/Brands"
import BrandsPage from "./pages/Brands/BrandsPage"
import ProductDetails from "./pages/ProductDetails"
import Orders from "./pages/Orders"
import Addresses from "./pages/Addresses/Addresses"
import Shopping from "./pages/Shopping"
import Favorites from "./pages/Favorites"
import Category from "./pages/Category"
import { useState } from "react";
import MarketCategories from "./pages/Markets/MarketCategories";
import Markets from "./pages/Markets/Markets";
import Search from "./components/Header/Search";
import BrandCollectionPage from "./pages/Brands/BrandCollectionPage";

function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
        <Route path="/brands/:id" element={<Brands />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Addresses" element={<Addresses />} />
        <Route path="/Shopping" element={<Shopping />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/BrandsPage/:id" element={<BrandsPage />}/>
        <Route path="/Markets/Categories" element={<MarketCategories />} />
        <Route path="/Markets" element={<Markets />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/collections/:type" element={<BrandCollectionPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
