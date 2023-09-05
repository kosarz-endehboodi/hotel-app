import { useEffect } from "react";

export default function OutsideClicl(ref, execptionId, cb) {
    useEffect(() => {

        function handlerOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target) && event.target.id !== execptionId) {
                cb();
            }

        }


        document.addEventListener("mousedown", handlerOutsideClick)
        return () => {
            document.removeEventListener("mousedown", handlerOutsideClick)
        }

    }, [ref, execptionId, cb])





}