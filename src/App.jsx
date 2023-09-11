
import { Toaster } from "react-hot-toast"
import "./App.css";
import Header from "./components/header/header";
import LocationList from "./components/loccationList/LocationList"
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels"
import HotelProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/singleHotel/singleHotel";
import BookMarkLayout from "./components/BookMarkLayout/BookMarkLayout";
import BookmarkListProvider from "./components/context/BookmarkListProvider";
function App() {
  return (
    <BookmarkListProvider>
    <HotelProvider>
      <div className="container">
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookMarkLayout />}>
            <Route index element={<div>book list</div>} />
            <Route path="Add" element={<div>book list add new</div>} />
          </Route >
        </Routes>

        {/* <LocationList /> */}
      </div>
    </HotelProvider>
    </BookmarkListProvider>
  )
}

export default App;
// /hotels
// / index
// /:id

//bookmark
//list of bookmark
//bookmark roue nav
//bookmark /add
//state bookmarklist