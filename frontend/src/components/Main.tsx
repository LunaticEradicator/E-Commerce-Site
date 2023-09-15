import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main>
      <Outlet />
      {/* </div> */}
      {/* Outlet elements => to render their child route elements*/}
      {/* <HomeScreen /> */}
      {/* <ProductScreen /> */}
      {/* etc.... */}
    </main>
  );
}
