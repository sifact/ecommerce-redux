// rtk query

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),

    tagTypes: ["Products"],

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `products`,
            providesTags: ["Products"],
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: "product",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),
        removeProduct: builder.mutation({
            query: (id) => ({
                url: `product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetProductsQuery,
    useAddProductMutation,
    useRemoveProductMutation,
} = productApi;
