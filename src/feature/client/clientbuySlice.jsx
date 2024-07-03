

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";

export const ClientBuySlice = createSlice({
    name: 'ClientBuySliceName',
    initialState: {
       isBuyDataInserted: null,
       buyProductData: [],
       allBuyProductData: [],
       isBuyDataStatusUpdated: null,
    },
    reducers: {
        clearIsBuyDataInserted: (state) => {
            state.isBuyDataInserted = null;
        },
        clearIsBuyDataStatusUpdated: (state) => {
            state.isBuyDataStatusUpdated = null;
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
        .addCase(UpdateBuyDataStatusThunk.fulfilled, (state, action) => {
            state.isBuyDataStatusUpdated = action.payload;
        })
    }
})

export const isBuyDataStatusUpdatedTemp = state => state.ClientBuySliceName.isBuyDataStatusUpdated;
export const { clearIsBuyDataInserted, clearIsBuyDataStatusUpdated } = ClientBuySlice.actions;
export const isBuyDataInsertedTemp = state => state.ClientBuySliceName.isBuyDataInserted;
export const buyProductDataTemp = state => state.ClientBuySliceName.buyProductData;
export const allBuyProductDataTemp = state => state.ClientBuySliceName.allBuyProductData;
export const ClientBuySliceReducer = ClientBuySlice.reducer;


export const UpdateBuyDataStatusThunk = createAsyncThunk(
    "ClientBuySliceName/UpdateBuyDataStatusThunk",
    async ( buyproductprimarykey ) => {

        return HelperThunkFunction('client/buyproduct.php?action=updateBuyDataStatus', 'POST', buyproductprimarykey, false); 
  
    }
)

export const GetAllBuyDataThunk = createAsyncThunk(
    "ClientBuySliceName/GetAllBuyDataThunk",
    async () => {

        return HelperThunkFunction('client/buyproduct.php?action=getAllBuyProductData', 'POST', null, false);

    }
)

export const GetBuyDataThunk = createAsyncThunk(
    "ClientBuySliceName/GetBuyDataThunk",
    async (clientusername) => {

        return HelperThunkFunction('client/buyproduct.php?action=getBuyProductData', 'POST', clientusername, false);

    }
)

export const InsertBuyDataThunk = createAsyncThunk(
    "ClientBuySliceName/InsertBuyDataThunk",
    async ({ buyDataTemp }) => {

        const formData = HelperFormDataFunction(buyDataTemp);

        return HelperThunkFunction('client/buyproduct.php?action=insertBuyProductData', 'POST', formData, true);

    }
)
