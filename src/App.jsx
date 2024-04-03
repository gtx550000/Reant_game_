import ButtonAppBar from "./components/navber/navber";
import Home from "./components/home/home";
import Profile from "./components/profile/profile";
import Error from "./components/error/error";
import Register from "./components/register_game/home";
import Report from "./components/report/report";
import Login from "./components/login/login";
import Categories from "./components/categorie/categories";
import Cart from "./components/cart/cart";

import Gamedetail from "./components/gamedetail/gamedetail";
import Slideshowgamedetail from "./components/slideshowgamedetail/slideshowgamedetail";
import { DataProvider } from "./components/contextprovider/provider";
import { DataRegProvider } from "./components/contextprovider/register_provider";
/*11/3/24*/ import Library from "./components/library/library";
/*13/3/24 */ import Payment from "./components/payment/paymenthome";
/*14/3/24 */ import Admain from "./components/admain/admain";

import Bill from "./components/bill/bill";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <DataProvider>
        <DataRegProvider>
          <div>
            <ButtonAppBar></ButtonAppBar>
            <Routes>
              <Route path="/" element={<Home />}></Route>

              <Route path="/home" element={<Home />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/library" element={<Library />}></Route>
              <Route path="*" element={<Error />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/report" element={<Report />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/categories/:category"
                element={<Categories />}
              ></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/bill" element={<Bill />}></Route>

              <Route path="/gamedetail/:id" element={<Gamedetail />}></Route>
              <Route
                path="/slideshowgamedetail"
                element={<Slideshowgamedetail />}
              ></Route>
              <Route path="/payment" element={<Payment />}></Route>
              <Route path="/admain" element={<Admain />}></Route>
            </Routes>
          </div>
        </DataRegProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
