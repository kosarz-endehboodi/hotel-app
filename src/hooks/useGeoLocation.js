
import { useState } from "react";

export default function useGeoLocation() {

    const [loading, setLoading] = useState(false);
    const [position, setposition] = useState({});
    const [error, setError] = useState(null);

    function GetPosition() {
        if (!navigator.geolocation)
            return setError(" your browser does not support geo location!")
      
            navigator.geolocation.getCurrentPosition((pos) => {
            setLoading(true)
            setposition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            });
            setLoading(false)
        }, (error) => {
            setError(error.message)
            setLoading(false)
        })
    }

    return { loading, error, position, GetPosition }
}
