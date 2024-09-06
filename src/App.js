import "./App.css";
import ProductList from "./components/ProductList";
import Logo from "./logo.svg";

function App() {
  return (
    <div className="app-container">
      <div className="navbar">
        <img src={Logo} className="monk-logo" alt="Monk Commerce" />
        <span className="title">Monk Upsell & Cross-sell</span>
      </div>
      <div className="app-content">
        <ProductList />
      </div>
    </div>
  );
}

export default App;
