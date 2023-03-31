import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { addProductDetail } from "../../api/postmethod/postmethod";
import { getAllCategory } from "../../api/getmethod/getmethod";
import { toast } from "react-toastify";

const AddProduct = ({ closeAddModal }) => {
    const [categorydata, setCategoryData] = useState([]);
    const [productdata, setProductData] = useState({
        title: "",
        price: "",
        quantity: "",
        description: "",
        rating: "",
        stock: "",
        category: "",
    })
    const [title, setTitle] = useState();
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
        const payload = {
            title: title
        }
        addProductDetail(payload)
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

    // const handleImage = (event) => {
    //     setProductData({
    //         ...productdata,
    //         image: event.target.files[0]
    //     })
    // }

    const modalClose = () => {
        closeAddModal();
    }
    return (
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
                <input className="w-100 mb-2 input" type="number" min={1} name="quantity" placeholder='Enter Quantity'
                    onChange={handleChange} required /><br />
                <label htmlFor="price" className='fs-5 mb-2'>Price</label><br />
                <input className="w-100 mb-2 input" type="number" min={1} name="price" placeholder='Enter Price'
                    onChange={handleChange} required /><br />
                <label htmlFor="details" className='fs-5 mb-2'>Details</label><br />
                <textarea className="mb-2 textarea ps-2" name="details" id="details" cols="52" rows="5"
                    onChange={handleChange} placeholder='Enter Details' required></textarea><br />
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

    );
}

export default AddProduct;