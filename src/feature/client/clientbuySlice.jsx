

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const ClientBuySlice = createSlice({
    name: 'ClientBuySliceName',
    initialState: {
       isBuyDataInserted: null,
       buyProductData: [],
       allBuyProductData: [],
    },
    reducers: {
        clearIsBuyDataInserted: (state) => {
            state.isBuyDataInserted = null;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(InsertBuyDataThunk.fulfilled, (state, action) => {
            state.isBuyDataInserted = action.payload;
        })
        .addCase(GetBuyDataThunk.fulfilled, (state, action) => {
            state.buyProductData = action.payload;
        })
        .addCase(GetAllBuyDataThunk.fulfilled, (state, action) => {
            state.allBuyProductData = action.payload;
        })
    }
})

export const { clearIsBuyDataInserted } = ClientBuySlice.actions;
export const isBuyDataInsertedTemp = state => state.ClientBuySliceName.isBuyDataInserted;
export const buyProductDataTemp = state => state.ClientBuySliceName.buyProductData;
export const allBuyProductDataTemp = state => state.ClientBuySliceName.allBuyProductData;
export const ClientBuySliceReducer = ClientBuySlice.reducer;


export const GetAllBuyDataThunk = createAsyncThunk(
    "ClientBuySliceName/GetAllBuyDataThunk",
    async () => {
        try {   
            const res = await fetch("http://localhost/petshop/server/client/buyproduct.php?action=getAllBuyProductData", {    
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

export const GetBuyDataThunk = createAsyncThunk(
    "ClientBuySliceName/GetBuyDataThunk",
    async (clientusername) => {
        try {
            const formData = new FormData();
            formData.append('clientusername', JSON.stringify(clientusername));

            const res = await fetch("http://localhost/petshop/server/client/buyproduct.php?action=getBuyProductData", {
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

export const InsertBuyDataThunk = createAsyncThunk(
    "ClientBuySliceName/InsertBuyDataThunk",
    async ({ buyDataTemp }) => {
        try {
            const formData = new FormData();
            formData.append('buyDataTemp', JSON.stringify(buyDataTemp));

            const res = await fetch("http://localhost/petshop/server/client/buyproduct.php?action=insertBuyProductData", {
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