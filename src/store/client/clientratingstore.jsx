



import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFunction } from "../../utils/helperfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const useClientRating = create(
    persist(
        (set) => ({
            isRatingDataInserted: null,
            insertRatingData: async ({ ratingDataTemp }) => {
                const formData = HelperFormDataFunction(ratingDataTemp);

                HelperFunction('http://localhost/petshop/server/client/rating.php?action=insertRatingData', 'POST', formData, set, 'isRatingDataInserted');
            },
            clearIsRatingDataInserted: () => set({isRatingDataInserted: null}),
            

            ratingData: [],
            getRatingData: async () => {
                HelperFunction('http://localhost/petshop/server/client/rating.php?action=getRatingData', 'GET', '', set, 'ratingData');
            },

        }),
        {
            name: 'clientratingstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create



