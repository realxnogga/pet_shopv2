




import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFunction } from "../../utils/helperfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const useClientBuy = create(
    persist(
        (set) => ({

            isBuyDataInserted: null,
            insertBuyData: async ({buyDataTemp}) => {
                const formData = HelperFormDataFunction(buyDataTemp);
                HelperFunction('http://localhost/petshop/server/client/buyproduct.php?action=insertBuyProductData', 'POST', formData,  set, 'isBuyDataInserted');
            },
            clearIsBuyDataInserted: () => set({isBuyDataInserted: null}),
       

            allBuyProductData: [],
            getAllBuyData: async () => {
                HelperFunction('http://localhost/petshop/server/client/buyproduct.php?action=getAllBuyProductData', 'GET', '', set, 'allBuyProductData');
            },


            buyProductData: [],
            getBuyData: async (clientusername) => {
                const formData = HelperFormDataFunction(clientusername);
                HelperFunction('http://localhost/petshop/server/client/buyproduct.php?action=getBuyProductData', 'POST', formData, set, 'buyProductData');
            },


            isBuyDataStatusUpdated: null,
            updateBuyDataStatus: async (idToRecieve) => {
                const formData = HelperFormDataFunction(idToRecieve);
                HelperFunction('http://localhost/petshop/server/client/buyproduct.php?action=updateBuyDataStatus', 'POST', formData, set, 'isBuyDataStatusUpdated');
            },
            clearIsBuyDataStatusUpdated: () => set({isBuyDataStatusUpdated: null}),

        }),
        {
            name: 'clientbuystorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create




