


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const AdminCustomerSlice = createSlice({
    name: 'AdminCustomerSliceName',
    initialState: {
      allClientData: [], 
      isCustomerDataDeleted: null,
    },
    reducers: {
        clearIsCustomerDataDeleted: (state) => {
            state.isCustomerDataDeleted = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(GetAllCustomerDataThunk.fulfilled, (state, action) => {
                state.allClientData = action.payload;
            })
            .addCase(DeleteCustomerDataThunk.fulfilled, (state, action) => {
                state.isCustomerDataDeleted = action.payload;
            })
      }
})

export const {clearIsCustomerDataDeleted} = AdminCustomerSlice.actions;
export const isCustomerDataDeletedTemp = state => state.AdminCustomerSliceName.isCustomerDataDeleted;
export const allClientDataTemp = state => state.AdminCustomerSliceName.allClientData;
export const AdminCustomerSliceReducer = AdminCustomerSlice.reducer;

export const DeleteCustomerDataThunk = createAsyncThunk(
    "AdminCustomerSliceName/DeleteCustomerDataThunk",
    async ({ clientID, clientprofile }) => {
        try {   
            const res = await fetch("http://localhost/petshop/server/admin/admincustomer.php?action=deleteCustomer", {    
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({ clientID, clientprofile })
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('Error', error);
        }

    }
)

export const GetAllCustomerDataThunk = createAsyncThunk(
    "AdminCustomerSliceName/GetAllCustomerDataThunk",
    async () => {
        try {
            const res = await fetch("http://localhost/petshop/server/admin/admincustomer.php?action=getAllCustomer", {
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