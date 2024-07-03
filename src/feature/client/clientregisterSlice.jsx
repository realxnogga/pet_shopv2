

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";
import { HelperThunkFunction } from "../../utils/helperthunkfunction";


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

        const formData = HelperFormDataFunction(registerDataTemp, userProfile);

        return HelperThunkFunction('client/clientregister.php?action=putRegisterData', 'POST', formData, true);

    }
)