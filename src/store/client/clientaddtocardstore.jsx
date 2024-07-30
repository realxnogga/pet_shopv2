




import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFunction } from "../../utils/helperfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const useClientAddToCart = create(
    persist(
        (set) => ({

            isAddToCartDataInserted: null,
            insertAddToCartData: async ({ addToCartDataTemp }) => {
                const formData = HelperFormDataFunction(addToCartDataTemp);
                HelperFunction('http://localhost/petshop/server/client/addtocartproduct.php?action=insertAddToCartProductData', 'POST', formData, set, 'isAddToCartDataInserted');
            },
            clearIsAddToCartDataInserted: () => set({isAddToCartDataInserted: null}),

            addToCartProductData: [],
            getAddToCartData: async (clientusername) => {
                const formData = HelperFormDataFunction(clientusername);
                HelperFunction('http://localhost/petshop/server/client/addtocartproduct.php?action=getAddToCartProductData', 'POST', formData, set, 'addToCartProductData');
            },

        }),
        {
            name: 'clientaddtocartstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create



