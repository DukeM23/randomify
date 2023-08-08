import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RootLayout() {
  return (
    <div className="container mx-auto sm:flex flex-col h-4/6 sm:min-h-screen">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}
