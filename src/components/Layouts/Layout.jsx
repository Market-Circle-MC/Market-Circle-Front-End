// import Footer from "./components/Layouts/Footer";
import Footer from "../../components/Layouts/Footer";
import Header from "../../components/Layouts/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
