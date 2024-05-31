


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const ClientSidebarSlice = createSlice({
    name: 'ClientSidebarSliceName',
    initialState: {
        isClientSidebarOpen: false,
        whatIsClickedInClientSidebar: 'home',

    },
    reducers: {
        clearIsClientSidebarOpen: (state) => {
            state.isClientSidebarOpen = false;
        },
        clearWhatIsClickedInClientSidebar: (state) => {
            state.whatIsClickedInClientSidebar = 'home';
        },

        isClientSidebarOpenState: (state) => {
            state.isClientSidebarOpen = !state.isClientSidebarOpen;
        },
        whatIsClickedInClientSidebarState: (state, action) => {
            state.whatIsClickedInClientSidebar = action.payload;
        },
    },
})

export const { whatIsClickedInClientSidebarState, isClientSidebarOpenState, clearIsClientSidebarOpen, clearWhatIsClickedInClientSidebar } = ClientSidebarSlice.actions;
export const isClientSidebarOpenTemp = state => state.ClientSidebarSliceName.isClientSidebarOpen;
export const whatIsClickedInClientSidebarTemp = state => state.ClientSidebarSliceName.whatIsClickedInClientSidebar;
export const ClientSidebarSliceReducer = ClientSidebarSlice.reducer;
