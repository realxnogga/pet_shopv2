


import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useClientSidebar = create(
    persist(
        (set) => ({
            isClientSidebarOpen: false,

            clearIsClientSidebarOpen: () => set({isClientSidebarOpen: false}),

            clientSidebarToggle: () => set((state) => ({isClientSidebarOpen: !state.isClientSidebarOpen})),

            whatIsClickedInClientSidebar: 'home',

            getWhatIsClickedInClientSidebar: (value) => set({whatIsClickedInClientSidebar: value}),

            clearWhatIsClickedInClientSidebar: () => set({whatIsClickedInClientSidebar: 'home'}),
         
        }),
        {
            name: 'clientsidebarstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create


