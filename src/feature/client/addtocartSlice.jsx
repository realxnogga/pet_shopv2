

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddToCartSlice = createSlice({
    name: 'AddToCartSliceName',
    initialState: {
      isAddToCartDataInserted: null,
      addToCartProductData: [],
    },
    reducers: {
        clearIsAddToCartDataInserted: (state) => {
            state.isAddToCartDataInserted = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(InsertAddToCartDataThunk.fulfilled, (state, action) => {
            state.isAddToCartDataInserted = action.payload;
        })
        .addCase(GetAddToCartDataThunk.fulfilled, (state, action) => {
            state.addToCartProductData = action.payload;
        })
    }
})

export const addToCartProductDataTemp = state => state.AddToCartSliceName.addToCartProductData;
export const isAddToCartDataInsertedTemp = state => state.AddToCartSliceName.isAddToCartDataInserted;
export const { clearIsAddToCartDataInserted } = AddToCartSlice.actions;
export const AddToCartSliceReducer = AddToCartSlice.reducer;


export const GetAddToCartDataThunk = createAsyncThunk(
    "AddToCartSliceName/GetAddToCartDataThunk",
    async (clientusername) => {
        try {
            const formData = new FormData();
            formData.append('clientusername', JSON.stringify(clientusername));

            const res = await fetch("http://localhost/petshop/server/client/addtocartproduct.php?action=getAddToCartProductData", {
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

export const InsertAddToCartDataThunk = createAsyncThunk(
    "AddToCartSliceName/InsertAddToCartDataThunk",
    async ({ addToCartDataTemp }) => {
        try {
            const formData = new FormData();
            formData.append('addToCartDataTemp', JSON.stringify(addToCartDataTemp));

            const res = await fetch("http://localhost/petshop/server/client/addtocartproduct.php?action=insertAddToCartProductData", {
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