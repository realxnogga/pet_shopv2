

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const AdminSidebarSlice = createSlice({
    name: 'AdminSidebarSliceName',
    initialState: {
        isAdminSidebarOpen: false,
        whatIsClickedInAdminSidebar: 'dashboard',

    },
    reducers: {
        isAdminSidebarOpenState: (state) => {
            state.isAdminSidebarOpen = !state.isAdminSidebarOpen;
        },
        whatIsClickedInAdminSidebarState: (state, action) => {
            state.whatIsClickedInAdminSidebar = action.payload;
        },
    },
})

export const { whatIsClickedInAdminSidebarState, isAdminSidebarOpenState } = AdminSidebarSlice.actions;
export const isAdminSidebarOpenTemp = state => state.AdminSidebarSliceName.isAdminSidebarOpen;
export const whatIsClickedInAdminSidebarTemp = state => state.AdminSidebarSliceName.whatIsClickedInAdminSidebar;
export const AdminSidebarSliceReducer = AdminSidebarSlice.reducer;