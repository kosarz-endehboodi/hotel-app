import { useParams } from "react-router-dom"
import { useBookmark } from "../context/BookmarkListProvider"
import { useEffect } from "react"
import Loaderitem from "../Loader/LoaderForItem/LoaderForItem"
import ReactCountryFlag from "react-country-flag";



function SingleBookmark() {
    const { id } = useParams();
    // const navigate = useNavigate();
    const { GetBookmark, loadingBookmarkCurr, currentBookmark } = useBookmark();
    useEffect(() => {
        GetBookmark(id);
    }, [id]);
  
    if (loadingBookmarkCurr || !currentBookmark) return <Loaderitem />;
    return (
        <div className="currentBookmark">
            <button onClick={() => navigate(-1)} className="btn btn--back">
                &larr; Back
            </button>
            <h2>{currentBookmark.cityName}</h2>
            <div className={`bookmarkItem`}>
                <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
                &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
                <span>{currentBookmark.country}</span>
            </div>
        </div>
    );
}
export default SingleBookmark;