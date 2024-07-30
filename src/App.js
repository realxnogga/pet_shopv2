
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AdminLogin } from "./page/admin/adminlogin";
import { AdminMainPage } from "./page/admin/adminmainpage";
import { CustomToastContainer } from "./component/admin/toaster";
import { ClientLogin } from "./page/client/clientlogin";
import { ClientRegister } from "./page/client/clientregister";
import { Page404 } from "./page/client/page404";
import { useClientLogin } from "./store/client/clientloginstore";
import { SendEmail } from "./page/client/sendemail";
import { ChangePassword } from "./page/client/changepassword";
import { ClientNavbar } from "./component/client/clientnavbar";
import { ClientSidebar } from "./component/client/clientsidebar";
import { ClientHome } from "./page/client/clienthome";
import { ClientYourOrder } from "./page/client/clientyourorder";
import { ClientCart } from "./page/client/clientcart";
import { ViewProduct } from "./page/client/viewproduct";

export const App = () => {
  const returnedLoginData = useClientLogin(state => state.returnedLoginData);

  const ConditionalRender = () => {
    const location = useLocation();
    const clientRoute = ['/home', '/order', '/cart'].includes(location.pathname);
      return (
        <>
           {clientRoute && <ClientNavbar />}
           {clientRoute && <ClientSidebar />}
        </>
      );
  };

  return (
    <>
      <Router>

        <CustomToastContainer /> {/* for toast */}
        {returnedLoginData.isrouteprotected && <ConditionalRender />} {/* display this only if login success */}

        <Routes>
          {/* admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/mainpage" element={<AdminMainPage />} />
          {/* client */}
          <Route path="/" element={<ClientLogin />} />
          <Route path="/register" element={<ClientRegister />} />
          <Route path="/sendemail" element={<SendEmail />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="*" element={<Page404 />} />
          {
            returnedLoginData.isrouteprotected ?    
                <>
                  <Route path="/home" element={<ClientHome />} />
                  <Route path="/order" element={<ClientYourOrder />} />
                  <Route path="/cart" element={<ClientCart />} />
                  <Route path="/viewproduct" element={<ViewProduct />} />
                </>   
              :  
                <>
                  <Route path="/home" element={<Page404 />} />
                  <Route path="/order" element={<Page404 />} />
                  <Route path="/cart" element={<Page404 />} />
                  <Route path="/viewproduct" element={<Page404 />} />
                </>      
          }
        </Routes>
      </Router>
    </>
  );
}

