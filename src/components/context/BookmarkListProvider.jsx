import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
const bookMarkContext = createContext();
export default function BookMarkContext({ children }) {
    const [currentBookMark, setcurrentBookMark] = useState({});
    const [loadingBookmarkCurr, setLoadingBookmarkCurr] = useState(false);
    const base_url = "http://localhost:5000";

    const { loading, data: bookmarks } = useFetch(`${base_url}/bookmarks`);

    async function GetBookmark(id) {
        setLoadingBookmarkCurr(true)
        try {
            const { bookmarks } = await axios.get(`${base_url}/bookmarks/${id}`)
            setcurrentBookMark(bookmarks)
            setLoadingBookmarkCurr(false)
        } catch (error) {
            toast.error(error.message)
            setLoadingBookmarkCurr(false)
        }
    }

    return (
        <bookMarkContext.Provider
            value={{
                loading,
                bookmarks,
                GetBookmark,
                currentBookMark,
                loadingBookmarkCurr
            }}>
            {children}
        </bookMarkContext.Provider>
    );
}

export function useBookmark() {
    return (
        useContext(bookMarkContext)
    )
}