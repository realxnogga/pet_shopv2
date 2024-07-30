

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAdminSidebar = create(
    persist(
        (set) => ({

            isAdminSidebarOpen: false,
            clearIsAdminSidebarOpen: () => set({isAdminSidebarOpen: false}),
            adminSidebarToggle: () => set((state) => ({isAdminSidebarOpen: !state.isAdminSidebarOpen})),

            whatIsClickedInAdminSidebar: 'dashboard',
            getWhatIsClickedInAdminSidebar: (value) => set({whatIsClickedInAdminSidebar: value}),
         
        }),
        {
            name: 'adminsidebarstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create

