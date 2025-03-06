import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = parseInt(searchParams.get("page")) || 1;
    const keyword = searchParams.get("keyword") || "";
    
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/products?keyword=${keyword}&page=${page}&limit=4`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setTotalPages(data.totalPages);
            });
    }, [keyword, page]);

    const handlePageChange = (newPage) => {
        setSearchParams({ keyword, page: newPage });
        navigate(`/search?keyword=${keyword}&page=${newPage}`);
    };

    return (
        <div className="container">
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => <ProductCard key={product._id} product={product} />)
                ) : (
                    <h4>No Products Found</h4>
                )}
            </div>
            
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
        </div>
    );
}
