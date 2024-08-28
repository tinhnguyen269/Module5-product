import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as productService from "../../src/service/productService";
import {toast} from "react-toastify";
import "../App.css";

function ProductList() {
    const [name, setName] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProduct(name);
    }, [name]);


    const getAllProduct = async (name) => {
        try {
            let res = await productService.getAllProduct(name);
            setProducts(res);
        } catch (e) {
            console.error("Failed to fetch products", e);
        }
    }


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }


    return (
        <div className="container background-image">
            <div className="mt-3 mb-2">
                <Link to="/create" className="btn btn-primary">Thêm mới</Link>
                <input placeholder="Tìm kiếm theo tên" className="form-control-sm mx-2" aria-label="Search"
                       value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>

            <table className="table table-hover table-bordered text-center">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Thể lọai</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Ngày nhập</th>
                </tr>
                </thead>
                <tbody>
                {products.map((item, index) =>
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.productCode}</td>
                        <td>{item.name}</td>
                        <td>{item.catory.name}</td>
                        <td>{item.quality}</td>
                        <td>{item.price}</td>
                        <td>
                            {formatDate(item.date)}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;