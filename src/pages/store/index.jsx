import React from 'react'
import ContainerAll from 'moduls/container/all'
import { Button, Table, Tooltip, message, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import { usePost } from 'crud';
import { get } from 'lodash';
import qs from "qs"


const index = () => {

    const navigate = useNavigate()
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })


    const { mutate: deletedHandler } = usePost()



    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/store/${id}`, method: "delete", params: {
                extra: {
                    _l: "uz"
                }
            },
            onSuccess: () => {
                message.success("This Store deleted");
                queryClient.invalidateQueries({ queryKey: ["store"] });
            },
        })
    };
    const cancel = (e) => {
        message.error("This store was not deleted");
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Region",
            dataIndex: "region",
            key: "region",
            render: (value) => {
                return value.name_oz
            }
        },
        {
            title: "District",
            dataIndex: "district",
            key: "district",
            render: (value) => {
                return value.name_oz
            }
        },
        {
            title: "Product count",
            dataIndex: "products",
            key: "products",
            render: (value) => {
                return value.length
            }
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, row) => {
                return (
                    <div className="flex gap-5">
                        <Tooltip placement='left' title={"Delete Store"}>
                            <Popconfirm
                                placement="topRight"
                                title={"Delete Store"}
                                description={"Do you want to delete this Store?"}
                                onConfirm={() => deleteConfirm(get(row, "id"))}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <DeleteOutlined
                                    className="text-red-500 cursor-pointer text-lg"
                                />
                            </Popconfirm>
                        </Tooltip>
                        <Tooltip placement='topLeft' title={"Update Store"}>
                            <EditOutlined
                                className="text-blue-500 cursor-pointer text-lg"
                                onClick={() => navigate(`/store-page/update-store/${get(row, "id")}`)}
                            />
                        </Tooltip>
                    </div>
                )
            }
        },
    ]

    return (
        <ContainerAll
            url={"/store"}
            queryKey={"store"}
            params={{
                extra: { _l: "uz" },
                include: "region,district,products",
                sort: "-id",
                limit: "4",
                page: get(params, "page", 1),
            }}
        >
            {
                ({ items, isLoading, meta }) => {

                    return (
                        <div>
                            <div className="my-3 flex justify-end">
                                <Tooltip placement='left' title={"Add Store"}>
                                    <Button
                                        type='primary'
                                        onClick={() => navigate("/store-page/create-store")}
                                    >
                                        Add
                                    </Button>
                                </Tooltip>
                            </div>
                            <Table
                                loading={isLoading}
                                columns={columns}
                                pagination={{
                                    total: get(meta, "total"),
                                    current: +get(params, "page", 1),
                                    pageSize: get(meta, "perPage")
                                }}
                                onChange={(page) => {
                                    navigate({
                                        search: qs.stringify({
                                            ...params,
                                            page: page.current,
                                        }),
                                    });
                                }}
                                expandable={{

                                    expandRowByClick: true,

                                    expandIcon: ({ expanded, onExpand, record }) =>
                                        expanded ? (
                                            <UpOutlined onClick={e => onExpand(record, e)} />
                                        ) : (
                                            <DownOutlined onClick={e => onExpand(record, e)} />
                                        ),

                                    expandedRowRender: (item) => {
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
                                        ]
                                        return <Table
                                            rowKey={"id"}
                                            columns={columns}
                                            dataSource={item.products}
                                        />
                                    },
                                    defaultExpandedRowKeys: ['0'],

                                }}
                                dataSource={items}
                                rowKey={"id"}
                            />
                        </div>
                    )
                }
            }
        </ContainerAll>
    )
}

export default index