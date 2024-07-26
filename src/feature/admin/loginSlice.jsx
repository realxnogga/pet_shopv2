
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const AdminLoginSlice = createSlice({
    name: 'AdminLoginSliceName',
    initialState: {
        isAdminAuth: null,
    },
    reducers: {
        clearIsAdminAuth: (state) => {
            state.isAdminAuth = null;
          },
    },
    extraReducers: builder => {
        builder
          .addCase(AuthAdminThunk.fulfilled, (state, action) => {
            state.isAdminAuth = action.payload;        
          })
      }
})

export const {clearIsAdminAuth} = AdminLoginSlice.actions;
export const isAdminAuthTemp = state => state.AdminLoginSliceName.isAdminAuth;
export const AdminLoginSliceReducer = AdminLoginSlice.reducer;

export const AuthAdminThunk = createAsyncThunk(
    'AdminLoginSliceName/AuthAdminThunk',
    async({ adminCredential }) => {

    return HelperThunkFunction('admin/adminlogin.php?action=adminAuth', 'POST', adminCredential, false);

    }
)
