import { Route, Routes } from "react-router-dom";
import ProductList from "../products/ProductList";

const MainRouter = () => {
    return (
        <Routes>
            <Route exact path="/" element={<ProductList/>}/>
        </Routes>
    );
}

export default MainRouter;