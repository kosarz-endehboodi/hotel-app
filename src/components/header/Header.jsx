
import { MdLocationOn } from "react-icons/md"
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi"
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRange } from "react-date-range"
import { format } from "date-fns";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";





export default function Header() {
    //use for search
    const [destination, setdestination] = useState();
    //use for dropdown
    const [openOption, setopenoptions] = useState(false);
    //set use for select  counter & change numbers
    const [options, setOption] = useState({ adult: 1, children: 0, room: 2, });
    //use for date selections
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        }
    ]);
    //set open calendar
    const [openDate, setOpenDate] = useState(false)
    //nav for search 
    // const navigator = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()

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

    const handlerSearch = () => {
        const encodedParams = createSearchParams({
            date: JSON.stringify(date)
            , options: JSON.stringify(options),
            destination
        })
        setSearchParams(encodedParams)
        //note=>  set search params (encodedparams)
        navigator({
            pathname: "hotels",
            search: encodedParams.toString(),
        });
    }


    //set costumhook for open and close calendar===>when anywhere clicked  
    const optionsDateRef = useRef();
    useOutsideClick(optionsDateRef, "optionDropDwon", () => setOpenDate(false));
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
                    <div onClick={() => setOpenDate(!openDate)} className="dateDropDown" >
                        {`${format(date[0].startDate, "MM/dd/yy")}to ${format(date[0].endDate, "MM/dd/yy")}`}</div>
                    {
                        openDate && <div ref={optionsDateRef}> <DateRange onChange={item => setDate([item.selection])}
                            className="date"
                            ranges={date}
                            minDate={new Date()}
                            moveRangeOnFirstSelection={true}
                        /></div>
                    }
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
                    <button className="headerSearchBtn" onClick={handlerSearch}>
                        <HiSearch className="headerIcon" />
                    </button>
                </div>
            </div>
        </div>
    );


}
function GuestOptionList({ setopenoptions, options, handlerOption }) {
    const optionsRef = useRef();
    useOutsideClick(optionsRef, "optionDropDwon", () => setopenoptions(false));
    return (
        <div className="guestOptions" ref={optionsRef}>
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