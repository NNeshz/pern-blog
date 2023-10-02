import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axios.js"

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        erros: [],
        isAuthenticated: false,
        // Cambiar el valor *false >>> true* cuando tengamos el inicio de sesion
        isLoading: false,
    },
    reducers: {
        signin: (state) => {
            state.isLoading = true;
            // create a request to the backend in the port 3000 with axios
            const signInRequest = (data) => axios.post('/signin', data)
            console.log(signInRequest)
        }
    }
})

export default authSlice.reducer;