import { Button, Tooltip, Switch, message, Popover } from 'antd'
import React from 'react'
import {usePost} from 'crud';
import { get, truncate } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';
import ContainerAll from '../../moduls/container/all'
import Tabs from 'components/tabs'
import { useSelector } from 'react-redux';
import { Table } from 'components';
import { useHooks } from 'hooks';

const index = () => {

  const { navigate, params } = useHooks()
  const queryClient = useQueryClient()
  const {currentLangCode} = useSelector(state=> get(state, "system"))

  const {mutate: getStatus} = usePost()
  const { mutate: deletedHandler } = usePost()

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/pages/${id}`,
      method: "delete",
      params: {
        extra: {
          _l: get(params, "lang", currentLangCode)
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pages"] });
      },
    })
    message.success("Page o'chirib yuborildi");
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
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
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
      render: (value, row)=>{
        return(
          <Switch
          checked={value ? true : false}
          onChange={(e) => getStatus({
            url: `/pages/${get(row, "id")}`, method: "put", params: {
              extra: {
                _l: get(params, "lang")
              }
            },
            values: { status: e ? 1 : 0 },
            onSuccess: () => {
              message.success("Success");
              queryClient.invalidateQueries({ queryKey: "pages" })
            },
          })}
          />
        )
      }
    },
  ]

  return (
      <ContainerAll
        url={"/pages"}
        queryKey={["pages"]}
        params={{
          sort: "-id",
          limit:"5",
          page: get(params, "page", 1),
          extra:{
            _l :  get(params, "lang", currentLangCode)
          }
        }}
      >
        {
          ({items, isLoading, meta})=>{
            return(
              <div>
                <div className="d-flex justify-end my-3">
                  <Tooltip placement='bottom' title={"Page qo'shish"}>
                    <Button
                      type='primary'
                      onClick={()=>navigate("/pages/create-page")}
                    >
                      Add Page
                    </Button>
                  </Tooltip>
                </div>
                <div className="flex justify-center">
                  <Tabs/>
                </div>
                <div className="my-3">
                <Table
                  meta={meta}
                  items={items}
                  isLoading={isLoading}
                  columns={columns}
                  hasDelete={true}
                  deleteAction={(row) => deleteConfirm(get(row, "id"))}
                  updateAction={(row) => navigate(`/pages/update-page/${get(row, "id")}`)}
                  hasUpdate={true}
                  hasPagination={true}
                  customPagination={false}
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