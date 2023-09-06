
import { Toaster } from "react-hot-toast"
import "./App.css";
import Header from "./components/header/header";
import LocationList from "./components/loccationList/LocationList"
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from"./components/Hotels/Hotels"
import HotelProvider from "./components/context/HotelsProvider";
function App() {
  return (
  <HotelProvider>
    <div className="container">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout/>}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<div>single hotel</div>}/>
            </Route>
      </Routes>

      {/* <LocationList /> */}
    </div>
 </HotelProvider>
  )
}

export default App;
// /hotels 
// / index 
// /:id

