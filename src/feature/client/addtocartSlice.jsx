
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";

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

        return HelperThunkFunction('client/addtocartproduct.php?action=getAddToCartProductData', 'POST', clientusername, false);

    }
)

export const InsertAddToCartDataThunk = createAsyncThunk(
    "AddToCartSliceName/InsertAddToCartDataThunk",
    async ({ addToCartDataTemp }) => {

        const formData = HelperFormDataFunction(addToCartDataTemp);
        
        return HelperThunkFunction('client/addtocartproduct.php?action=insertAddToCartProductData', 'POST', formData, true);

    }
)