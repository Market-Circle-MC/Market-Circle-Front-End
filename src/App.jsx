import "./App.css";
import Footer from "./components/Layouts/Footer";
import Header from "./components/Layouts/Header";
import { Outlet } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
  import { ToastContainer, toast } from 'react-toastify';


function App() {

  return (
    <AuthProvider>
      <ToastContainer />
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
