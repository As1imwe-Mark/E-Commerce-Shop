/* eslint-disable react/prop-types */
// Layout.js
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
