
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";

export const ClientLoginSlice = createSlice({
    name: 'ClientLoginSliceName',
    initialState: {
        isClientLoggedIn: null,
        isRouteProtected: null,
        userData: [],
    },
    reducers: {
        clearIsClientLoggedIn: (state) => {
            state.isClientLoggedIn = null;
        },
        clearIsRouteProtected: (state) => {
            state.isRouteProtected = null;
        },
        clearUserData: (state) => {
            state.userData = [];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(InsertLoginDataThunk.fulfilled, (state, action) => {
                state.isClientLoggedIn = action.payload;
                state.isRouteProtected = action.payload;
            })
            .addCase(GetLoginDataThunk.fulfilled, (state, action) => {
                state.userData = action.payload[0];
            })

    }
})

export const { clearIsClientLoggedIn, clearIsRouteProtected, clearUserData } = ClientLoginSlice.actions;
export const userDataTemp = state => state.ClientLoginSliceName.userData;
export const isRouteProtectedTemp = state => state.ClientLoginSliceName.isRouteProtected;
export const isClientLoggedInTemp = state => state.ClientLoginSliceName.isClientLoggedIn;
export const ClientLoginSliceReducer = ClientLoginSlice.reducer;

export const GetLoginDataThunk = createAsyncThunk(
    "ClientLoginSliceName/GetLoginDataThunk",
    async ({ loginDataTemp }) => {

        const formData = HelperFormDataFunction(loginDataTemp);

        return HelperThunkFunction('client/clientlogin.php?action=getLoginData', 'POST', formData, true);

    }
)

export const InsertLoginDataThunk = createAsyncThunk(
    "ClientLoginSliceName/InsertLoginDataThunk",
    async ({ loginDataTemp }) => {

        const formData = HelperFormDataFunction(loginDataTemp);

        return HelperThunkFunction('client/clientlogin.php?action=putLoginData', 'POST', formData, true);

    }
)