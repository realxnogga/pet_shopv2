

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFunction } from "../../utils/helperfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const useAdminLogin = create(
    persist(
        (set) => ({

            isAdminLogin: null,
            clearIsAdminLogin: () => set({isAdminLogin: null}),
            insertAdminLoginData: async ({ adminCredential }) => {
                const formData = HelperFormDataFunction(adminCredential);
                HelperFunction('http://localhost/petshop/server/admin/adminlogin.php?action=insertAdminLoginData', 'POST', formData, set, 'isAdminLogin');
            }
        }),
        {
            name: 'adminloginstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create



