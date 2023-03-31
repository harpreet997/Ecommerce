import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { updateProductDetail } from "../../api/postmethod/postmethod";
import { getAllCategory } from "../../api/getmethod/getmethod";
import { toast } from "react-toastify";

const EditProduct = ({ closeEditModal, data }) => {
    const [editproductdata, setEditProductData] = useState({
        title: data.title,
        category: data.category,
        price: data.price,
        rating: data.rating,
        stock: data.stock,
        description: data.description,
    })
    const [categorydata, setCategoryData] = useState([]);
    const id = data.id;

    useEffect(() => {
        getAllCategory()
            .then((response) => {
                setCategoryData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleChange = (e) => {
        setEditProductData({
            ...editproductdata,
            [e.target.name]: e.target.value
        })
    }


    const updateProduct = (e) => {
        e.preventDefault();
        updateProductDetail(id, editproductdata)
            .then((response) => {
                toast.success(`Product updated successfully, ${JSON.stringify(response.data)}`, {
                    position: "top-center",
                    autoClose: 2000
                })
                closeEditModal();
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const modalClose = () => {
        closeEditModal();
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">Edit Product</Modal.Title>
            </Modal.Header>
            <form onSubmit={updateProduct}>
                <Modal.Body>
                    <label htmlFor="productName" className='fs-5 mb-2'>Product Name</label><br />
                    <input className="w-100 mb-2 input" type="text" name="title" value={editproductdata.title} placeholder='Enter Product name'
                        onChange={handleChange} required /><br />
                    <label htmlFor="category" className='fs-5 mb-2'>Select Category</label>
                    <select className="w-100 mb-2 input" name="category"
                        value={editproductdata.category} onChange={handleChange} required>
                        <option value="">Select</option>
                        {categorydata.map((item) => (<option value={item} >{item}</option>))}
                    </select>
                    <label htmlFor="quantity" className='fs-5 mb-2'>Stock</label><br />
                    <input className="w-100 mb-2 input" type="number" value={editproductdata.stock} min={1} name="stock" 
                    placeholder='Enter Quantity'
                        onChange={handleChange} required /><br />
                    <label htmlFor="price" className='fs-5 mb-2'>Price</label><br />
                    <input className="w-100 mb-2 input" type="number" value={editproductdata.price} min={1} name="price" 
                    placeholder='Enter Price'
                        onChange={handleChange} required /><br />
                    <label htmlFor="price" className='fs-5 mb-2'>Rating</label><br />
                    <input className="w-100 mb-2 input" type="number" value={editproductdata.rating} step={0.01} min={1} 
                    max={5} name="rating" placeholder='Enter Rating'
                        onChange={handleChange} required /><br />
                    <label htmlFor="details" className='fs-5 mb-2'>Description</label><br />
                    <textarea className="mb-2 w-100 textarea ps-2" name="description" rows="5"
                        value={editproductdata.description} onChange={handleChange} placeholder='Enter Description' required></textarea><br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Update Product
                    </Button>
                </Modal.Footer>
            </form >
        </>
    );
}

export default EditProduct;