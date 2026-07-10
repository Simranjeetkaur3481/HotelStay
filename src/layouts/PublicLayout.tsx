import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
