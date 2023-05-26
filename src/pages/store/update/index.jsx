import { Button, notification, Popconfirm, Table, Tooltip, message, Spin } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContainerForm from 'moduls/container/form'
import { Field } from 'formik'
import { Fields } from 'components'
import { get, values } from 'lodash'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ContainerOne from 'moduls/container/one'

const index = () => {

    const navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification();

    const { id } = useParams()

    return (
        <ContainerOne
            url={`/store/${id}`}
            params={{ extra: { _l: "uz" }, include: "region,district,products" }}
        >
            {
                ({ item1, isLoading }) => {

                    return !isLoading ? (
                        <>
                            <div className="my-3 flex justify-start">
                                <Button
                                    type='primary'
                                    onClick={() => navigate("/store-page")}
                                >
                                    Back
                                </Button>
                            </div>
                            <div className="my-2">
                                <ContainerForm
                                    url={`/store`}
                                    method={"post"}
                                    params={{
                                        extra: {
                                            _l: 'uz',
                                            products_id: id
                                        },
                                    }}
                                    onSuccess={() => {
                                        navigate("/store-page")
                                        resetForm()
                                        notification.success({
                                            message: "add new store",
                                        });
                                        queryClient.invalidateQueries({ queryKey: ["store"] })
                                    }}
                                    fields={[
                                        {
                                            name: 'title',
                                            value: get(item1, "title"),
                                            required: true
                                        },
                                        {
                                            name: "store_id",
                                            value: id,
                                            required: true
                                        },
                                        {
                                            name: 'region_id',
                                            type: 'object',
                                            value: get(item1, "region", {}),
                                            onSubmitValue: (value) => value.id,
                                            required: true
                                        },
                                        {
                                            name: 'district_id',
                                            type: 'object',
                                            value: get(item1, "district", {}),
                                            onSubmitValue: (value) => value.id,
                                            required: true

                                        },
                                        {
                                            name: 'products',
                                            type: "array",
                                            value: get(item1, "products", []),
                                            required: true
                                        },
                                        {
                                            name: 'name',
                                            disabled: true
                                        },
                                        {
                                            name: 'price',
                                            disabled: true
                                        },
                                        {
                                            name: 'count',
                                            disabled: true
                                        },
                                    ]}
                                >
                                    {
                                        ({ handleSubmit, values, setFieldValue, resetForm }) => {
                                            const deleteConfirm = (name) => {
                                                setFieldValue("products", values.products.filter(item => item.name !== name))
                                                // message.success("This Product deleted");
                                            };
                                            const cancel = (e) => {
                                                message.error("This Product was not deleted");
                                            };

                                            const editProduct = (row) => {
                                                setFieldValue("name", row.name)
                                                setFieldValue("price", row.price)
                                                setFieldValue("count", row.count)
                                                setFieldValue("products", values.products.filter(item => item.name !== row.name))
                                            }


                                            const columns = [
                                                {
                                                    title: "Name",
                                                    dataIndex: "name",
                                                    key: "name"
                                                },
                                                {
                                                    title: "Price",
                                                    dataIndex: "price",
                                                    key: "price"
                                                },
                                                {
                                                    title: "Count",
                                                    dataIndex: "count",
                                                    key: "count"
                                                },
                                                {
                                                    title: "Action",
                                                    dataIndex: "action",
                                                    key: "action",
                                                    render: (_, row) => {
                                                        return (
                                                            <div className="flex gap-5">
                                                                <Tooltip placement='left' title={"Delete Store"}>
                                                                    <Popconfirm
                                                                        placement="topRight"
                                                                        title={"Delete Product"}
                                                                        description={"Do you want to delete this Product?"}
                                                                        onConfirm={() => deleteConfirm(get(row, "name"))}
                                                                        onCancel={cancel}
                                                                        okText="Yes"
                                                                        cancelText="No"
                                                                    >
                                                                        <DeleteOutlined
                                                                            className="text-red-500 cursor-pointer text-lg"
                                                                        />
                                                                    </Popconfirm>
                                                                </Tooltip>
                                                                {
                                                                    !values.name ?
                                                                        <Tooltip placement='topLeft' title={"Update Product"}>
                                                                            <EditOutlined
                                                                                className="text-blue-500 cursor-pointer text-lg"
                                                                                onClick={() => editProduct(row)}
                                                                            />
                                                                        </Tooltip>
                                                                        : null
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                },
                                            ]

                                            return (
                                                <>
                                                    {contextHolder}
                                                    <div className='flex gap-3'>
                                                        <div className='flex-auto w-[26%]'>
                                                            <Field
                                                                name="title"
                                                                label="Market name"
                                                                component={Fields.Input}
                                                            />
                                                        </div>
                                                        <div className='flex-auto w-[37%]'>
                                                            <Field
                                                                name="region_id"
                                                                label="Region"
                                                                loadOptionsUrl="/regions"
                                                                optionValue="name_oz"
                                                                // isMulti={true}
                                                                optionLabel={(option) => {
                                                                    return (
                                                                        <div>
                                                                            {option.name_oz}
                                                                        </div>
                                                                    )
                                                                }}
                                                                component={Fields.AsyncSelect}
                                                            />
                                                        </div>
                                                        <div className='flex-auto w-[37%]'>
                                                            <Field
                                                                name={"district_id"}
                                                                label="District"
                                                                loadOptionsUrl="/districts"
                                                                optionValue="district_id"
                                                                // isMulti={true}
                                                                loadOptionsParams={{
                                                                    filter: { region_id: values.region_id.id },
                                                                }}
                                                                optionLabel={(option) => {
                                                                    return (
                                                                        <div>
                                                                            {option.name_oz}
                                                                        </div>
                                                                    )
                                                                }}
                                                                component={Fields.AsyncSelect}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex my-3 gap-3 items-center w-[100%]">
                                                        <div className='flex-auto w-[29%]'>
                                                            <Field
                                                                name="name"
                                                                label="Product name"
                                                                component={Fields.Input}
                                                            />
                                                        </div>
                                                        <div className='flex-auto w-[29%]'>
                                                            <Field
                                                                name="price"
                                                                label="Product price"
                                                                type="number"
                                                                component={Fields.Input}
                                                            />
                                                        </div>
                                                        <div className='flex-auto w-[29%]'>
                                                            <Field
                                                                name="count"
                                                                label="Product count"
                                                                type="number"
                                                                component={Fields.Input}
                                                            />
                                                        </div>
                                                        <div className='flex-auto w-[10%]'>
                                                            <Button
                                                                type='primary'
                                                                disabled={!values.name}
                                                                onClick={() => {
                                                                    setFieldValue("products", [...values.products, {
                                                                        name: values.name,
                                                                        price: values.price,
                                                                        count: values.count
                                                                    }])
                                                                    values.name = ""
                                                                    values.price = ""
                                                                    values.count = ""
                                                                }}
                                                            >
                                                                update
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <Button
                                                            type='primary'
                                                            onClick={handleSubmit}
                                                        >
                                                            Submit
                                                        </Button>
                                                    </div>
                                                    <div className="my-3">
                                                        <Table
                                                            rowKey={"id"}
                                                            loading={isLoading}
                                                            columns={columns}
                                                            dataSource={values.products}
                                                        />
                                                    </div>
                                                </>
                                            )
                                        }
                                    }
                                </ContainerForm>
                            </div>
                        </>
                    ) : <div className='flex justify-center mt-[35%]'>
                        <Spin />
                    </div>
                }
            }
        </ContainerOne>
    )
}

export default index