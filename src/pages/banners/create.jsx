import { useQueryClient } from '@tanstack/react-query'
import { Button, Modal, notification } from 'antd'
import { Fields } from 'components'
import { Field } from 'formik'
import { get } from 'lodash'
import React from 'react'
import { useSelector } from "react-redux";
import ContainerForm from "moduls/container/form";
import { useHooks } from 'hooks'

const form = ({ modalData, setModalData, types }) => {

  const queryClient = useQueryClient()

  const [api, contextHolder] = notification.useNotification();
  const { currentLangCode } = useSelector(state => get(state, "system"))
  const { params, navigate } = useHooks()

  return (
    <Modal
      title={"Banner yaratish"}
      open={modalData.isOpen}
      footer={false}
      onCancel={() => setModalData({ isOpen: false, data: null })}
    >
      {contextHolder}
      <ContainerForm
        url={"/banners"}
        method="post"
        params={{
          extra: { _l: get(params, "lang", currentLangCode) },
        }}
        onSuccess={(data, resetForm) => {
          notification.success({
            message: "Yangi Banner qo'shildi",
          });
          // navigate("/banners")
          setModalData({ isOpen: false, data: null })
          queryClient.invalidateQueries({ queryKey: ["banners"] })
          navigate(`/banners/update-banner/${get(data, "id")}`)
        }}
        fields={[
          {
            name: `name_${get(params, "lang", currentLangCode)}`,
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: `description_${get(params, "lang", currentLangCode)}`,
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: "file_id",
            type: "array",
            onSubmitValue: (value) => {
              // console.log('ONSUBMIT', value);
              return value[0]?.id
            }
          },
          {
            name: "type",
            type: "number",
            required: true,
            onSubmitValue: value => value
          },
        ]}

      // onSuccess={(data) => navigate(`/post/update/${data?.id}`)}
      >
        {({ handleSubmit }) => {

          return (
            <>
              <Field
                name="file_id"
                component={Fields.Upload}
              />
              <Field
                name="type"
                label="Type"
                options={types}
                component={Fields.Select}
              />
              <Field
                name={`name_${get(params, "lang", currentLangCode)}`}
                label="Name"
                component={Fields.Input}
              />
              <Field
                name={`description_${get(params, "lang", currentLangCode)}`}
                label="Description"
                component={Fields.Input}
              />
              <div className="w-full flex justify-end my-3">
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