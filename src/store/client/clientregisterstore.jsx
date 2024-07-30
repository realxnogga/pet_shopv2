
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFunction } from "../../utils/helperfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const useClientRegister = create(
    persist(
        (set) => ({

            isClientAlreadyExist: null,
            insertRegisterData: async ({ userRegisterCredential, userProfile }) => {
                const formData = HelperFormDataFunction(userRegisterCredential, userProfile);

                HelperFunction('http://localhost/petshop/server/client/clientregister.php?action=insertRegisterData', 'POST', formData, set, 'isClientAlreadyExist');
            },
            clearIsClientAlreadyExist: () => set({ isClientAlreadyExist: null }),

        }),
        {
            name: 'clientregisterstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create



