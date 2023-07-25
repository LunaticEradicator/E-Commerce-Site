// import HomeScreen from "/../screens/HomeScreen";
import "../sass/components/main.scss";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main>
      {/* <HomeScreen /> */}
      <Outlet />
    </main>
  );
}
