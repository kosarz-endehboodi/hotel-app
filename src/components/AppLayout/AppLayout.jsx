import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../context/HotelsProvider";

export default function () {


    const { Hotels } = useHotels()
    return (
        <div className="appLayout">
            <div className="sidebar"> <Outlet /></div>
            <Map className="map" markerLocation={Hotels} />
        </div>
    )
}