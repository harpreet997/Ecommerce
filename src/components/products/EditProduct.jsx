import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { addProductDetail, updateProductDetail } from "../../api/postmethod/postmethod";
import { toast } from "react-toastify";

const EditProduct = ({ closeEditModal, data }) => {
    const [title, setTitle] = useState(data.title);
    const id = data.id;

    console.log(id)

    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    const updateProduct = (e) => {
        e.preventDefault();
        const payload = {
            title: title
        }
        updateProductDetail(id, payload)
            .then((response) => {
                toast.success(`Product updated successfully, ${JSON.stringify(response.data)}`, {
                    position: "top-center",
                    autoClose: 2000
                })
                closeEditModal();
            })
            .catch((error) => {
                alert(error)
            })
    }


    const modalClose = () => {
        closeEditModal();
    }
    return (
        <form onSubmit={updateProduct}>
            <Modal.Body>
                <label htmlFor="productName" className='fs-5 mb-2'>Product Name</label><br />
                <input className="w-100 mb-2 input" type="text" name="title" value={title} placeholder='Enter Product name'
                    onChange={handleChange} required /><br />
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

    );
}

export default EditProduct;