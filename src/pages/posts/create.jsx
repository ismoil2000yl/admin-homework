import { useQueryClient } from '@tanstack/react-query'
import { Button, Modal, notification } from 'antd'
import { Fields } from 'components'
import { Field } from 'formik'
import { get } from 'lodash'
import React from 'react'
import { useSelector } from "react-redux";
import ContainerForm from "moduls/container/form";
import { CheckOutlined } from "@ant-design/icons";
import { useHooks } from 'hooks'


const form = ({ modalData, setModalData }) => {

  const queryClient = useQueryClient()

  const [api, contextHolder] = notification.useNotification();
  const { currentLangCode } = useSelector(state => get(state, "system"))
  const { params } = useHooks()

  return (
    <Modal
      title={"Post yaratish"}
      open={modalData.isOpen}
      footer={false}
      onCancel={() => setModalData({ isOpen: false, data: null })}
    >
      {contextHolder}
      <ContainerForm
        url={"/posts"}
        method="post"
        params={{
          extra: { _l: get(params, "lang", currentLangCode) },
        }}
        onSuccess={(data, resetForm) => {
          notification.success({
            message: "Yangi post qo'shildi",
          });
          setModalData({ isOpen: false, data: null })
          queryClient.invalidateQueries({ queryKey: ["posts"] })
        }}
        fields={[
          {
            name: "title",
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: "description",
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: "content",
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: "status",
            type: "boolean",
            onSubmitValue: (value) => value ? 1 : 0,
          },
          {
            name: "tag_ids",
            type: "array",
            value: get(modalData, "item.tag_ids"),
            onSubmitValue: (value) => {
              return value.reduce((total, curr) => {
                return [...total, curr.id]
              }, []).join(',')
            }
          },
          {
            name: "category_ids",
            type: "array",
            value: get(modalData, "item.category_ids"),
            onSubmitValue: (value) => {
              return value.reduce((total, curr) => {
                return [...total, curr.id]
              }, []).join(',')
            }
          },
          {
            name: "file_id",
            type: "array",
            onSubmitValue: (value) => {
              // console.log('ONSUBMIT', value);
              return value[0]?.id
            }
          },
        ]}

      >
        {({ handleSubmit }) => {

          return (
            <>
              <Field
                name="file_id"
                component={Fields.Upload}
              />
              <Field
                name="title"
                label="Title"
                component={Fields.Input}
              />
              <Field
                name="description"
                label="Description"
                component={Fields.Input}
              />
              <Field
                name="content"
                label="Content"
                component={Fields.CKEditor}
                type="textarea"
              />
              <div className="my-2">
                <Field
                  name="status"
                  label="Status"
                  component={Fields.Switch}
                />
              </div>
              <div className='my-3'>
                <Field
                  name="tag_ids"
                  label="Tag ID"
                  loadOptionsUrl="/tags"
                  optionValue="title"
                  isMulti={true}
                  loadOptionsParams={(search) => {
                    return {
                      filter: {
                        title: search,
                      }
                    }
                  }}
                  optionLabel={(option) => {
                    return (
                      <div>
                        <CheckOutlined className='m-2' />
                        {option.title}
                      </div>
                    )
                  }}
                  component={Fields.AsyncSelect}
                /> 
              </div>
              <div className="my-3">
                <Field
                  name="category_ids"
                  label="Category ID"
                  loadOptionsUrl="/categories"
                  optionValue="name_uz"
                  isMulti={true}
                  loadOptionsParams={(search) => {
                    return {
                      filter: {
                        name_uz: search,
                      }
                    }
                  }}
                  optionLabel={(option) => {
                    return (
                      <div>
                        <CheckOutlined className='m-2' />
                        {option.name_uz}
                      </div>
                    )
                  }}
                  component={Fields.AsyncSelect}
                />
              </div>
              <div className="w-full flex justify-end mt-3">
                <Button className="" type="primary" onClick={handleSubmit}>
                  Create
                </Button>
              </div>
            </>
          );
        }}
      </ContainerForm>
    </Modal>
  )
}

export default form