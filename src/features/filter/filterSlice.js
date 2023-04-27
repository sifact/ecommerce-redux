import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
    status: false,
    brands: [],
    keyword: "",
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        toggle: (state) => {
            state.status = !state.status;
        },

        toggleBrands: (state, action) => {
            if (!state.brands.includes(action.payload)) {
                state.brands.push(action.payload);
            } else {
                state.brands = state.brands.filter(
                    (brand) => brand !== action.payload
                );
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { toggle, toggleBrands } = filterSlice.actions;

export default filterSlice.reducer;
