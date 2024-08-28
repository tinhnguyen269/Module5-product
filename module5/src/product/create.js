import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as productService from "../service/productService";
import '../App.css';
import * as catoryService from "../service/catoryService"

function ProductCreate() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        productCode: "",
        name: "",
        quantity: 0,
        date: "",
        price: 0,
        describe: "",
        catory: {

        }
    })
    const [catorys, setCatorys] = useState([])

    useEffect(() => {
        const getAllCatory = async () => {
            const res = await catoryService.getAllCatory();
            setCatorys(res);
        }
        getAllCatory()
    }, []);


    const objectValid= {
        productCode: Yup.string()
            .matches(/^PROD-\d{4}$/, 'Mã sản phẩm phải theo định dạng PROD-XXXX')
            .required('Mã sản phẩm là bắt buộc'),
        name: Yup.string()
            .required('Tên sản phẩm là bắt buộc'),
        id: Yup.string().required('Danh mục là bắt buộc'),
        price: Yup.number()
            .required('Giá là bắt buộc'),
        quantity: Yup.number()
            .integer('Số lượng phải là số nguyên')
            .min(1, 'Số lượng phải lớn hơn 0')
            .required('Số lượng là bắt buộc'),
       date: Yup.date()
            .max(new Date(), 'Ngày phát hành không thể trong tương lai')
            .required('Ngày phát hành là bắt buộc'),
        describe: Yup.string()
            .max(500, 'Mô tả không được vượt quá 500 ký tự')
            .required('Mô tả là bắt buộc')
    }
    const saveProduct = async (value) => {

        value.quality = +value.quality
        value.price = +value.price
        value.id = +value.id
        value.catory = JSON.parse(value.catory)
        console.log(value)
        let isSuccess = await productService.saveProduct(value)

        if (isSuccess) {
            toast.success("Them moi thanh cong")
            navigate("/product")
        } else {
            toast.error("Them moi that bai")
        }

    }

    return (
        <Formik initialValues={form} onSubmit={saveProduct} validationSchema={Yup.object(objectValid)}>
            <div className="container">
                <Form className="needs-validation">

                    <div className="mb-3">
                        <label htmlFor="productCode" className="form-label">Mã sản phẩm</label>
                        <Field name="productCode" id="productCode" className="form-control"/>
                        <ErrorMessage name="productCode" component="p" className="error-message"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                        <Field name="name" id="name" className="form-control"/>
                        <ErrorMessage name="name" component="p" className="error-message"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="catory" className="form-label">Thể loại</label>
                        <Field name="catory" as="select" className="form-select">
                            <option value="">Chọn thể loại</option>
                            {catorys.map((item) =>
                                <option key={item.id} value={JSON.stringify(item)}>
                                    {item.name}
                                </option>
                            )}
                        </Field>
                        <ErrorMessage name="catory" component="p" className="error-message"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Giá</label>
                        <Field name="price" id="price" className="form-control"/>
                        <ErrorMessage name="price" component="p" className="error-message"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Số lượng</label>
                        <Field name="quantity" id="quantity" className="form-control"/>
                        <ErrorMessage name="quantity" component="p" className="error-message"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Ngày nhập sản phẩm</label>
                        <Field name="date" id="Dob" className="form-control" type="date"/>
                        <ErrorMessage name="date" component="p" className="error-message"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="describe" className="form-label">Mô tả sản phẩm</label>
                        <Field name="describe" id="describe" className="form-control"/>
                        <ErrorMessage name="describe" component="p" className="error-message"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Thêm mới</button>
                    <button type="close" className="btn btn-danger">Hủy</button>
                </Form>
            </div>

        </Formik>
    )
}

export default ProductCreate
