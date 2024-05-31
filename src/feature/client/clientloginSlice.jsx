



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const ClientLoginSlice = createSlice({
    name: 'ClientLoginSliceName',
    initialState: {
        isClientLoggedIn: null,
        userData: [],
    },
    reducers: {
        clearIsClientLoggedIn: (state) => {
            state.isClientLoggedIn = null;
        },
        clearUserData: (state) => {
            state.userData = [];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(InsertLoginDataThunk.fulfilled, (state, action) => {
                state.isClientLoggedIn = action.payload;
            })
            .addCase(GetLoginDataThunk.fulfilled, (state, action) => {
                state.userData = action.payload[0];
            })

    }
})

export const { clearIsClientLoggedIn, clearUserData } = ClientLoginSlice.actions;
export const userDataTemp = state => state.ClientLoginSliceName.userData;
export const isClientLoggedInTemp = state => state.ClientLoginSliceName.isClientLoggedIn;
export const ClientLoginSliceReducer = ClientLoginSlice.reducer;

export const GetLoginDataThunk = createAsyncThunk(
    "ClientLoginSliceName/GetLoginDataThunk",
    async ({ loginDataTemp }) => {
        try {
            const formData = new FormData();
            formData.append('loginDataTemp', JSON.stringify(loginDataTemp));

            const res = await fetch("http://localhost/petshop/server/client/clientlogin.php?action=getLoginData", {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('Error', error);
        }

    }
)

export const InsertLoginDataThunk = createAsyncThunk(
    "ClientLoginSliceName/InsertLoginDataThunk",
    async ({ loginDataTemp }) => {
        try {
            const formData = new FormData();
            formData.append('loginDataTemp', JSON.stringify(loginDataTemp));

            const res = await fetch("http://localhost/petshop/server/client/clientlogin.php?action=putLoginData", {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('Error', error);
        }

    }
)