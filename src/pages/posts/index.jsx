import { Button, Tooltip, Switch, message, Avatar, Popover } from 'antd'
import React from 'react'
import { usePost } from 'crud';
import { get, truncate } from 'lodash';
import { useState } from 'react';
import Form from './create'
import { useQueryClient } from '@tanstack/react-query';
import ContainerAll from 'moduls/container/all'
import { useSelector } from 'react-redux';
import Tabs from 'components/tabs'
import { Table } from 'components';
import { useHooks } from 'hooks';

const index = () => {

  const [modalData, setModalData] = useState({
    isOpen: false, data: null
  })
  
  const queryClient = useQueryClient()
  const {params, navigate} = useHooks()
  const { currentLangCode } = useSelector(state => get(state, "system"))
  const { mutate: getStatus } = usePost()
  const { mutate: deletedHandler } = usePost()

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/posts/${id}`,
      method: "delete",
      params: {
        extra: {
          _l: get(params, "lang", currentLangCode)
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    })
    message.success("Post o'chirib yuborildi");
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (value) => {
        return value?.length > 40 ? (
          <Popover title={value}>
            {truncate(value, { length: 40, omission: "..." })}
          </Popover>
        ) : (
          value
        );
      },
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
              url: `/posts/updateStatus/${get(row, "id")}`,
              method: "put",
              params: {
                extra: {
                  _l: get(params, "lang")
                }
              },
              values: { status: e ? 1 : 0 },
              onSuccess: () => {
                message.success("Success");
                queryClient.invalidateQueries({ queryKey: ["posts"] });
              },
            })}
          />
        )
      }
    },

  ]

  return (
    <ContainerAll
      url={"/posts"}
      queryKey={"posts"}
      params={{
        sort: "-id",
        limit: "5",
        include: ["file", "tags", "categories"],
        page: get(params, "page", 1),
        extra: { _l: get(params, "lang", currentLangCode) }
      }}
    >
      {
        ({ items, isLoading, meta }) => {
          return (
            <div>
              <div className="d-flex justify-end my-3">
                <Tooltip
                  placement='bottom'
                  title={"Post qo'shish"}
                >
                  <Button
                    type='primary'
                    onClick={() => setModalData({ isOpen: true, data: null })}
                  >
                    Add Post
                  </Button>
                </Tooltip>
                <Form {...{ modalData, setModalData }} />
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
                  updateAction={(row) => navigate(`/posts/update-post/${get(row, "id")}`)}
                  hasUpdate={true}
                  hasPagination={false}
                  customPagination={true}
                  hasContent={true}
                  contentAction={(row) => navigate(`/posts/post-content/${get(row, "id")}`)}
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