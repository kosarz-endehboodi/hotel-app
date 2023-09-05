
import { Toaster } from "react-hot-toast"
import "./App.css";
import Header from "./components/header/Header";
import LocationList from "./components/loccationList/LocationList"
function App() {
  return (<div>
    <div className="container">
      <Toaster />
      <Header />
      <LocationList />
    </div>
  </div>
  )
}

export default App;

