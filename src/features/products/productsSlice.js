import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsApi";

const initialState = {
    products: [],
    postSuccess: false,
    deleteSuccess: false,
    isLoading: false,
    isError: false,
    error: "",
};

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        const products = fetchProducts();

        return products;
    }
);

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (data) => {
        const res = postProduct(data);

        return res;
    }
);
export const removeProduct = createAsyncThunk(
    "product/removeProduct",
    async (id, thunkAPI) => {
        const res = deleteProduct(id);
        thunkAPI.dispatch(removeFromList(id));
        return res;
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false;
        },
        toggleDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
        removeFromList: (state, action) => {
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state, action) => {
                state.isLoading = true;
                state.postSuccess = false;
                state.isError = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                // state.products = action.payload;
                state.postSuccess = true;
                state.isLoading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                // state.products = [];
                state.postSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(removeProduct.pending, (state, action) => {
                state.isLoading = true;
                state.deleteSuccess = false;
                state.isError = false;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                // state.products = action.payload;
                state.deleteSuccess = true;
                state.isLoading = false;
            })
            .addCase(removeProduct.rejected, (state, action) => {
                // state.products = [];
                state.deleteSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            });
    },
});

// Action creators are generated for each case reducer function
export const { togglePostSuccess, toggleDeleteSuccess, removeFromList } =
    productsSlice.actions;

export default productsSlice.reducer;
