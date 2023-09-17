import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkListProvider";
import Loaderitem from "../Loader/LoaderForItem/LoaderForItem";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
export default function BookMark() {
    const { loadingBookmarkCurr, bookmarks, deleteBookmark, currentBookmark } = useBookmark()
    const handleDelete = async (e, id) => {
        e.preventDefault();
        await deleteBookmark(id);
    }

    if (loadingBookmarkCurr) return <Loaderitem />
    if (!bookmarks.length) return <p>there is no bookmarked location</p>;
 
    return (
        <div>

            <h2> bookmark List</h2>
            <div className="bookmarkList  ">

                {
                    bookmarks.map((item) => {
                        return (
                            <Link key={item.id} to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                                <div key={item.id}
                                    className={`bookmarkItem ${item.id === currentBookmark?.id ? "current-bookmark" : ""}`}>
                                    <ReactCountryFlag svg countryCode={item.countryCode} />

                                    &nbsp; <strong>{item.cityName}</strong>
                                    &nbsp;<span>{item.country}</span>
                                    <button onClick={(e) => handleDelete(e, item.id)}>
                                        <HiTrash className="trash" />
                                    </button>
                                </div>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    )
}