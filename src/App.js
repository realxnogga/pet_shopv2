
import { Store } from "./store";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLogin } from "./page/admin/adminlogin";
import { AdminMainPage } from "./page/admin/adminmainpage";
import { CustomToastContainer } from "./component/admin/toaster";
import { ClientLogin } from "./page/client/clientlogin";
import { ClientRegister } from "./page/client/clientregister";
import { ClientMainPage } from "./page/client/clientmainpage";
import { Page404 } from "./page/client/page404";
import { isRouteProtectedTemp } from "./feature/client/clientloginSlice";

function WrapperApp() {

  const isRouteProtected = useSelector(isRouteProtectedTemp);

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/mainpage" element={<AdminMainPage />} />
        <Route path="/" element={<ClientLogin />} />
        <Route path="/register" element={<ClientRegister />} />
        <Route path="*" element={<Page404 />} />
        {
          isRouteProtected ?
            (
              <Route path="/mainpage" element={<ClientMainPage />} />
            )
            :
            (
              <Route path="/mainpage" element={<Page404 />} />
            )
        }
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
