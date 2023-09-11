import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
const HotelContext = createContext();
export default function HotelProvider({ children }) {
    const [currentHotel, setcurrentHotel] = useState({});
    const [loadingHotelCurr, setLoadingHotelCurr] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room;
    const base_url = "http://localhost:5000/hotels";


    const { loading, data: Hotels } = useFetch(
        base_url,
        `q=${destination || ""}&accommodates_gte=${room || 1}`
    );
    async function GetHotel(id) {
        setLoadingHotelCurr(true)
        try {
            const { data } = await axios.get(`${base_url}/${id}`)
            setcurrentHotel(data)
            setLoadingHotelCurr(false)
        } catch (error) {
            toast.error(error.message)
            setLoadingHotelCurr(false)
        }
    }

    return (
        <HotelContext.Provider value={{ loading, Hotels, GetHotel, currentHotel, loadingHotelCurr }}>
            {children}
        </HotelContext.Provider>
    );
}

export function useHotels() {
    return (
        useContext(HotelContext)
    )
}