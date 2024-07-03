
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";

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
        return HelperThunkFunction('admin/admincustomer.php?action=deleteCustomer', 'POST', {clientID, clientprofile}, false);
    }
)

export const GetAllCustomerDataThunk = createAsyncThunk(
    "AdminCustomerSliceName/GetAllCustomerDataThunk",
    async () => {     
        return HelperThunkFunction('admin/admincustomer.php?action=getAllCustomer', 'POST', null, false);
    }
)
