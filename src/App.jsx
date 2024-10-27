// import CartPage from "./components/Cart"
import Footer from "./components/Footer"
// import Hero from "./components/Hero"
import Nav from "./components/Nav"
// import Product from "./components/Product"


// const App = () => {
//   return (
//     <div className="bg-gray-100 h-screen">
//       
//      <Hero />
//      <Product />
//      <CartPage />
//      <Footer />
//     </div>
//   )
// }

// export default App


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import CategoryPage from "./components/Category";
import ViewAllCategoryPage from "./components/viewCategory";
import Shop from "./components/Shop";
import CartPage from "./components/Cart";
import TopSeller from "./components/TopSellers";
import NewArrivals from "./components/NewArrivals";

const App = () => {
  return (
    <div className="flex flex-col justify-between">
  <Router>
  <Nav />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/" element={<Shop />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/view-all/:status" element={<ViewAllCategoryPage />} />
        <Route path="/top-seller" element={<TopSeller />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
};

export default App;
