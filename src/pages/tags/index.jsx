import { Button, message, Switch } from 'antd'
import { Table, Tabs } from 'components'
import React from 'react'
import ContainerAll from 'moduls/container/all'
import { get } from 'lodash'
import { useHooks } from 'hooks'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Form from './create'
import { usePost } from 'crud'
import { useQueryClient } from '@tanstack/react-query'

const index = () => {

    const { params, navigate } = useHooks()
    const { currentLangCode } = useSelector(state => get(state, "system"))
    const {mutate: getStatus} = usePost()
    const queryClient = useQueryClient()

    const [modalData, setModalData] = useState({
        data: null, isOpen: false
    })

    const { mutate: deletedHandler } = usePost()

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/tags/${id}`,
      method: "delete",
      params: {
        extra: {
          _l: get(params, "lang", currentLangCode)
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tags"] });
      },
    })
    message.success("Tag o'chirib yuborildi");
  };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (value, row) => {
              return (
                <Switch
                  checked={value ? true : false}
                  onChange={(e) => getStatus({
                    url: `tags/${get(row, "id")}`,
                    method: "put",
                    params: {
                      extra: {
                        _l: get(params, "lang")
                      }
                    },
                    values: { status: e ? 1 : 0 },
                    onSuccess: () => {
                      message.success("Success");
                      queryClient.invalidateQueries({ queryKey: ["tags"] });
                    },
                  })}
                />
              )
            }
          },
    ]

    return (
        <div>
            <div className="flex justify-end my-3">
                <Button
                    type='primary'
                    // onClick={()=>navigate("/tags/create-tag")}
                    onClick={() => setModalData({ isOpen: true, data: null })}
                >
                    Add tag
                </Button>
                <Form {...{modalData, setModalData}}/>
            </div>
            <div className='flex justify-center'>
                <Tabs />
            </div>
            <div className='my-3'>
                <ContainerAll
                    url={"/tags"}
                    params={{
                        sort: "-id",
                        limit: "5",
                        page: get(params, "page", 1),
                        extra:{
                            _l: get(params, "lang", currentLangCode)
                        }
                    }}
                    queryKey={["tags"]}
                >
                    {
                        ({ items, isLoading, meta }) => {
                            return (
                                <>
                                    <Table
                                        meta={meta}
                                        items={items}
                                        isLoading={isLoading}
                                        columns={columns}
                                        hasUpdate={true}
                                        hasDelete={true}
                                        deleteAction={(row)=>deleteConfirm(get(row, "id"))}
                                        updateAction={(row)=>setModalData({isOpen: true, data: row})}
                                        hasPagination={true}
                                        customPagination={false}
                                    />
                                </>
                            )
                        }
                    }
                </ContainerAll>
            </div>
        </div>
    )
}

export default index