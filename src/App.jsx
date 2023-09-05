
import { Toaster } from "react-hot-toast"
import "./App.css";
import Header from "./components/header/Header";
import LocationList from "./components/loccationList/LocationList"
import { Route, Routes } from "react-router-dom";
function App() {
  return (<div>
    <div className="container">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route />
      </Routes>
      {/* <LocationList /> */}
    </div>
  </div>
  )
}

export default App;

