


import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFunction } from "../../utils/helperfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const useForgotPassword = create(
    persist(
        (set) => ({

            email: '',
            getEmail: (value) => set({email: value}),

            isEmailSent: {bool: null, message: ''},
            sendEmail: async ({emailCredential}) => {
                const formData = HelperFormDataFunction(emailCredential);
                HelperFunction('http://localhost/petshop/server/client/forgotpassword.php?action=sendEmail', 'POST', formData, set, 'isEmailSent')
            },
            clearIsEmailSent: () => set(state => ({isEmailSent: {...state.isEmailSent, bool: null}})),

            isPasswordChange: null,
            changePassword: ({changePasswordCredentialTemp}) => {
                const formData = HelperFormDataFunction(changePasswordCredentialTemp);
                HelperFunction('http://localhost/petshop/server/client/forgotpassword.php?action=changePassword', 'POST', formData, set, 'isPasswordChange')
            },
            clearIsPasswordChange: () => set({isPasswordChange: null})

        }),
        {
            name: 'changepasswordstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create



