import { message, Pagination, Popconfirm, Table, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PaperClipOutlined } from "@ant-design/icons";
import React from 'react'
import { get } from 'lodash';
import { useHooks } from 'hooks';

const index = ({
    items,
    meta,
    isLoading,
    hasPagination = false,
    customPagination = false,
    columns,
    hasDelete = false,
    hasUpdate = false,
    hasContent = false,
    deleteAction = () => { },
    updateAction = () => { },
    contentAction = () => { },
}) => {

    const { navigate, qs, params } = useHooks()

    const cancel = (e) => {
        message.error("Ushbu ma'lumot o'chirilmadi");
    };

    const newColumns = hasDelete || hasUpdate ? [
        ...columns,
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, row) => {
                return (
                    <div className='flex gap-4'>
                        {
                            hasDelete ? (
                                <Tooltip placement='left' title={"Bannerni o'chirish"}>
                                    <Popconfirm
                                        placement="topRight"
                                        title={"Bannerni o'chirish"}
                                        description={"Ushbu banner ni o'chirishni xoxlaysizmi?"}
                                        onConfirm={() => deleteAction(row)}
                                        onCancel={cancel}
                                        okText="Ha"
                                        cancelText="Yo'q"
                                    >
                                        <DeleteOutlined
                                            className="text-red-500 cursor-pointer text-lg"
                                        />
                                    </Popconfirm>
                                </Tooltip>
                            ) : null
                        }
                        {
                            hasUpdate ? (
                                <Tooltip placement='topLeft' title={"Bannerni o'zgartirish"}>
                                    <EditOutlined
                                        className="text-blue-500 cursor-pointer text-lg"
                                        onClick={() => updateAction(row)}
                                    />
                                </Tooltip>
                            ) : null
                        }
                        {
                            hasContent ? (
                                <Tooltip placement='topLeft' title={"Contentni ko'rish"}>
                                    <PaperClipOutlined
                                        className="text-green-500 cursor-pointer text-lg"
                                        // onClick={() => navigate(`/posts/post-content/${get(row, "id")}`)}
                                        onClick={() => contentAction(row)}
                                    />
                                </Tooltip>
                            ) : null
                        }
                    </div>
                )
            }
        },
    ] : columns
    return (
        <>
            <Table
                columns={newColumns}
                dataSource={items}
                loading={isLoading}
                rowKey={"id"}
                className={"overflow-x-auto"}
                pagination={hasPagination ? {
                    total: get(meta, "total"),
                    current: +get(params, "page", 1),
                    pageSize: get(meta, "perPage", 1)
                } : false}
                onChange={(page) => {
                    navigate({
                        search: qs.stringify({
                            ...params,
                            page: page.current,
                        }),
                    });
                }}
            />
            {
                !hasPagination && customPagination ?
                    <div className="flex justify-end my-3">
                        <Pagination
                            total={get(meta, "total")}
                            current={+get(params, "page", 1)}
                            pageSize={get(meta, "perPage", 1)}
                            onChange={(page) => {
                                navigate({
                                    search: qs.stringify({
                                        ...params,
                                        page: page,
                                    }),
                                });
                            }}
                        />
                    </div>
                    : null}
        </>
    )
}

export default index