import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../context/BookmarkListProvider";
export default function bookMarkLayout() {
  const{bookmarks}= useBookmark();
    return (
        <div className="appLayout">
            <div className="sidebar">
                <Outlet />
            </div>
            <Map markerLocation={bookmarks} />
        </div>
    )
}
//state bookmarks >global