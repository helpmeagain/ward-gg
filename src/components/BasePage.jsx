import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";

function BasePage() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header isHomePage={isHomePage} />
      <Outlet />
    </div>
  );
}

export default BasePage;
