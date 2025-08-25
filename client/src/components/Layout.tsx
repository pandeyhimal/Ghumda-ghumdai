import {Header} from "@/components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="">
        <Outlet /> {/* child route renders here */}
      </main>
    </>
  );
};

export default Layout;
