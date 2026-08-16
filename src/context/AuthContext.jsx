import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../config/supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

    const loginUser = async (email, password) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) {
                console.error(error);
                return {success: false, error: error};
            }
            return {success: true, data}
        } catch (error) {
            console.error(error);
        }

    }


    const logoutUser = () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.error(error);
            return {success: false, error: error}
        }
    }

    return (
        <AuthContext.Provider value={{session, logoutUser, loginUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export const UserAuth = () => {

    return useContext(AuthContext);
}