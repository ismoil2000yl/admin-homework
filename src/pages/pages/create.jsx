import { useQueryClient } from '@tanstack/react-query'
import { Button, notification } from 'antd'
import { Fields, Tabs } from 'components'
import { Field } from 'formik'
import { get } from 'lodash'
import React from 'react'
import { useSelector } from "react-redux";
import ContainerForm from "moduls/container/form";
import { useHooks } from 'hooks'


const form = ({ }) => {

  const queryClient = useQueryClient()
  const [api, contextHolder] = notification.useNotification();
  const { currentLangCode } = useSelector(state => get(state, "system"))
  const { params, navigate } = useHooks()

  return (
    <div className='container'>
      <div className="d-flex justify-start my-3">
        <Button type='primary' onClick={() => navigate("/pages")}>
          Orqaga qaytish
        </Button>
      </div>
      <div className="flex justify-center">
        <Tabs />
      </div>
      <ContainerForm
        url={"/pages"}
        method="post"
        params={{
          extra: {
            _l: get(params, "lang", currentLangCode)
          },
        }}
        onSuccess={(data, resetForm) => {
          notification.success({
            message: "Yangi page qo'shildi",
          });
          navigate("/pages")
          queryClient.invalidateQueries({ queryKey: ["pages"] })
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
            name: "status",
            type: "boolean",
            onSubmitValue: (value) => value ? 1 : 0,
          },
        ]}
      >
        {({ handleSubmit }) => {

          return (
            <>
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
                name="status"
                label="Status"
                component={Fields.Switch}
              />
              <div className="w-full flex justify-end">
                <Button className="" type="primary" onClick={handleSubmit}>
                  Create
                </Button>
              </div>
            </>
          );
        }}
      </ContainerForm>
    </div>
  )
}

export default form