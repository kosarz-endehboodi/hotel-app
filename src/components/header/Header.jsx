
import { MdLocationOn } from "react-icons/md"
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi"
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClicks";
export default function Header() {
    //use for search
    const [destination, setdestination] = useState();
    //use for dropdown
    const [openOption, setopenoptions] = useState(false);
    //set use for select  counter & change numbers
    const [options, setOption] = useState({ adult: 1, children: 0, room: 2, });


    // function handler for +||-
    const handlerOption = (name, operation) => {
        // JSON.parse(localStorage.getItem("number"))
        //callback for number
        setOption((prev) => {
            return {
                ...prev,
                // name===type in OptionItem compnt
                [name]: operation === "inc" ? options[name] + 1 : options[name] - 1

            }
        })

        // localStorage.setItem("number", JSON.stringify(options))
    }


    return (
        <div className="Header">
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <MdLocationOn className="headerIcon locationIcon" />
                    <input
                        value={destination}
                        onChange={(e) => setdestination(e.target.value)}
                        id="destination"
                        className="headerSearchInput"
                        type="text"
                        placeholder="where to go?" />
                    <span className="seperator"></span>
                </div>

                <div className="headerSearchItem">
                    <HiCalendar className="headerIcon dateIcon" />
                    <div className="dateDropDown">2023/12/3</div>
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <div id="optionDropDwon" onClick={() => setopenoptions(!openOption)}>

                        {options.adult} adult &bull;{options.children}.children  &bull; {options.room}room
                    </div>
                    {openOption && <GuestOptionList setopenoptions={setopenoptions} handlerOption={handlerOption} options={options} />}
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <button className="headerSearchBtn">
                        <HiSearch className="headerIcon" />
                    </button>
                </div>
            </div>
        </div>
    );


}
function GuestOptionList({ setopenoptions, options, handlerOption }) {
    const optionsRef = useRef();
    useOutsideClick(optionsRef, () => setopenoptions(false));
    return (
        <div className="guestOptions">
            <OptionItem handlerOption={handlerOption} type="adult" options={options} minlimit={1} />
            <OptionItem handlerOption={handlerOption} type="children" options={options} minlimit={0} />
            <OptionItem handlerOption={handlerOption} type="room" options={options} minlimit={1} />
        </div>
    )
}
function OptionItem({ type, options, minlimit, handlerOption }) {
    return (
        <div className="guestOptionItem">
            <span className="optionText">{type}</span>
            <div className="optionCounter">
                <button className="optionCounterBtn"
                    onClick={() => handlerOption(type, "dec")}
                    disabled={options[type] <= minlimit} >
                    <HiMinus className="headerIcon" />
                </button>
                <span className="optionCounterNumber" >{options[type]}</span>
                <button
                    onClick={() => handlerOption(type, "inc")}
                    className="optionCounterBtn"><HiPlus className="headerIcon" /></button>
            </div>
        </div>
    )
}