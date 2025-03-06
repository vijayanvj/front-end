import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams(); 
    const navigate = useNavigate();

    const page = parseInt(searchParams.get("page")) || 1; 
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products?${searchParams}`)
            .then((res) => res.json())
            .then((res) => {
                setProducts(res.products);
                setTotalPages(res.totalPages);
            });
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
        navigate(`/?page=${newPage}`);
    };

    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products.length > 0 ? (
                        products.map((product) => <ProductCard key={product._id} product={product} />)
                    ) : (
                        <h4 className="text-center">No Products Found</h4>
                    )}
                </div>

                {/* Pagination Buttons */}
                <div className="pagination mt-4 d-flex justify-content-center">
                    <button
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                        className="btn btn-secondary mx-2"
                    >
                        Previous
                    </button>
                    <span className="align-self-center"> Page {page} of {totalPages} </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => handlePageChange(page + 1)}
                        className="btn btn-primary mx-2"
                    >
                        Next
                    </button>
                </div>
            </section>
        </Fragment>
    );
}
