import { Button, Tooltip, message, Avatar } from 'antd'
import { useDelete, usePost } from 'crud';
import { Table } from 'components';
import { get } from 'lodash'
import React from 'react'
import { useState } from 'react';
import Form from './create'
import { useQueryClient } from '@tanstack/react-query';
import ContainerAll from '../../moduls/container/all'
import Tabs from 'components/tabs'
import { useSelector } from 'react-redux';
import { useHooks } from 'hooks';

export const types = [
  {
    id: 1,
    label: 'Simple banner',
    value: 1
  },
  {
    id: 2,
    label: 'Slider banner',
    value: 2
  }
]

const index = () => {

  const [modalData, setModalData] = useState({
    isOpen: false, data: null
  })

  const { params, navigate, } = useHooks()
  const { currentLangCode } = useSelector(state => get(state, "system"))
  const queryClient = useQueryClient()
  const { mutate: deletedHandler } = usePost()

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/banners/${id}`,
      method: "delete",
      params: {
        extra: {
          _l: get(params, "lang", currentLangCode)
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["banners"] });
      },
    })
    message.success("Banner o'chirib yuborildi");
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Foto',
      dataIndex: 'file',
      key: 'file',
      render: (value) => {
        return <Avatar className='shadow-sm' size={"large"} src={get(value, "thumbnails.small.src")} />
      }
    },
    {
      title: 'Name',
      dataIndex: `name_${get(params, "lang", currentLangCode)}`,
      key: 'name_uz',
    },
    {
      title: 'Description',
      dataIndex: `description_${get(params, "lang", currentLangCode)}`,
      key: 'description_uz',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (value) => {
        return value && types.find((item) => item.value === value).label
      }
    },
  ]

  return (
    <ContainerAll
      url={"/banners"}
      queryKey={"banners"}
      params={{
        sort: "-id",
        include: "file",
        limit: "5",
        page: get(params, "page", 1),
        // extra:{_l:"uz"}
      }}
    >
      {
        ({ items, isLoading, meta }) => {
          return (
            <div>
              <div className="d-flex justify-end my-3">
                <Tooltip placement='bottom' title={"Banner qo'shish"}>
                  <Button type='primary' onClick={() => setModalData({ isOpen: true, data: null })}>
                    Add Banner
                  </Button>
                </Tooltip>
                <Form {...{ modalData, setModalData, types }} />
              </div>
              <div className="flex justify-center">
                <Tabs />
              </div>
              <div className="my-3">
                <Table
                  meta={meta}
                  items={items}
                  isLoading={isLoading}
                  columns={columns}
                  hasDelete={true}
                  deleteAction={(row) => deleteConfirm(get(row, "id"))}
                  updateAction={(row) => navigate(`/banners/update-banner/${get(row, "id")}`)}
                  hasUpdate={true}
                  hasPagination={false}
                  customPagination={true}
                />
              </div>
            </div>
          )
        }
      }
    </ContainerAll>
  )
}

export default index