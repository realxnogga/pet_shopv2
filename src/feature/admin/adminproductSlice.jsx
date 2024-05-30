

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const AdminProductSlice = createSlice({
    name: 'AdminProductSliceName',
    initialState: {
        isProductDataInserted: null,
        fetchedProductData: [],
    },
    reducers: {
        clearIsProductDataInserteredState: (state) => {
            state.isProductDataInserted = null;
        },
      
    },
    extraReducers: builder => {
        builder
            .addCase(InsertProductDataThunk.fulfilled, (state, action) => {
                state.isProductDataInserted = action.payload;
            })
            .addCase(GetProductDataThunk.fulfilled, (state, action) => {
                state.fetchedProductData = action.payload;
            })
    }
})

export const {clearIsProductDataInserteredState} = AdminProductSlice.actions;
export const fetchedProductDataTemp = state => state.AdminProductSliceName.fetchedProductData;
export const isProductDataInsertedTemp = state => state.AdminProductSliceName.isProductDataInserted;
export const AdminProductSliceReducer = AdminProductSlice.reducer;


export const GetProductDataThunk = createAsyncThunk(
    "AdminProductSliceName/GetProductDataThunk",
    async () => {
        try {   
            const res = await fetch("http://localhost/petshop/server/admin/adminproduct.php?action=getProduct", {    
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('Error', error);
        }

    }
)


export const InsertProductDataThunk = createAsyncThunk(
    "AdminProductSliceName/InsertProductDataThunk",
    async ({ productDataTemp, productImage }) => {
        try {
            const formData = new FormData();
            formData.append('productDataTemp', JSON.stringify(productDataTemp));
            formData.append('productImage', productImage);

            const res = await fetch("http://localhost/petshop/server/admin/adminproduct.php?action=putProduct", {
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