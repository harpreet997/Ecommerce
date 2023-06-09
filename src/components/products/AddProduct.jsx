import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { addProductDetail } from "../../api/postmethod/postmethod";
import { getAllCategory } from "../../api/getmethod/getmethod";
import { toast } from "react-toastify";

const AddProduct = ({ closeAddModal }) => {
    const [categorydata, setCategoryData] = useState([]);
    const [productdata, setProductData] = useState({
        title: "",
        category: "",
        price: "",
        rating: "",
        stock: "",
        description: "",
    })

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
        setProductData({
            ...productdata,
            [e.target.name]: e.target.value
        })
    }
    const addProduct = (e) => {
        e.preventDefault();
        addProductDetail(productdata)
            .then((response) => {
                toast.success(`Product added successfully, ${JSON.stringify(response.data)}`, {
                    position: "top-center",
                    autoClose: 2000
                })
                closeAddModal();
            })
            .catch((error) => {
                alert(error)
            })
    }

    const modalClose = () => {
        closeAddModal();
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">Add Product</Modal.Title>
            </Modal.Header>
            <form onSubmit={addProduct}>
                <Modal.Body>
                    <label htmlFor="productName" className='fs-5 mb-2'>Product Name</label><br />
                    <input className="w-100 mb-2 input" type="text" name="title" placeholder='Enter Product name'
                        onChange={handleChange} required /><br />
                    <label htmlFor="category" className='fs-5 mb-2'>Select Category</label>
                    <select className="w-100 mb-2 input" name="category"
                        onChange={handleChange} required>
                        <option value="">Select</option>
                        {categorydata.map((item) => (<option value={item} >{item}</option>))}
                    </select>
                    <label htmlFor="quantity" className='fs-5 mb-2'>Stock</label><br />
                    <input className="w-100 mb-2 input" type="number" min={1} name="stock" placeholder='Enter Quantity'
                        onChange={handleChange} required /><br />
                    <label htmlFor="price" className='fs-5 mb-2'>Price</label><br />
                    <input className="w-100 mb-2 input" type="number" min={1} name="price" placeholder='Enter Price'
                        onChange={handleChange} required /><br />
                    <label htmlFor="price" className='fs-5 mb-2'>Rating</label><br />
                    <input className="w-100 mb-2 input" type="number" step={0.1} min={1} max={5} name="rating" placeholder='Enter Rating'
                        onChange={handleChange} required /><br />
                    <label htmlFor="details" className='fs-5 mb-2'>Description</label><br />
                    <textarea className="mb-2 w-100 textarea ps-2" name="description" rows="5"
                        onChange={handleChange} placeholder='Enter Description' required></textarea><br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Add Product
                    </Button>
                </Modal.Footer>
            </form >
        </>
    );
}

export default AddProduct;