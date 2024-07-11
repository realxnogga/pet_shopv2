

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const ResetPasswordSlice = createSlice({
    name: 'ResetPasswordSliceName',
    initialState: {
        isEmailSend: {bool: null, message: ''},
        isTokenMatch: null,
    },
    reducers: {
        clearIsEmailSend: (state) => {
            state.isEmailSend = {bool: null, message: ''};
        },
        clearIsTokenMatch: (state) => {
            state.isTokenMatch = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(SendTokenThunk.fulfilled, (state, action) => {
                state.isEmailSend = action.payload;
            })
            .addCase(VerifyTokenThunk.fulfilled, (state, action) => {
                state.isTokenMatch = action.payload;
            })
    }

})

export const isTokenMatchTemp = state => state.ResetPasswordSliceName.isTokenMatch;
export const isEmailSendTemp = state => state.ResetPasswordSliceName.isEmailSend;
export const { clearIsEmailSend, clearIsTokenMatch } = ResetPasswordSlice.actions;
export const ResetPasswordSliceReducer = ResetPasswordSlice.reducer;


export const SendTokenThunk = createAsyncThunk(
    "ResetPasswordSliceName/SendTokenThunk",
    async ({ emailtemp }) => {

        const formData = HelperFormDataFunction(emailtemp);

        return HelperThunkFunction('client/resetpassword.php?action=sendEmail', 'POST', formData, true);
    }
)

export const VerifyTokenThunk = createAsyncThunk(
    "ResetPasswordSliceName/VerifyTokenThunk",
    async ({ tokentemp }) => {

        const formData = HelperFormDataFunction(tokentemp);
        return HelperThunkFunction('client/resetpassword.php?action=verifyToken', 'POST', formData, true);
    }
)