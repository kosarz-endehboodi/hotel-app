import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAthenticated: false,
}

function AuthReducer(state, action) {
    switch (action.type) {
        case "login": return {
            user: action.payload,
            isAthenticated: true,
        };
        case "logout": return {
            user: null,
            isAthenticated: false,
        };
        default: throw new Error("unknow actions")

    }
}
const Fake_user = {
    names: "saheb",
    email: "user@gmail.com",
    password: "1234",

}
export default function AuthContextProvider({ children }) {

    const [{ user, isAthenticated }, dispatch] = useReducer(
        AuthReducer, initialState)

    function login(email, password) {
        if (email === Fake_user.email && password === Fake_user.password)
            dispatch({ type: "login", payload: Fake_user })
    }
    function logout() {
        dispatch({ type: "logout" })
    }

    return (<AuthContext.Provider
        value={{
            user,
            isAthenticated,
            login,
            logout,
        }}
    >{children}
    </AuthContext.Provider>
    )
}
export function useAuth() {
    return useContext(AuthContext)
}