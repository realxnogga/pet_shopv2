

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const ClientRegisterSlice = createSlice({
    name: 'ClientRegisterSliceName',
    initialState: {
        isClientAlreadyExist: null,
    },
    reducers: {
        clearIsClientAlreadyExist: (state) => {
            state.isClientAlreadyExist = null;
          },
    },
    extraReducers: builder => {
        builder
          .addCase(InsertRegisterDataThunk.fulfilled, (state, action) => {
            state.isClientAlreadyExist = action.payload;        
          })
      }
})

export const isClientAlreadyExistTemp = state => state.ClientRegisterSliceName.isClientAlreadyExist;
export const {clearIsClientAlreadyExist} = ClientRegisterSlice.actions;
export const ClientRegisterSliceReducer = ClientRegisterSlice.reducer;


export const InsertRegisterDataThunk = createAsyncThunk(
    "ClientRegisterSliceName/InsertRegisterDataThunk",
    async ({ registerDataTemp, userProfile  }) => {
        try {
            const formData = new FormData();
            formData.append('registerDataTemp', JSON.stringify(registerDataTemp));
            formData.append('userProfile', userProfile);

            const res = await fetch("http://localhost/petshop/server/client/clientregister.php?action=putRegisterData", {
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