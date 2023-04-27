import React from "react";

import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrands } from "../../features/filter/filterSlice";

import { useGetProductsQuery } from "../../features/api/apiSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { status, brands } = useSelector((store) => store.filter);

    const { data, isError, isLoading, error } = useGetProductsQuery();
    console.log(data);
    const products = data?.data;

    const activeClass = "text-white bg-indigo-500 border-white";

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <h1>Something went wrong...</h1>;
    }

    let content;

    if (products.length) {
        content = products.map((product) => (
            <ProductCard key={product.model} product={product} />
        ));
    }

    if (products.length && (status || brands.length)) {
        content = products
            .filter((product) => {
                if (status) {
                    return product.status === true;
                }
                return product;
            })
            .filter((product) => {
                if (brands.length) {
                    return brands.includes(product.brand);
                }
                return product;
            })
            .map((product) => (
                <ProductCard key={product.model} product={product} />
            ));
    }

    return (
        <div className="max-w-7xl gap-14 mx-auto my-10">
            <div className="mb-10 flex justify-end gap-5">
                <button
                    onClick={() => dispatch(toggle())}
                    className={`border px-3 py-2 rounded-full font-semibold ${
                        status ? activeClass : null
                    } `}
                >
                    In Stock
                </button>
                <button
                    onClick={() => dispatch(toggleBrands("AMD"))}
                    className={`border px-3 py-2 rounded-full font-semibold ${
                        brands.includes("AMD") ? activeClass : null
                    }`}
                >
                    AMD
                </button>
                <button
                    onClick={() => dispatch(toggleBrands("intel"))}
                    className={`border px-3 py-2 rounded-full font-semibold ${
                        brands.includes("intel") ? activeClass : null
                    }`}
                >
                    Intel
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
                {content}
            </div>
        </div>
    );
};

export default Home;
