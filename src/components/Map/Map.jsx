import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
// import { useHotels } from "../context/HotelsProvider"
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

export default function Map({markerLocation}) {

    // const { loading, Hotels } = useHotels();
    const [mapCenter, setMapCenter] = useState([51, 6]);
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const { loading: loadgeoLoc, position: getLocPosGeo, GetPosition } = useGeoLocation();
    useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng]);

    }, [lat, lng])

    useEffect(() => {
        if (getLocPosGeo?.lat && getLocPosGeo?.lng)
            setMapCenter([getLocPosGeo.lat, getLocPosGeo.lng])
    }, [getLocPosGeo])

    return (
        <div className="mapContainer">
            <MapContainer className="map"
                center={[lat || 50, lng || 6]}
                zoom={13}
                scrollWheelZoom={false}>
                <button onClick={GetPosition} className="getLocation">
                    {loadgeoLoc ? "loading ..." : "use your Location"}
                </button>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <DetectClick />
                <ChangeCenter position={mapCenter} />
                {markerLocation.map((item) => (
                    <Marker key={item.id} position={[item.latitude, item.longitude]}>
                        <Popup>
                            {item.host_location}
                        </Popup>
                    </Marker>
                ))
                }

            </MapContainer>
        </div>
    )
}




function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}


function DetectClick() {
    const navigate = useNavigate()
    useMapEvent({
        click: e => navigate(`/bookmark/Add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
    return null;
}