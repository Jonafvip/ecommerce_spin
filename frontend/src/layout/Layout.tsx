import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <Header />
      <div className="w-full">
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
