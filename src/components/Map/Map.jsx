import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useHotels } from "../context/HotelsProvider"
import { useState } from "react";

export default function Map() {

    const { loading, Hotels } = useHotels();
    const [mapCenter, setMapCenter] = useState([51, 6]);
    return (
        <div className="mapContainer">
            <MapContainer className="map"
                center={mapCenter}
                zoom={13}
                scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {Hotels.map((item) => (
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