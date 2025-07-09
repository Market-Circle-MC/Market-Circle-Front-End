import "./App.css";
import Footer from "./components/Layouts/Footer";
import Header from "./components/Layouts/Header";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
