import { Link } from "react-router-dom";

// import Loader from "../Loader/Loader"
import LoaderForItem from "../Loader/LoaderForItem/LoaderForItem";
import { useHotels } from "../context/HotelsProvider";
export default function Hotels() {

    const { loading, Hotels, currentHotel } = useHotels();

    if (loading) {
        return <div className="searchList"><LoaderForItem /></div>
    }
    return (
        <div className="searchList">
            <h2>Search Results{Hotels.length}</h2>
            {
                Hotels.map((item) => {
                    return (
                        <Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`} >
                            <div className={`searchItem ${item.id === currentHotel?.id ?
                                "current-hotel" : " "}`}>
                                <img src={item.picture_url.url} alt={item.name} />
                                <div className="searchitemDesc">
                                    <p className="location">{item.smart_location}</p>
                                    <p className="name">{item.name}</p>
                                    <p className="price">
                                        &nbsp;€ {item.price} &nbsp;
                                        <span>night</span>
                                    </p>
                                </div>
                            </div>

                        </Link>
                    )
                })
            }
        </div>
    )
}