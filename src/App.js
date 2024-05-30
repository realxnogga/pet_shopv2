
import { Store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./admin/login";
import { AdminMainPage } from "./admin/adminmainpage";

function WrapperApp() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/mainpage" element={<AdminMainPage />} />
      </Routes>
    </Router>
  );
}

export const App = () => (
  <Provider store={Store}>
    <WrapperApp />
  </Provider>
);
