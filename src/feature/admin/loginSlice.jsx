
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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
    async( adminCredentialTemp ) => {

        const formData = new FormData();
        formData.append('adminCredentialTemp', JSON.stringify(adminCredentialTemp));
       try {
        const res = await fetch('http://localhost/petshopv2/server/admin/adminlogin.php?action=adminAuth', {
            method: 'POST',
            body: formData, 
        })
        const data = await res.json();
        return data;
       } catch (error) {
        
       }
    }
)
