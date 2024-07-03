

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";

export const AdminProductSlice = createSlice({
    name: 'AdminProductSliceName',
    initialState: {
        isProductDataInserted: null,
        fetchedProductData: [],
        isProductDataDeleted: null,
        isProductUpdated: null,
        isAdminProductUpdated: null,
    },
    reducers: {
        clearIsProductDataInsertered: (state) => {
            state.isProductDataInserted = null;
        },
        clearIsProductDataDeleted: (state) => {
            state.isProductDataDeleted = null;
        },
        clearIsProductDataUpdated: (state) => {
            state.isProductUpdated = null;
        },
        clearIsAdminProductUpdated: (state) => {
            state.isAdminProductUpdated = null;
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
            .addCase(DeleteProductDataThunk.fulfilled, (state, action) => {
                state.isProductDataDeleted = action.payload;
            })
            .addCase(UpdateProductStockThunk.fulfilled, (state, action) => {
                state.isProductUpdated = action.payload;
            })
            .addCase(UpdateProductThunk.fulfilled, (state, action) => {
                state.isAdminProductUpdated = action.payload;
            })
    }
})

export const isAdminProductUpdatedTemp = state => state.AdminProductSliceName.isAdminProductUpdated;
export const isProductUpdatedTemp = state => state.AdminProductSliceName.isProductUpdated;
export const {clearIsProductDataInsertered, clearIsProductDataDeleted, clearIsProductDataUpdated, clearIsAdminProductUpdated } = AdminProductSlice.actions;
export const fetchedProductDataTemp = state => state.AdminProductSliceName.fetchedProductData;
export const isProductDataInsertedTemp = state => state.AdminProductSliceName.isProductDataInserted;
export const isProductDataDeletedTemp = state => state.AdminProductSliceName.isProductDataDeleted;
export const AdminProductSliceReducer = AdminProductSlice.reducer;

export const UpdateProductThunk = createAsyncThunk(
    "AdminProductSliceName/UpdateProductThunk",
    async ({selectedProduct, productPic}) => {

        const formData = HelperFormDataFunction(selectedProduct, productPic);

        return HelperThunkFunction('admin/adminproduct.php?action=updateProduct', 'POST', formData, true);

    }
)

export const UpdateProductStockThunk = createAsyncThunk(
    "AdminProductSliceName/UpdateProductStockThunk",
    async ({productID, producttotalstock}) => {

        return HelperThunkFunction('admin/adminproduct.php?action=updateProductStock', 'POST', {productID, producttotalstock}, false);

    }
)

export const DeleteProductDataThunk = createAsyncThunk(
    "AdminProductSliceName/DeleteProductDataThunk",
    async ({ productID, productimage }) => {

        return HelperThunkFunction('admin/adminproduct.php?action=deleteProduct', 'POST', {productID, productimage}, false);

    }
)

export const GetProductDataThunk = createAsyncThunk(
    "AdminProductSliceName/GetProductDataThunk",
    async () => {

        return HelperThunkFunction('admin/adminproduct.php?action=getProduct', 'POST', null, false);

    }
)

export const InsertProductDataThunk = createAsyncThunk(
    "AdminProductSliceName/InsertProductDataThunk",
    async ({ productDataTemp, productImage }) => {

        const formData = HelperFormDataFunction(productDataTemp, productImage);

        return HelperThunkFunction('admin/adminproduct.php?action=putProduct', 'POST', formData, true);

    }
)