
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HelperFunction } from "../../utils/helperfunction";
import { HelperFormDataFunction } from "../../utils/helperformdatafunction";

export const useAdminProduct = create(
    persist(
        (set) => ({
            isProductDataInserted: null,
            insertProductData: async ({ productData, productImage }) => {
                const formData = HelperFormDataFunction(productData, productImage);
                HelperFunction('http://localhost/petshop/server/admin/adminproduct.php?action=putProduct', 'POST', formData, set, 'isProductDataInserted');
            },
            clearIsProductDataInserted: () => set({ isProductDataInserted: null }),

            fetchedProductData: [],
            getProductData: async () => {
                HelperFunction('http://localhost/petshop/server/admin/adminproduct.php?action=getProduct', 'GET', '', set, 'fetchedProductData');
            },

            isProductDataDeleted: null,
            deleteProductData: async ({ temp }) => {
                const formData = HelperFormDataFunction(temp);
                HelperFunction('http://localhost/petshop/server/admin/adminproduct.php?action=deleteProduct', 'POST', formData, set, 'isProductDataDeleted');
            },
            clearIsProductDataDeleted: () => set({ isProductDataDeleted: null }),

            // update product stock
            isProductStockUpdated: null,
            updateProductStock: async ({ temp }) => {
                const formData = HelperFormDataFunction(temp);
                HelperFunction('http://localhost/petshop/server/admin/adminproduct.php?action=updateProductStock', 'POST', formData, set, 'isProductStockUpdated');
            },
            clearIsProductStockUpdated: () => set({ isProductStockUpdated: null }),

            // update product
            isProductUpdated: null,
            updateProduct: async ({ selectedProduct, productPic }) => {
                const formData = HelperFormDataFunction(selectedProduct, productPic);
                HelperFunction('http://localhost/petshop/server/admin/adminproduct.php?action=updateProduct', 'POST', formData, set, 'isProductUpdated');
            },
            clearIsProductUpdated: () => set({ isProductUpdated: null }),

            // to get the ID of product when the cart icon is clicked
            ProductIDForCart: null,
            getProductIDForCart: (value) => set({ ProductIDForCart: value }),

            // to get the ID of product when the view more button is clicked
            ProductIDForViewMore: { prodID: null, clickfrom: '' },
            getProductIDForViewMore: (prodID, clickfrom) => set((state) => ({
                ProductIDForViewMore: { ...state.ProductIDForViewMore, prodID: prodID, clickfrom: clickfrom}
            })),


        }),
        {
            name: 'adminproductstorage',
            getStorage: () => sessionStorage,
        }

    ) //persist
); // create