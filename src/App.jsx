import "./App.css";
import Footer from "./components/Layouts/Footer";
import Header from "./components/Layouts/Header";
import { Outlet } from "react-router-dom";
import HeroBanner from "./components/Layouts/HeroBanner";

function App() {
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

export default App;
