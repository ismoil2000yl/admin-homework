import { Button, notification, Popconfirm, Table, Tooltip, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ContainerForm from 'moduls/container/form'
import { Field } from 'formik'
import { Fields } from 'components'
import { get, values } from 'lodash'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const index = () => {

    const navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification();

    return (
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
                    url='/store'
                    method={"post"}
                    params={{
                        extra: {
                            _l: 'uz'
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
                            required: true
                        },
                        {
                            name: 'region_id',
                            type: 'object',
                            onSubmitValue: (value) => value.id,
                            required: true
                        },
                        {
                            name: 'district_id',
                            type: 'object',
                            onSubmitValue: (value) => value.id,
                            required: true
                        },
                        {
                            name: 'products',
                            value: [],
                            type: "array",
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
                                values.products.slice(name, 1)
                                message.success("This Store deleted");
                            };
                            const cancel = (e) => {
                                message.error("This store was not deleted");
                            };
                        
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
                                                        title={"Delete Store"}
                                                        description={"Do you want to delete this Store?"}
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
                                                        <Tooltip placement='topLeft' title={"Update Store"}>
                                                            <EditOutlined
                                                                className="text-blue-500 cursor-pointer text-lg"
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
                                    <div className="flex my-3 gap-3 items-center">
                                        <div className='flex-auto w-[30%]'>
                                            <Field
                                                name="name"
                                                label="Product name"
                                                component={Fields.Input}
                                            />
                                        </div>
                                        <div className='flex-auto w-[30%]'>
                                            <Field
                                                name="price"
                                                label="Product price"
                                                type="number"
                                                component={Fields.Input}
                                            />
                                        </div>
                                        <div className='flex-auto w-[30%]'>
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
                                                        count: values.count,
                                                        id: values.products.length + 1
                                                    }])
                                                    values.name = ""
                                                    values.price = ""
                                                    values.count = ""
                                                }}
                                            >
                                                + add
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button
                                            type='primary'
                                            onClick={handleSubmit}
                                            disabled={!values.title}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                    <div className="my-3">
                                        <Table
                                            rowKey={"id"}
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
    )
}

export default index