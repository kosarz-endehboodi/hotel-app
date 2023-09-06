import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const HotelContext = createContext();
export default function HotelProvider({ children }) {

    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room;
    const { loading, data:Hotels } = useFetch(
        "http://localhost:5000/hotels",
        `q=${destination || ""}&accommodates_gte=${room || 1}`
    );

    return (
        <HotelContext.Provider value={{loading,Hotels}}>
            {children}
        </HotelContext.Provider>
    );
}

export function useHotels() {
    return (
        useContext(HotelContext)
    )
}