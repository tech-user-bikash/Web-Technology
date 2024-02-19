import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null
}

// used for track the authentication 
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            state.status = true;
            state.userData = action.payload.action;
        },
        logout: (state)=>{
            state.status = false,
            state.userData = null;
        }
        // TODO: we can use create post as well
    }
});

export const{login, logout} = authSlice.actions;

export default authSlice.reducer;