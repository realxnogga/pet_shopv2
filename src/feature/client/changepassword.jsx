

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const ResetPasswordSlice = createSlice({
    name: 'ResetPasswordSliceName',
    initialState: {
        isEmailSend: null,
    },
    reducers: {
        clearIsEmailSend: (state) => {
            state.isEmailSend = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(SendTokenThunk.fulfilled, (state, action) => {
                state.isEmailSend = action.payload;
            })
    }

})

export const isEmailSendTemp = state => state.ResetPasswordSliceName.isEmailSend;
export const { clearIsEmailSend } = ResetPasswordSlice.actions;
export const ResetPasswordSliceReducer = ResetPasswordSlice.reducer;


export const SendTokenThunk = createAsyncThunk(
    "ResetPasswordSliceName/SendTokenThunk",
    async ({ emailtemp }) => {

        const formData = HelperFormDataFunction(emailtemp);

        return HelperThunkFunction('client/resetpassword.php?action=sendEmail', 'POST', formData, true);
    }
)