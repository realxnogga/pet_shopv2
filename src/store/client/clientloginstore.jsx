

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFunction } from "../../utils/helperfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const useClientLogin = create(
    persist(
        (set) => ({

            clearIsRouteProtected: () => set((state) => ({        
                returnedLoginData: { ...state.returnedLoginData, isrouteprotected: null }
            })),

            clearIsLogin: () => set((state) => ({        
                returnedLoginData: { ...state.returnedLoginData, islogin: null }
            })),

            returnedLoginData: {islogin: null, isrouteprotected: null},

            testLogin: async ({userLoginCredential}) => {
                const formData = HelperFormDataFunction(userLoginCredential);

                HelperFunction('http://localhost/petshop/server/client/clientlogin.php?action=testLogin', 'POST', formData, set, 'returnedLoginData');
            },

            userData: {},
            getLoginData: async ({ userLoginCredential }) => {
                const formData = HelperFormDataFunction(userLoginCredential);
                HelperFunction('http://localhost/petshop/server/client/clientlogin.php?action=getLoginData', 'POST', formData, set, 'userData');
            },
            clearUserData: () => set({userData: {}}),

        }),
        {
            name: 'clientloginstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create



