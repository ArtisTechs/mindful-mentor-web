import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/_variables.css";
import "./styles/_globalStyles.css";
import LoginPage from "./pages/login/login-page";

function App() {
  return (
    <div className="app">
      <header className="app-header"></header>
      <body className="app-body">
        <LoginPage />
      </body>
      <footer className="app-footer"></footer>
    </div>
  );
}

export default App;
