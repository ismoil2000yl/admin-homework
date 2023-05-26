import { Button, message, Popconfirm, Switch, Table, Tooltip } from 'antd'
import { get } from 'lodash'
import ConteinerAll from 'moduls/container/all'
import { useSelector } from 'react-redux'
import qs from 'qs'
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDelete, usePost } from 'crud'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import storage from 'services/storage'
import moment from 'moment/moment'
import { useState } from 'react'


const index = () => {

  const {currentLangCode} = useSelector(state=> get(state, "system"))
  const params = qs.parse(location.search, {ignoreQueryPrefix: true})
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const token = storage.get("token")
  const {id} = useParams()

  const {mutate: getStatus} = usePost()

  const {mutate: deletedHandler} = useDelete({
    url: "/menu-items",
    nameKey: "menu-items",
    params:{
      extra:{
        _l : get(params, "lang", currentLangCode)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "menu-items" });
    },
  })

  const deleteConfirm = (id) => {
    deletedHandler(id)
    message.success("Menu items o'chirib yuborildi");
  };
  const cancel = (e) => {
    message.error("Menu items o'chirilmadi");
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
      render: (value, row)=>{
        return(
          <p className='cursor-pointer' onClick={()=>navigate(`/menu-items/${get(row, "id")}`)}>{value}</p>
        )
      }
    },
    // {
    //   title: 'Alias',
    //   dataIndex: 'alias',
    //   key: 'alias',
    // },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: 'created_at',
      render: (value)=>{
        return moment(value).format("DD.MM.YYYY, HH:mm:ss")
      }
    },
    // {
    //   title: 'Type',
    //   dataIndex: 'type',
    //   key: 'type',
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value, row)=>{
        return(
          <Switch
          checked={value ? true : false}
          onChange={(e) => getStatus({
            url: `/menu-items/${get(row, "id")}`, method: "put", params: {
              extra: {
                _l: get(params, "lang")
              }
            },
            values: { status: e ? 1 : 0 },
            onSuccess: () => {
              message.success("Success");
              queryClient.invalidateQueries({ queryKey: "menu-items" })
            },
          })}
          />
        )
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, row)=>{
        return(
          <div className='flex gap-5'>
            <Tooltip placement='left' title="Menu items ni o'chirish">
              <Popconfirm
                placement="topRight"
                title={"Menu itemsni o'chirish"}
                description={"Ushbu Menu items ni o'chirishni xoxlaysizmi?"}
                onConfirm={()=>deleteConfirm(get(row, "id"))}
                onCancel={cancel}
                okText="Ha"
                cancelText="Yo'q"
              >
                <DeleteOutlined
                    className="text-red-500 cursor-pointer text-lg"
                />
              </Popconfirm>
            </Tooltip>
            <Tooltip placement='topLeft' title="Menu items ni o'zgartirish">
              <EditOutlined
                className="text-blue-500 cursor-pointer text-lg"
                onClick={() => navigate(`/menu-items/update-menu/${get(row, "id")}`)}
              />
            </Tooltip>
          </div>
        )
      }
    },
  ]

  return (
    <ConteinerAll
      url={`/menu-items`}
      queryKey={"menu-items"}
      params={{
        extra:{
          sort: "-id",
          limit: "5",
          page: get(params, "page", 1),
          _l : get(params, "lang", currentLangCode)
        },
        filter:{
          menu_id: id
        }
      }}
    >
      {
        ({items, isLoading, meta})=>{
          return(
            <div>
              <div className="flex justify-between my-3">
                <Tooltip
                  placement='bottom'
                  title={"orqaga qaytish"}
                >
                  <Button
                    type='primary'
                    onClick={()=>navigate(-1)}
                  >
                    Orqaga qaytish
                  </Button>
                </Tooltip>
                  <Tooltip
                    placement='bottom'
                    title={"Menu items qo'shish"}
                  >
                    <Button
                      type='primary'
                      onClick={()=>navigate(`/menu-items/create-menu/${id}`)}
                    >
                      Add Menu
                    </Button>
                  </Tooltip>
              </div>
              <div className="my-3">
                <Table
                  loading={isLoading}
                  columns={columns}
                  dataSource={items}
                  rowKey={"id"}
                  pagination={{
                    total: get(meta, "total"),
                    current: +get(params, "page", 1),
                    pageSize: get(meta, "perPage")
                  }}
                  onChange={(page)=>{
                    navigate({
                      search: qs.stringify({
                        page: page.current,
                      }),
                    });
                  }}
                />
              </div>
            </div>
          )
        }
      }
    </ConteinerAll>
  )
}

export default index