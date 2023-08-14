import "./sass/style.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
