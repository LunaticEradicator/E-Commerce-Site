import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main>
      {/* Outlet elements => to render their child route elements*/}
      {/* <HomeScreen /> */}
      {/* <ProductScreen /> */}
      {/* etc.... */}
      <Outlet />
    </main>
  );
}
