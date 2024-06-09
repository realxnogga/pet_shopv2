

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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
        try {   
            const formData = new FormData();
            formData.append('selectedProduct', JSON.stringify(selectedProduct));
            formData.append('productPic', productPic);
      
            const res = await fetch("http://localhost/petshopv2/server/admin/adminproduct.php?action=updateProduct", {    
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

export const UpdateProductStockThunk = createAsyncThunk(
    "AdminProductSliceName/UpdateProductStockThunk",
    async ({productID, producttotalstock}) => {
        try {   
            const res = await fetch("http://localhost/petshopv2/server/admin/adminproduct.php?action=updateProductStock", {    
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({productID, producttotalstock})
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('Error', error);
        }

    }
)

export const DeleteProductDataThunk = createAsyncThunk(
    "AdminProductSliceName/DeleteProductDataThunk",
    async ({ productID, productimage }) => {
        try {   
            const res = await fetch("http://localhost/petshopv2/server/admin/adminproduct.php?action=deleteProduct", {    
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({ productID, productimage })
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('Error', error);
        }

    }
)

export const GetProductDataThunk = createAsyncThunk(
    "AdminProductSliceName/GetProductDataThunk",
    async () => {
        try {   
            const res = await fetch("http://localhost/petshopv2/server/admin/adminproduct.php?action=getProduct", {    
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

            const res = await fetch("http://localhost/petshopv2/server/admin/adminproduct.php?action=putProduct", {
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