import React, { useState, useEffect } from "react";
import TableProduct from "./TableProduct";
import axios from 'axios'

const Product = () => {
    const URL_GET = '/api/tda/ims-be/products?';
    const [apiProduct, setApiProduct] = useState();
    const [total, setTotal] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading ,setLoading] = useState(false);

    useEffect(() => {
        CallApi()
    }, [page, pageSize])

    const CallApi = () => {
        setLoading(true);
        axios.get(URL_GET + 'page=' + page + '&' + 'pageSize=' + pageSize).then((response) => {
            setApiProduct(response.data?.data);
            setTotal(response.data?.meta?.total);
            setLoading(false);
        })
    }

    return (
        <TableProduct
            data={apiProduct}
            loadData={() => CallApi()} total={total}
            onPageChange={(page1) => { setPage(page1) }}
            onPageSizeChange={(pageSize1) => { setPageSize(pageSize1) }}
            loading={loading}
        />
    )
}
export default Product;