import { useNavigate } from "react-router-dom"
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loaderitem from "../Loader/LoaderForItem/LoaderForItem";
import ReactCountryFlag from "react-country-flag";

export default function AddBookmark() {

    function getFlagEmoji(countryCode) {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }



    //form => cityname country,...
    // lat&lng=>url=>fetch api based on lat &lng=> get location data!!
    const [lat, lng] = useUrlLocation()
    const navigate = useNavigate();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [countrycode, setCountryCode] = useState("");
    const [loadGeo, setLoadGeo] = useState(false);
    const [errorGeoCoded, setErrorGeoCoded] = useState(null);
    const baseUrlGeo = `https://api.bigdatacloud.net/data/reverse-geocode-client`

    useEffect(() => {
        if (!lat || !lng) return;
        async function fetchgetLocation() {
            setLoadGeo(true)
            setErrorGeoCoded(null)
            try {
                const { data } = await axios.get(`${baseUrlGeo}?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
                if (!data.countryCode) throw Error("this location is not a city !please click somewhere else.")
                setCityName(data.city || data.locality || "")
                setCountry(data.countryName)
                setCountryCode(getFlagEmoji(data.countryCode))

            } catch (error) {
                setErrorGeoCoded(error.message)
            } finally {
                setLoadGeo(false)
            }
        }
        fetchgetLocation();
    }, [lat, lng])





    if (loadGeo) return <Loaderitem />
    if (errorGeoCoded) return <p>{errorGeoCoded}</p>
    return (
        <div>
            <h2>bookmark new location</h2>
            <form action="" className="form">
                <div className="formControl">
                    <label htmlFor="cityName">CityName</label>
                    <input value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        type="text"
                        name="cityName"
                        id="cityName" />
                </div>
                <div className="formControl">
                    <label htmlFor="Country">Country</label>
                    <input value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text"
                        name="Country"
                        id="Country" />
                    {/* <ReactCountryFlag svg className="flag" countryCode={countrycode} /> */}
                    <span className="flag"> {countrycode}</span>
                </div>
                <div className="buttons">
                    <button className="btn btn--back"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}> &larr;Back </button>
                    <button className="btn btn--primary"> Add </button>
                </div>
            </form>
        </div>
    )
}