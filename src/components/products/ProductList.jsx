import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../api/getmethod/getmethod";
import { Modal } from 'react-bootstrap';
import AddProduct from "./AddProduct";
import '../../styles/products/productlist.css';
import { deleteProductDetail } from "../../api/postmethod/postmethod";
import { toast } from "react-toastify";
import EditProduct from "./EditProduct";

const ProductList = () => {
    const [productdata, setProductData] = useState([]);
    const [addproductModal, setAddProductModal] = useState(false);
    const [editproductModal, setEditProductModal] = useState(false);
    const handleAddProductModal = () => setAddProductModal(true);
    const handleEditProductModal = (id) => setEditProductModal(id);
    const closeAddModal = () => setAddProductModal(false);
    const closeEditModal = () => setEditProductModal(false);


    console.log(editproductModal)
    useEffect(() => {
        getAllProducts()
            .then((response) => {
                setProductData(response.data.products)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    const DeleteProduct = (id) => {
        deleteProductDetail(id)
            .then((response) => {
                toast.error(`${response.data.title} deleted successfully`, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <>
            <nav className="nav-bar">
                <Link to="/"><h2>Online Shopping </h2></Link>

                <div className="nav-bag">
                    <button className="btn btn-primary w-100" onClick={handleAddProductModal}>Add Product</button>
                </div>
                <Modal show={addproductModal}
                    onHide={closeAddModal}>
                    <AddProduct closeAddModal={closeAddModal} />
                </Modal>
            </nav>
            <main>
                <div className="row mt-2">
                    {productdata.map((item) => {
                        return (
                            <div className="card d-flex mb-4 col-lg-4">
                                <img className="products-card-image" src={item.images[0]} alt="products" />
                                <div className="card-body">
                                    <p><span className="fw-bold">Product Name:</span> {item.title}</p>
                                    <p><span className="fw-bold">Product Description:</span> {item.description}</p>
                                    <p><span className="fw-bold">Price: </span>&#x24;{item.price} /-</p>
                                    <p><span className="fw-bold">Discount Price: </span>&#x24; {item.discountPercentage} /-</p>
                                    <p><span className="fw-bold">Rating: </span>{item.rating}</p>
                                    <button className="btn btn-info w-50" onClick={() => {
                                        handleEditProductModal(item.id);
                                    }}>Edit Product</button>
                                    <button className="btn btn-warning w-50" onClick={() => DeleteProduct(item.id)}>Delete Product</button>
                                </div>
                                <Modal show={editproductModal === item.id ? true : false}>
                                    <EditProduct data={item} closeEditModal={closeEditModal} />
                                </Modal>
                            </div>

                        )
                    })}
                </div>
            </main>
        </>
    );
}

export default ProductList;
