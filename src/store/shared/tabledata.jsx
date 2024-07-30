


import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTableData = create(
    persist(
        (set) => ({

            tableData: [],
            getTableData: (items) => set({tableData: items}),

            returnedtTableDataFromPagination: [],
            getTableDataFromPagination: (items) => set({returnedtTableDataFromPagination: items}),


            entries: 5,
            getEntries: (value) => set({entries: value}),

        }),
        {
            name: 'tabledatastorage',
            getStorage: () => sessionStorage, 
        }
    ) //persist
); // create