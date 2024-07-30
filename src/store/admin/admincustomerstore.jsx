


import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFunction } from "../../utils/helperfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const useAdminCustomer = create(
    persist(
        (set) => ({
            allClientData: [], 
            isCustomerDataDeleted: null,
            clearIsCustomerDataDeleted: () => set({isCustomerDataDeleted: null}),

            getAllCustomerData: async () => {
                HelperFunction('http://localhost/petshop/server/admin/admincustomer.php?action=getAllCustomer', 'GET', '', set, 'allClientData');
            },

            deleteCustomerData: async ({temp}) => {
                const formData = HelperFormDataFunction(temp);
                HelperFunction('http://localhost/petshop/server/admin/admincustomer.php?action=deleteCustomer', 'POST', formData, set, 'isCustomerDataDeleted');
            }

        }),
        {
            name: 'admincustomerstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create

