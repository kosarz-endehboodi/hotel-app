import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkListProvider";
import Loaderitem from "../Loader/LoaderForItem/LoaderForItem";
import { Link } from "react-router-dom";

export default function BookMark() {
    const { loadingBookmarkCurr, bookmarks, currentBookmark } = useBookmark()
    if (loadingBookmarkCurr) return <Loaderitem />
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
                                </div>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    )
}