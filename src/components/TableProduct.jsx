import React, {useState, useEffect} from "react";
import {Table} from 'reactstrap'
import {Checkbox, Button, Modal, Input, Pagination, Skeleton} from 'antd'
import "antd/dist/antd.css";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import axios from "axios";

function TableProduct(props) {
    const URL_POST = '/api/tda/ims-be/product';
    const URL_PUT = '/api/tda/ims-be/product/update/';

    const [isModalAdd, setIsModalAdd] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);

    const [name, setName] = useState();
    const [status, setStatus] = useState();
    const [selectId, setSelectId] = useState();

    // setPage setPagesize
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // loading
    const addOk = () => {
        axios.post(URL_POST, {
            name: name,
            status: status
        }).then(
            () => {
                props.loadData();
            }
        )
        console.log(name)
    };

    const editOk = (id) => {
        axios.put(URL_PUT + id, {
            name: name
        }).then(
            () => {
                props.loadData();
                setId(null);
                setName('');
            }
        )
        console.log(id)
    };
    const setId = (id) => {
        setSelectId(id);
        console.log(id);
    }

    return (

        <div style={{marginTop: '50px'}}>
            {/* <Skeleton avatar paragraph={{ rows: 15 }}  /> */}
            <div style={{padding: '0 0 40px 0', justifyContent: 'flex-start', display: 'flex'}}>
                <Button type="primary" onClick={() => {
                    setIsModalAdd(true)
                }}>Add Product</Button>
            </div>
            {
                (props.loading) ? <Skeleton paragraph={{rows: 12}}/> :
                    (<Table>
                        <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th style={{textAlign: 'left'}}>
                                Name
                            </th>
                            <th>
                                Checked
                            </th>
                            <th>
                                Delete
                            </th>
                            <th>
                                Edit
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.data?.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">
                                        {item?.id}
                                    </th>
                                    <td style={{textAlign: 'left'}}>
                                        {item?.name}
                                    </td>
                                    <td>
                                        <Checkbox checked={item?.status} disabled/>
                                    </td>
                                    <td>
                                        <DeleteOutlined style={{color: 'red'}}/>
                                    </td>
                                    <td>
                                        <FormOutlined style={{color: '#40a9ff'}}
                                                      onClick={() => {
                                                          setIsModalEdit(true);
                                                          setId(item.id);
                                                          setName(item.name);
                                                      }}/>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>)
            }

            <Pagination
                total={props.total}
                showTotal={total => `Total ${props.total} items`}
                defaultPageSize={pageSize}
                defaultCurrent={page}
                style={{marginTop: '50px'}}
                onChange={(page, pageSize) => {
                    setPage(page);
                    setPageSize(pageSize);
                    props.onPageChange(page);
                    props.onPageSizeChange(pageSize);
                    console.log(page, pageSize);
                }}
                showSizeChange={true}
            />

            {/* Modal add */}
            <Modal title="Add Product" visible={isModalAdd}
                   onOk={() => {
                       addOk();
                       setIsModalAdd(false);
                   }}
                   onCancel={() => {
                       setIsModalAdd(false);
                   }}>
                <Input.Group style={{display: 'flex'}}>
                    <label style={{width: '30%'}}>Name : </label>
                    <Input placeholder="Add name , please"
                           allowClear
                           tyle={{width: '65%'}}
                           value={name}
                           onChange={(e) => setName(e.target.value)}

                    />
                </Input.Group>
                <Input.Group style={{display: 'flex', marginTop: '20px'}}>
                    <label style={{width: '22.6%'}}>Status : </label>
                    <Checkbox
                        tyle={{width: '75%'}}
                        onChange={(e) => setStatus(!status)}/>
                </Input.Group>
            </Modal>
            {/* Modal edit */}
            <Modal title="Product detail" visible={isModalEdit}
                   onOk={() => {
                       editOk(selectId);
                       setIsModalEdit(false);
                   }}
                   onCancel={() => {
                       setIsModalEdit(false)
                   }}
            >
                <Input.Group style={{display: 'flex'}}>
                    <label style={{width: '30%'}}>Name : </label>
                    <Input
                        placeholder="Add name , please"
                        allowClear tyle={{width: '65%'}}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Input.Group>
                <Input.Group style={{display: 'flex', marginTop: '20px'}}>
                    <label style={{width: '22.6%'}}>Status : </label>
                    <Checkbox tyle={{width: '75%', marginLeft: '30px'}} disabled/>
                </Input.Group>
            </Modal>
        </div>
    )
}

export default TableProduct;