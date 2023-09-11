
import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import LoaderForItem from '../Loader/LoaderForItem/LoaderForItem'
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";
export default function singleHotel() {
    const { id } = useParams();
    // const { data, loading } = useFetch(`http://localhost:5000/hotels/${id}`)
    const { GetHotel, loadingHotelCurr, currentHotel } = useHotels();

    useEffect(() => {
        GetHotel(id)

    },
        [id])
    if (loadingHotelCurr) return <LoaderForItem />
    return (
        <div className="room">
            <div className="roomDetail">
                <h2>{currentHotel.name}</h2>
                <div>
                    {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
                </div>
                <img className="imgSingle" src="https://a0.muscache.com/im/pictures/eb9e20e1-9c88-43fb-9e0a-e634dfc6e35a.jpg?aki_policy=x_large" alt={currentHotel.name} />
            </div>
        </div>

    );
}