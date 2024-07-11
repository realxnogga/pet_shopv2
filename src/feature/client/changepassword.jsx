

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const ResetPasswordSlice = createSlice({
    name: 'ResetPasswordSliceName',
    initialState: {
        isEmailSend: {bool: null, message: ''},
        email: '',
        isTokenMatch: null,
        isPasswordChange: null,
    },
    reducers: {
        getEmail: (state, action) => {
           state.email = action.payload;
        },
        clearIsEmailSend: (state) => {
            state.isEmailSend = {bool: null, message: ''};
        },
        clearIsTokenMatch: (state) => {
            state.isTokenMatch = null;
        },
        clearIsPasswordChange: (state) => {
            state.isPasswordChange = null;
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
            .addCase(ChangePasswordThunk.fulfilled, (state, action) => {
                state.isPasswordChange = action.payload;
            })
    }

})

export const { getEmail, clearIsEmailSend, clearIsTokenMatch, clearIsPasswordChange } = ResetPasswordSlice.actions;
export const isPasswordChangeTemp = state => state.ResetPasswordSliceName.isPasswordChange;
export const emailTemp = state => state.ResetPasswordSliceName.email;
export const isTokenMatchTemp = state => state.ResetPasswordSliceName.isTokenMatch;
export const isEmailSendTemp = state => state.ResetPasswordSliceName.isEmailSend;
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

export const ChangePasswordThunk = createAsyncThunk(
    "ResetPasswordSliceName/ChangePasswordThunk",
    async ({ passwordtemp }) => {

        const formData = HelperFormDataFunction(passwordtemp);
        return HelperThunkFunction('client/resetpassword.php?action=changepassword', 'POST', formData, true);
    }
)