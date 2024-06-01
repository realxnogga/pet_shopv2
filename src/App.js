
import { Store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLogin } from "./page/admin/adminlogin";
import { AdminMainPage } from "./page/admin/adminmainpage";
import { CustomToastContainer } from "./component/admin/toaster";
import { ClientLogin } from "./page/client/clientlogin";
import { ClientRegister } from "./page/client/clientregister";
import { ClientMainPage } from "./page/client/clientmainpage";

function WrapperApp() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/mainpage" element={<AdminMainPage />} />
        <Route path="/" element={<ClientLogin />} />
        <Route path="/register" element={<ClientRegister />} />    
        <Route path="/mainpage" element={<ClientMainPage />} />

      </Routes>
    </Router>
  );
}

export const App = () => (
  <Provider store={Store}>
    <WrapperApp />
    <CustomToastContainer />
  </Provider>
);
